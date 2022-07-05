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
import MixCommand, {Columns} from '../../utils/base/mix-command'
import {EntitiesListParams, Entity, MixClient, MixResponse, MixResult} from '../../mix/types'
import {DomainOption} from '../../utils/validations'
import {Output} from '@oclif/parser/lib/flags'

const debug = makeDebug('mix:commands:entities:list')

export default class EntitiesList extends MixCommand {
  static description = `list entities
  
Use this command to list all entities available in a specific project.`

  static examples = [
    'List all entities',
    '$ mix entities:list -P 1922',
    '',
    'List all list-type entities',
    '$ mix entities:list -P 1922 --with-entity-type list',
  ]

  static flags = {
    json: MixFlags.jsonFlag,
    project: MixFlags.projectFlag,
    ...MixFlags.tableFlags({except: ['extended', 'sort']}),
    'with-entity-type': MixFlags.withEntityTypeFlag,
    yaml: MixFlags.yamlFlag,
  }

  get columns() {
    debug('get columns()')
    return {
      name: {header: 'Name'},
      type: {header: 'EntityType'},
      id: {header: 'EntityId'},
    } as Columns
  }

  get domainOptions(): DomainOption[] {
    debug('get domainOptions()')
    return ['project']
  }

  async buildRequestParameters(options: Partial<flags.Output>): Promise<EntitiesListParams> {
    debug('buildRequestParameters()')
    const {project: projectId} = options
    const type = (options['with-entity-type']?.toUpperCase().replace('-', '_') ??
      'UNSPECIFIED') as Entity

    return {projectId, type}
  }

  doRequest(client: MixClient, params: EntitiesListParams): Promise<MixResponse> {
    debug('doRequest()')
    return EntitiesAPI.listEntities(client, params)
  }

  outputHumanReadable(transformedData: any, _options: Partial<Output>): void {
    if (Array.isArray(transformedData) && transformedData.length === 0) {
      this.log('No entities found.')
      return
    }

    super.outputHumanReadable(transformedData, this.options)
  }

  setRequestActionMessage(options: any) {
    debug('setRequestActionMessage()')
    this.requestActionMessage = `Retrieving entities for project ID ${options.project}`
  }

  transformResponse(result: MixResult) {
    debug('transformResponse()')
    const data = result.data as any

    const entities = data?.entities.map((entity: any) => {
      const [type] = Object.keys(entity)
      const {id, name} = entity[type]
      return {name, type, id}
    })

    return entities
  }
}
