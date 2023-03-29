/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {FlagOutput} from '@oclif/core/lib/interfaces'
import makeDebug from 'debug'

import * as DataTypesAPI from '../../mix/api/data-types'
import * as MixFlags from '../../utils/flags'
import MixCommand from '../../utils/base/mix-command'
import {DataTypesListParams, MixClient, MixResponse, MixResult} from '../../mix/types'
import {DomainOption} from '../../utils/validations'

const debug = makeDebug('mix:commands:data-types:list')

export default class DataTypesList extends MixCommand {
  static description = `list data types

Use this command to list the available data types.`

  static examples = ['mix data-types:list']

  static flags = {
    json: MixFlags.jsonFlag,
    yaml: MixFlags.yamlFlag,
  }

  get columns() {
    debug('get columns()')
    return {
      name: {header: 'DataTypeName'},
      description: {
        header: 'Description',
        get: (dataTypes: any) => dataTypes.schema.description,
      },
      compatibleEntityTypes: {
        header: 'CompatibleEntityTypes',
        get: ({compatibleEntityTypes}: any) => compatibleEntityTypes.map(({name}: any) => name).join(','),
      },
    }
  }

  get domainOptions(): DomainOption[] {
    debug('get domainOptions()')

    return []
  }

  async buildRequestParameters(_options: Partial<FlagOutput>): Promise<DataTypesListParams> {
    debug('buildRequestParameters()')

    return {
      includeCompatibleEntityTypes: true,
    }
  }

  doRequest(client: MixClient, params: DataTypesListParams): Promise<MixResponse> {
    debug('doRequest()')

    return DataTypesAPI.listDataTypes(client, params)
  }

  outputHumanReadable(transformedData: any) {
    debug('outputHumanReadable()')
    const {columns} = this

    if (transformedData.length === 0) {
      const message = 'No data types found.'
      this.log(message)

      return
    }

    super.outputCLITable(transformedData, columns)
  }

  setRequestActionMessage(_options: any) {
    debug('setRequestActionMessage()')
    this.requestActionMessage = 'Retrieving data types'
  }

  transformResponse(result: MixResult) {
    debug('transformResponse()')
    const data = result.data as any

    return data.dataTypes
  }
}
