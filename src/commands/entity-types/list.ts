/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {flags} from '@oclif/command'
import makeDebug from 'debug'

import * as EntityTypesAPI from '../../mix/api/ontology'
import * as MixFlags from '../../utils/flags'
import MixCommand from '../../utils/base/mix-command'
import {EntityTypesListParams, MixClient, MixResponse, MixResult} from '../../mix/types'
import {DomainOption} from '../../utils/validations'

const debug = makeDebug('mix:commands:entity-types:list')

export default class EntityTypesList extends MixCommand {
  static description = `list entity types

Use this command to list the available entity types.`

  static examples = ['mix entity-types:list']

  static flags = {
    json: MixFlags.jsonFlag,
    yaml: MixFlags.yamlFlag,
  }

  get columns() {
    debug('get columns()')
    return {
      name: {header: 'EntityName'},
      description: {header: 'Description'},
      compatibleDataTypes: {
        header: 'CompatibleDataTypes',
        get: ({compatibleDataTypes}: any) => compatibleDataTypes.join(','),
      },
    }
  }

  get domainOptions(): DomainOption[] {
    debug('get domainOptions()')
    return []
  }

  async buildRequestParameters(_options: Partial<flags.Output>): Promise<EntityTypesListParams> {
    debug('buildRequestParameters()')
    const includeCompatibleDataTypes = true
    return {
      includeCompatibleDataTypes,
    }
  }

  doRequest(client: MixClient, params: EntityTypesListParams): Promise<MixResponse> {
    debug('doRequest()')
    return EntityTypesAPI.listEntitytypes(client, params)
  }

  outputHumanReadable(transformedData: any) {
    debug('outputHumanReadable()')
    const {columns} = this
    if (transformedData.length === 0) {
      const msg = 'No entity types found.'
      this.log(msg)

      return
    }

    super.outputCLITable(transformedData, columns)
  }

  setRequestActionMessage(_options: any) {
    debug('setRequestActionMessage()')
    this.requestActionMessage = 'Retrieving entity types'
  }

  transformResponse(result: MixResult) {
    debug('transformResponse()')
    const data = result.data as any
    return data.entityTypes
  }
}
