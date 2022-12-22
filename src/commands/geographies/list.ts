/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {flags} from '@oclif/command'
import makeDebug from 'debug'

import * as GeographiesAPI from '../../mix/api/geographies'
import * as MixFlags from '../../utils/flags'
import MixCommand from '../../utils/base/mix-command'
import {defaultLimit} from '../../utils/constants'
import {GeographiesListParams, MixClient, MixResponse, MixResult} from '../../mix/types'
import {DomainOption} from '../../utils/validations'

const debug = makeDebug('mix:commands:geographies:list')

export default class GeographiesList extends MixCommand {
  static description = `list geographies
  
Use this command to list the geographies available on the platform.`

  static examples = ['mix geographies:list']

  static flags = {
    json: MixFlags.jsonFlag,
    ...MixFlags.limitOffsetSortFlags,
    ...MixFlags.tableFlags({except: ['extended', 'sort']}),
    yaml: MixFlags.yamlFlag,
  }

  get columns() {
    debug('get columns()')
    return {
      id: {header: 'GeographyId'},
      displayName: {header: 'Name'},
    }
  }

  get domainOptions(): DomainOption[] {
    debug('get domainOptions()')
    return ['limit', 'offset']
  }

  async buildRequestParameters(options: Partial<flags.Output>): Promise<GeographiesListParams> {
    debug('buildRequestParameters()')
    const {limit = defaultLimit, offset, sort: sortBy} = options

    return {
      ...(typeof limit === 'undefined' ? {} : {limit}),
      ...(typeof offset === 'undefined' ? {} : {offset}),
      ...(typeof sortBy === 'undefined' ? {} : {sortBy}),
    }
  }

  doRequest(client: MixClient, params: GeographiesListParams): Promise<MixResponse> {
    debug('doRequest()')
    return GeographiesAPI.listGeographies(client, params)
  }

  outputHumanReadable(transformedData: any) {
    debug('outputHumanReadable()')
    if (transformedData.length === 0) {
      this.log('No geographies found.')

      return
    }

    super.outputHumanReadable(transformedData, this.options)
  }

  setRequestActionMessage(_options: any) {
    debug('setRequestActionMessage()')
    this.requestActionMessage = 'Retrieving geographies'
  }

  transformResponse(result: MixResult) {
    debug('transformResponse()')
    const data = result.data as any
    const {geographies, count, offset, limit, totalSize} = data
    this.context.set('count', count)
    this.context.set('offset', offset)
    this.context.set('limit', limit)
    this.context.set('totalSize', totalSize)
    return geographies
  }
}
