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
import {EntitiesConfigureParams, MixClient, MixResponse, MixResult} from '../../mix/types'
import MixCommand from '../../utils/base/mix-command'
import {DomainOption} from '../../utils/validations'
import chalk from 'chalk'

const debug = makeDebug('mix:commands:entities:configure')

export default class EntitiesConfigure extends MixCommand {
  static description = `configure an entity

Use this command to configure an entity in a project.

NOTE: This command cannot change the type of an entity.
When using this command, you must provide the current type
of the entity. Use command entities:convert to change the
type of an entity.

Mix supports several types of entities: freeform, list, regex,
relational and rule-based. There are many attributes that can
be configured for an entity and a good number of these attributes
are common to all entity types. However, certain attributes apply
to specific entity types only.

Regex entities make use of regular expressions specific to a single
locale. The --pattern and --locale flags matter only to entities
of type "regex".

Relationial entities can have zero or one isA relation and
zero or many hasA relations. One --is-A or --has-A flag must be
set at a minimum for an entity of type "relational".

The examples below show how to configure each type of entity.
In each example, every allowed flag is used.
Note that if a value is not provided for a particular flag,
the current value of the flag is preserved.
`

  static examples = [
    'Configure a freeform entity',
    '$ mix entities:configure -P 1922 -E MESSAGE \\',
    '  --sensitive --no-canonicalize --data-type not-set',
    '',
    'Configure a list entity',
    '$ mix entities:configure -P 1922 -E DRINK_SIZE --dynamic --sensitive \\',
    '  --no-canonicalize --anaphora-type not-set --data-type not-set',
    '',
    'Configure a regex entity',
    '$ mix entities:configure -P 1922 -E PHONE_NUMBER --locale en-US \\',
    '  --pattern \\d{10} --sensitive --no-canonicalize --anaphora-type not-set \\',
    '  --data-type digits',
    '',
    'Configure a relational entity',
    '$ mix entities:configure -P 1922 --E ARRIVAL_CITY --is-a CITY \\',
    '  --sensitive --no-canonicalize --anaphora-type not-set --data-type not-set',
    '',
    'Configure a rule-based entity',
    '$ mix entities:configure -P 1922 -E CARD_TYPE --sensitive \\',
    '   --no-canonicalize --anaphora-type not-set --data-type not-set',
  ]

  static flags = {
    'anaphora-type': MixFlags.anaphoraTypeFlag,
    'data-type': MixFlags.dataTypeFlag,
    dynamic: MixFlags.dynamicFlag,
    entity: MixFlags.entityFlag,
    'entity-type': MixFlags.withEntityTypeFlag,
    'has-a': MixFlags.hasAFlag,
    'is-a': MixFlags.isAFlag,
    locale: MixFlags.regexLocaleFlag,
    'no-canonicalize': MixFlags.noCanonicalizeFlag,
    pattern: MixFlags.patternFlag,
    project: MixFlags.projectFlag,
    sensitive: MixFlags.sensitiveUserDataFlag,
    // output flags
    json: MixFlags.jsonFlag,
    yaml: MixFlags.yamlFlag,
  }

  get domainOptions(): DomainOption[] {
    debug('get domainOptions()')
    return ['locale', 'project']
  }

  async buildRequestParameters(options: Partial<flags.Output>): Promise<EntitiesConfigureParams> {
    debug('buildRequestParameters()')
    const {
      'anaphora-type': anaphora,
      'no-canonicalize': noCanonicalize,
      'data-type': dataType,
      'has-a': hasA,
      'is-a': isA,
      dynamic: isDynamic,
      'entity-type': entityType,
      sensitive: isSensitive,
      locale,
      entity: entityName,
      pattern,
      project: projectId,
    } = options

    return {
      anaphora: `ANAPHORA_${anaphora.toUpperCase().replace('-', '_')}`,
      canonicalize: !noCanonicalize,
      dataType: dataType.toUpperCase().replace('-', '_'),
      entityName,
      entityType,
      hasA,
      isA,
      isDynamic,
      isSensitive,
      locale,
      pattern,
      projectId,
    }
  }

  doRequest(client: MixClient, params: EntitiesConfigureParams): Promise<MixResponse> {
    debug('doRequest()')
    return EntitiesAPI.configureEntity(client, params)
  }

  outputHumanReadable(transformedData: any) {
    debug('outputHumanReadable()')
    const {entityId, name} = transformedData
    this.log(`Entity ${chalk.cyan(name)} with ID ${chalk.cyan(entityId)} was updated.`)
  }

  setRequestActionMessage(options: any) {
    debug('setRequestActionMessage()')
    this.requestActionMessage = `Configuring entity ${options.name} in project ${options.project}`
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

    const {'entity-type': entityType} = options

    // Command bails out if mandatory parameters are missing.
    // Extraneous parameters are ignored.
    switch (entityType) {
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
