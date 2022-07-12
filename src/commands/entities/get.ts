/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.  */

import {flags} from '@oclif/command'
import makeDebug from 'debug'

import * as EntitiesAPI from '../../mix/api/entities'
import * as MixFlags from '../../utils/flags'
import MixCommand, {Columns} from '../../utils/base/mix-command'
import {EntitiesGetParams, MixClient, MixResponse, MixResult} from '../../mix/types'
import {DomainOption} from '../../utils/validations'

const debug = makeDebug('mix:commands:entities:get')

export default class EntitiesGet extends MixCommand {
  static description = `get details about an entity

Use this command to get details about a particular entity in a project.`

  static examples = [
    'mix entities:get -P 1922 -E DrinkSize',
  ]

  static flags = {
    entity: MixFlags.entityFlag,
    json: MixFlags.jsonFlag,
    project: MixFlags.projectFlag,
    ...MixFlags.tableFlags({
      except: ['extended', 'no-header', 'filter', 'sort'],
      useColumnsWithCSVOnly: true,
    }),
    yaml: MixFlags.yamlFlag,
  }

  get columns() {
    debug('get columns()')
    return {
      name: {header: 'Name'},
      entityId: {header: 'EntityId'},
      type: {header: 'EntityType'},
      anaphora: {header: 'Anaphora'},
      canonicalize: {header: 'Canonicalize'},
      dataSource: {header: 'DataSource'},
      dataType: {header: 'DataType'},
      hasA: {header: 'hasA'},
      isA: {header: 'isA'},
      isDynamic: {header: 'IsDynamic'},
      isSensitive: {header: 'IsSensitive'},
      localeBasedGrammars: {header: 'LocaleBasedGrammars'},
      numLiterals: {header: 'NumLiterals'},
      pattern: {header: 'RegexPattern'},
    } as Columns
  }

  get domainOptions(): DomainOption[] {
    debug('get domainOptions()')
    return ['project']
  }

  async buildRequestParameters(options: Partial<flags.Output>): Promise<EntitiesGetParams> {
    debug('buildRequestParameters()')
    const {
      entity: entityName,
      project: projectId,
    } = options

    return {
      entityName,
      projectId,
    }
  }

  doRequest(client: MixClient, params: EntitiesGetParams): Promise<MixResponse> {
    debug('doRequest()')
    return EntitiesAPI.getEntity(client, params)
  }

  outputHumanReadable(transformedData: any) {
    debug('outputHumanReadable()')
    this.outputAsKeyValuePairs(transformedData, this.columns)
  }

  setRequestActionMessage(options: any) {
    debug('setRequestActionMessage()')
    this.requestActionMessage = `Retrieving details for entity ${options.entity}`
  }

  transformResponse(result: MixResult) {
    debug('transformResponse()')
    const data = result.data as any
    const [type] = Object.keys(data?.entity)
    const entity = data?.entity[type] ?? {}

    const {
      name,
      id: entityId,
      anaphora,
      settings: {
        canonicalize,
        isSensitive,
      },
      dataSource,
      dataType,
      hasA,
      isA,
      isDynamic,
      localeBasedGrammars,
      numLiterals,
      pattern,
    } = entity

    return {
      name,
      entityId,
      type,
      anaphora,
      canonicalize,
      dataSource,
      dataType,
      hasA: hasA?.entities.join(','),
      isA,
      isDynamic,
      isSensitive,
      localeBasedGrammars: localeBasedGrammars ?
        Object.entries(localeBasedGrammars)
          .map(([k, v]) => `${k}:${v}`)
          .sort(([a, b]) => a.localeCompare(b))  :
        undefined,
      numLiterals,
      pattern,
    }
  }
}