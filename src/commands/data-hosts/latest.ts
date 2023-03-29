/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {FlagOutput} from '@oclif/core/lib/interfaces'
import makeDebug from 'debug'

import * as DataHostsAPI from '../../mix/api/data-hosts'
import * as MixFlags from '../../utils/flags'
import {DataHostsLatestParams, MixClient, MixResponse, MixResult} from '../../mix/types'
import {DomainOption} from '../../utils/validations'
import MixCommand from '../../utils/base/mix-command'

const debug = makeDebug('mix:commands:data-hosts:latest')

export default class DataHostsLatest extends MixCommand {
  static description = `list latest data host details

Use this command to retrieve the list of the data hosts
associated with the last generated dialog build.`

  static examples = [
    'mix data-hosts:latest -D 658 -M 34 -P 619090',
  ]

  static flags = {
    'deployment-flow': MixFlags.withDeploymentFlowFlag,
    json: MixFlags.jsonFlag,
    'mix-app': MixFlags.mixApplicationFlag,
    project: MixFlags.projectWithDefaultFlag,
    ...MixFlags.tableFlags({except: ['extended']}),
    yaml: MixFlags.yamlFlag,
  }

  get columns() {
    debug('get columns()')

    return {
      id: {header: 'DataHostId'},
      alias: {header: 'Alias'},
      environmentId: {header: 'EnvironmentId'},
      environmentGeographyId: {header: 'EnvironmentGeographyId'},
      value: {header: 'Value'},
    }
  }

  get domainOptions(): DomainOption[] {
    debug('get domainOptions()')

    return ['deployment-flow', 'mix-app', 'project']
  }

  async buildRequestParameters(options: Partial<FlagOutput>): Promise<DataHostsLatestParams> {
    debug('buildRequestParameters()')
    const {
      'deployment-flow': deploymentFlowId,
      'mix-app': applicationId,
      project: projectId,
    } = options

    return {
      applicationId,
      projectId,
      ...(typeof deploymentFlowId === 'undefined' ? {} : {deploymentFlowId}),
    }
  }

  doRequest(client: MixClient, params: DataHostsLatestParams): Promise<MixResponse> {
    debug('doRequest()')

    return DataHostsAPI.listLatestDataHosts(client, params)
  }

  outputHumanReadable(transformedData: any) {
    debug('outputHumanReadable()')

    const {context, options} = this
    const count: number = context.get('count')

    if (count === 0) {
      return this.log('No data hosts found for this application build.')
    }

    super.outputHumanReadable(transformedData, options)
  }

  setRequestActionMessage(_options: any) {
    debug('setRequestActionMessage()')
    this.requestActionMessage = 'Retrieving data hosts'
  }

  transformResponse(result: MixResult) {
    debug('transformResponse()')
    const data = result.data as any
    const {dataHosts = []} = data
    const count = dataHosts.length
    this.context.set('count', count)

    return dataHosts
  }
}
