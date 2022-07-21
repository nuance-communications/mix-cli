/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {flags} from '@oclif/command'
import makeDebug from 'debug'

import * as EntitiesAPI from '../../mix/api/entities'
import * as MixFlags from '../../utils/flags'
import {eMissingParameter} from '../../utils/errors'
import {EntitiesConvertParams, MixClient, MixResponse, MixResult} from '../../mix/types'
import MixCommand from '../../utils/base/mix-command'
import {DomainOption} from '../../utils/validations'
import chalk from 'chalk'

const debug = makeDebug('mix:commands:entities:convert')

export default class EntitiesConvert extends MixCommand {
  static description = `convert an entity to a different type

Use this command to convert an entity to a different type.

Mix supports several types of entities: freeform, list, regex,
relational and rule-based. If converting to a regex or rule-based
entity type, you will have to provide additional information as
explained below.

Regex entities make use of regular expressions specific to a single
locale. Use the --pattern flag to provide the regular expression
for the converted entity. The regular expression provided gets
applied to all locales in the project. Use the entities:configure
command to update the regular expression on a per locale basis
if needed.

Relationial entities can have zero or one isA relation and
zero or many hasA relations. One --is-A or --has-A flag must be
set at a minimum whent converting an entity to the "relational" type.

The examples below show how to convert an entity to each possible
type of entity.
`

  static examples = [
    'Convert an entity to a freeform entity',
    '$ mix entities:convert -P 1922 -E MY_ENTITY --to-entity-type freeform',
    '',
    'Convert an entity to a list entity',
    '$ mix entities:convert -P 1922 -E MY_ENTITY --to-entity-type list',
    '',
    'Convert an entity to a regex entity',
    '$ mix entities:convert -P 1922 -E MY_ENTITY --to-entity-type regex \\',
    '  --pattern \\d{10}',
    '',
    'Convert an entity to a relational entity',
    '$ mix entities:convert -P 1922 --E MY_ENTITY --to-entity-type relational',
    '  --is-a CITY',
    '',
    'Convert an entity to a rule-based entity',
    '$ mix entities:convert -P 1922 -E MY_ENTITY --to-entity-type rule-based',
  ]

  static flags = {
    entity: MixFlags.entityFlag,
    'has-a': MixFlags.hasAFlag,
    'is-a': MixFlags.isAFlag,
    pattern: MixFlags.patternFlag,
    project: MixFlags.projectFlag,
    'to-entity-type': MixFlags.toEntityTypeFlag,
    // output flags
    json: MixFlags.jsonFlag,
    yaml: MixFlags.yamlFlag,
  }

  get domainOptions(): DomainOption[] {
    debug('get domainOptions()')
    return ['project']
  }

  async buildRequestParameters(options: Partial<flags.Output>): Promise<EntitiesConvertParams> {
    debug('buildRequestParameters()')
    const {
      entity: entityName,
      'has-a': hasA,
      'is-a': isA,
      pattern,
      project: projectId,
      'to-entity-type': newType,
    } = options

    return {
      entityName,
      hasA,
      isA,
      newType,
      pattern,
      projectId,
    }
  }

  doRequest(client: MixClient, params: EntitiesConvertParams): Promise<MixResponse> {
    debug('doRequest()')
    return EntitiesAPI.convertEntity(client, params)
  }

  outputHumanReadable(transformedData: any) {
    debug('outputHumanReadable()')
    const {entityId, name} = transformedData
    this.log(`Entity ${chalk.cyan(name)} with ID ${chalk.cyan(entityId)} was converted.`)
  }

  setRequestActionMessage(options: any) {
    debug('setRequestActionMessage()')
    this.requestActionMessage = `Converting entity ${options.name} in project ${options.project}`
  }

  transformResponse(result: MixResult) {
    debug('transformResponse()')
    const data = result.data as any
    const [type] = Object.keys(data?.entity)
    const entity = data?.entity[type] ?? {}

    const {
      name,
      id: entityId,
    } = entity

    return {
      entityId,
      name,
    }
  }

  tryDomainOptionsValidation(options: Partial<flags.Output>, domainOptions: DomainOption[]) {
    debug('tryDomainOptionsValidation()')
    super.tryDomainOptionsValidation(options, domainOptions)

    const {'to-entity-type': newType} = options

    // Command bails out if mandatory parameters are missing.
    // Extraneous parameters are ignored.
    switch (newType) {
      case 'regex':
        this.validateRegexEntityParams(options)
        break

      case 'relational':
        this.validateRuleBasedEntityParams(options)
        break
    }
  }

  validateRegexEntityParams(options: Partial<flags.Output>) {
    debug('validateRegexEntityParams()')

    if (options.pattern === undefined || options.locale === undefined) {
      throw (eMissingParameter('Regex entities require a pattern and a locale.', [
        'Use --pattern to provide the required regular expression.',
        'Use --locale to provide the locale for which the regular expression applies.',
      ]))
    }
  }

  validateRuleBasedEntityParams(options: Partial<flags.Output>) {
    debug('validateRuleBasedEntityParams()')

    if (options['is-a'] === undefined && options['has-a'] === undefined) {
      throw (eMissingParameter('Relational entities require has-a and/or is-a relation.', [
        'use the --has-a and/or --is-a flags to provide the required relation.',
      ]))
    }
  }
}
