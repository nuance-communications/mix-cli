/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import chalk from 'chalk'
import {FlagOutput} from '@oclif/core/lib/interfaces'
import makeDebug from 'debug'

import * as EntitiesAPI from '../../mix/api/entities'
import * as MixFlags from '../../utils/flags'
import {EntitiesConfigureParams, MixClient, MixResponse, MixResult} from '../../mix/types'
import MixCommand from '../../utils/base/mix-command'
import {DomainOption} from '../../utils/validations'
import {validateRegexEntityParams} from '../../utils/validations'

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
locale. The 'pattern' and 'locale' flags matter only to entities
of type "regex". It is recommended to surround the pattern
value with quotes, especially if the escape character "\\" is used
in the pattern. See examples below.

Relationial entities can have zero or one isA relation and
zero or many hasA relations. One 'is-a' or 'has-a' flag must be
set at a minimum for an entity of type "relational".

The examples below show how to configure each type of entity.
In each example, every allowed flag is used.
Note that when a value is not provided for a particular flag,
the corresponding property in the entity is not modified.
`

  static examples = [
    'Configure a freeform entity',
    '$ mix entities:configure -P 1922 -E MESSAGE --entity-type freeform \\',
    '  --sensitive --no-canonicalize --data-type not-set',
    '',
    'Configure a list entity',
    '$ mix entities:configure -P 1922 -E DRINK_SIZE --entity-type list \\',
    '  --dynamic --sensitive --no-canonicalize --anaphora-type not-set \\',
    '  --data-type not-set',
    '',
    'Configure a regex entity',
    '$ mix entities:configure -P 1922 -E PHONE_NUMBER --entity-type regex \\',
    '  --locale en-US --pattern "\\d{10}" --sensitive --no-canonicalize \\',
    '  --anaphora-type not-set --data-type digits',
    '',
    'Configure a relational entity',
    '$ mix entities:configure -P 1922 --E FROM_CITY --entity-type relational \\',
    '  --is-a CITY --sensitive --no-canonicalize --anaphora-type not-set \\',
    '  --data-type not-set',
    '',
    'Configure a rule-based entity',
    '$ mix entities:configure -P 1922 -E CARD_TYPE --entity-type rule-based \\',
    '  --sensitive --no-canonicalize --anaphora-type not-set --data-type not-set',
  ]

  static flags = {
    'anaphora-type': MixFlags.ignoreDefault(MixFlags.anaphoraTypeFlag),
    'data-type': MixFlags.ignoreDefault(MixFlags.dataTypeFlag),
    dynamic: MixFlags.ignoreDefault(MixFlags.dynamicFlag),
    entity: MixFlags.entityFlag,
    'entity-type': MixFlags.entityTypeFlag,
    'has-a': MixFlags.hasAFlag,
    'is-a': MixFlags.isAFlag,
    locale: MixFlags.regexLocaleFlag,
    'no-canonicalize': MixFlags.ignoreDefault(MixFlags.noCanonicalizeFlag),
    pattern: MixFlags.patternFlag,
    project: MixFlags.projectWithDefaultFlag,
    sensitive: MixFlags.ignoreDefault(MixFlags.sensitiveUserDataFlag),
    // output flags
    json: MixFlags.jsonFlag,
    yaml: MixFlags.yamlFlag,
  }

  get domainOptions(): DomainOption[] {
    debug('get domainOptions()')
    return ['locale', 'project']
  }

  async buildRequestParameters(options: Partial<FlagOutput>): Promise<EntitiesConfigureParams> {
    debug('buildRequestParameters()')
    const {
      'anaphora-type': anaphora,
      'no-canonicalize': noCanonicalize,
      'data-type': dataType,
      dynamic: isDynamic,
      entity: entityName,
      'entity-type': entityType,
      'has-a': hasA,
      'is-a': isA,
      locale,
      pattern,
      project: projectId,
      sensitive: isSensitive,
    } = options

    return {
      anaphora,
      dataType,
      entityName,
      entityType,
      hasA,
      isA,
      isDynamic,
      isSensitive,
      locale,
      ...(noCanonicalize !== undefined && {canonicalize: !noCanonicalize}),
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
    this.requestActionMessage = `Configuring entity ${chalk.cyan(options.entity)} in project ${chalk.cyan(options.project)}`
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

  tryDomainOptionsValidation(options: Partial<FlagOutput>, domainOptions: DomainOption[]) {
    debug('tryDomainOptionsValidation()')
    super.tryDomainOptionsValidation(options, domainOptions)

    const {
      'entity-type': entityType,
      locale,
      pattern,
    } = options

    // Entity type 'relational' requires mandatory flags upon creation or
    // conversion but not for updates. However, for regex entities, locale and
    // pattern must be provided together for updates.
    // Command bails out if mandatory parameters are missing.
    // Extraneous parameters are ignored.
    if (entityType === 'regex') {
      validateRegexEntityParams(locale, pattern)
    }
  }
}
