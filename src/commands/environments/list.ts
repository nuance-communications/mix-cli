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

import * as EnvironmentsAPI from '../../mix/api/environments'
import * as MixFlags from '../../utils/flags'
import MixCommand from '../../utils/base/mix-command'
import {asGeographiesList} from '../../utils/format'
import {defaultLimit} from '../../utils/constants'
import {EnvironmentsListParams, MixClient, MixResponse, MixResult} from '../../mix/types'
import {DomainOption} from '../../utils/validations'

const debug = makeDebug('mix:commands:environments:list')

export default class EnvironmentsList extends MixCommand {
  static description = `list available environments
  
Use this command to list all environments available to a specific organization.`

  static examples = [
    'mix environments:list -O 64',
  ]

  static flags = {
    json: MixFlags.jsonFlag,
    ...MixFlags.limitOffsetSortFlags,
    organization: MixFlags.organizationWithDefaultFlag,
    ...MixFlags.tableFlags({except: ['extended', 'sort']}),
    yaml: MixFlags.yamlFlag,
  }

  get columns() {
    debug('get columns()')
    return {
      id: {header: 'EnvironmentId'},
      displayName: {header: 'Name'},
      geographies: {
        header: 'Geographies',
        get: asGeographiesList,
      },
    }
  }

  get domainOptions(): DomainOption[] {
    debug('get domainOptions()')
    return ['limit', 'offset', 'organization']
  }

  async buildRequestParameters(options: Partial<flags.Output>): Promise<EnvironmentsListParams> {
    debug('buildRequestParameters()')
    const {limit = defaultLimit, offset, organization: orgId, sort: sortBy} = options

    return {
      ...(typeof limit === 'undefined' ? {} : {limit}),
      ...(typeof offset === 'undefined' ? {} : {offset}),
      orgId,
      ...(typeof sortBy === 'undefined' ? {} : {sortBy}),
    }
  }

  doRequest(client: MixClient, params: EnvironmentsListParams): Promise<MixResponse> {
    debug('doRequest()')
    return EnvironmentsAPI.listEnvironments(client, params)
  }

  outputHumanReadable(transformedData: any) {
    debug('outputHumanReadable()')

    super.outputHumanReadable(transformedData, this.options)
  }

  setRequestActionMessage(options: any) {
    debug('setRequestActionMessage()')
    this.requestActionMessage = `Retrieving environments for organization ID ${chalk.cyan(options.organization)}`
  }

  transformResponse(result: MixResult) {
    debug('transformResponse()')
    const data = result.data as any
    const {environments, count, offset, limit, totalSize} = data

    this.context.set('count', count)
    this.context.set('offset', offset)
    this.context.set('limit', limit)
    this.context.set('totalSize', totalSize)
    this.context.set('topic', 'environments')

    return environments
  }
}
