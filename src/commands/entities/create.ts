/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import chalk from 'chalk'
import {flags} from '@oclif/command'
import makeDebug from 'debug'

import * as EntitiesAPI from '../../mix/api/entities'
import * as MixFlags from '../../utils/flags'
import {DomainOption} from '../../utils/validations'
import {EntitiesCreateParams, MixClient, MixResponse, MixResult} from '../../mix/types'
import MixCommand from '../../utils/base/mix-command'
import {validateRegexEntityParams, validateRuleBasedEntityParams} from '../../utils/validations'

const debug = makeDebug('mix:commands:entities:create')

export default class EntitiesCreate extends MixCommand {
  static description = `create a new entity

Use this command to create a new entity in a project.

Mix supports several types of entities: freeform, list, regex,
relational and rule-based. There are many attributes that can
be passed for the creation of an entity and a good number of
these attributes are common to all entity types. However, certain
attributes are mandatory and apply to specific entity types only.

Regex entities make use of regular expressions specific to a single
locale. The --pattern and --locale flags must be set when creating
an entity of type "regex".

Relationial entities can have zero or one isA relation and
zero or many hasA relations. One --is-A or --has-A flag must be
set at a minimum when creating an entity of type "relational".

The --entity-type, --name and --project flags are mandatory for
the creation of any entity type.

The examples below show how to create each type of entity.
In each example, every allowed or mandatory flag is used.
Note that many flags have default values and do not need to be
explicitly provided.
`

  static examples = [
    'Create a freeform entity',
    '$ mix entities:create -P 1922 --entity-type=freeform --name MESSAGE \\',
    '  --sensitive --no-canonicalize --data-type not-set',
    '',
    'Create a list entity',
    '$ mix entities:create -P 1922 --entity-type=list --name DRINK_SIZE \\',
    '  --dynamic --sensitive --no-canonicalize --anaphora-type not-set \\',
    '  --data-type not-set',
    '',
    'Create a regex entity',
    '$ mix entities:create -P 1922 --entity-type=regex --name PHONE_NUMBER \\',
    '  --locale en-US --pattern \\d{10} --sensitive --no-canonicalize \\',
    '  --anaphora-type not-set --data-type digits',
    '',
    'Create a relational entity',
    '$ mix entities:create -P 1922 --entity-type=relational --name ARRIVAL_CITY \\',
    '  --is-a CITY --sensitive --no-canonicalize --anaphora-type not-set \\',
    '  --data-type not-set',
    '',
    'Create a rule-based entity',
    '$ mix entities:create -P 1922 --entity-type=rule-based --name CARD_TYPE \\',
    '  --sensitive --no-canonicalize --anaphora-type not-set --data-type not-set',
  ]

  static flags = {
    'anaphora-type': MixFlags.anaphoraTypeFlag,
    'data-type': MixFlags.dataTypeFlag,
    dynamic: MixFlags.dynamicFlag,
    'entity-type': MixFlags.entityTypeFlag,
    'has-a': MixFlags.hasAFlag,
    'is-a': MixFlags.isAFlag,
    locale: MixFlags.regexLocaleFlag,
    name: MixFlags.entityNameFlag,
    'no-canonicalize': MixFlags.noCanonicalizeFlag,
    pattern: MixFlags.patternFlag,
    project: MixFlags.projectWithDefaultFlag,
    sensitive: MixFlags.sensitiveUserDataFlag,
    // output flags
    json: MixFlags.jsonFlag,
    yaml: MixFlags.yamlFlag,
  }

  get domainOptions(): DomainOption[] {
    debug('get domainOptions()')
    return ['locale', 'project']
  }

  async buildRequestParameters(options: Partial<flags.Output>): Promise<EntitiesCreateParams> {
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
      name,
      pattern,
      project: projectId,
    } = options

    return {
      anaphora,
      canonicalize: !noCanonicalize,
      dataType,
      entityType: entityType,
      hasA,
      isA,
      isDynamic,
      isSensitive,
      locale,
      name,
      pattern,
      projectId,
    }
  }

  doRequest(client: MixClient, params: EntitiesCreateParams): Promise<MixResponse> {
    debug('doRequest()')
    return EntitiesAPI.createEntity(client, params)
  }

  outputHumanReadable(transformedData: any) {
    debug('outputHumanReadable()')
    const {entityId, name} = transformedData
    this.log(`Entity ${chalk.cyan(name)} with ID ${chalk.cyan(entityId)} created.`)
  }

  setRequestActionMessage(options: any) {
    debug('setRequestActionMessage()')
    this.requestActionMessage = `Creating entity ${options.name} in project ${options.project}`
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

    const {
      'entity-type': entityType,
      'has-a': hasA,
      'is-a': isA,
      locale,
      pattern,
    } = options

    // Entity types 'regex' and 'relational' require mandatory flags.
    // Command bails out if mandatory parameters are missing.
    // Extraneous parameters are ignored.
    if (entityType === 'regex') {
      validateRegexEntityParams(locale, pattern)
    }

    if (entityType === 'relational') {
      validateRuleBasedEntityParams(hasA, isA)
    }
  }
}
