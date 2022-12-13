/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {flags} from '@oclif/command'
import makeDebug from 'debug'

import * as AppConfigsAPI from '../../mix/api/app-configs'
import * as MixFlags from '../../utils/flags'
import MixCommand, {Columns} from '../../utils/base/mix-command'
import {AppConfigsGetParams, MixClient, MixResponse, MixResult} from '../../mix/types'
import {DomainOption} from '../../utils/validations'

const debug = makeDebug('mix:commands:app-configs:get')

export default class AppConfigsGet extends MixCommand {
  static description = `get details about an application configuration
  
Use this command to get details about a particular application configuration.
The configuration ID can be retrieved using the app-configs:list command.
Use the 'json' or 'yaml' flag to get the full details as the human-readable
output is brief.`

  static examples = [
    '$ mix app-configs:get -C 3404',
  ]

  static flags = {
    config: MixFlags.appConfigurationFlag,
    json: MixFlags.jsonFlag,
    ...MixFlags.tableFlags({except: ['extended'], useColumnsWithCSVOnly: true}),
    yaml: MixFlags.yamlFlag,
  }

  get columns() {
    debug('get columns()')

    return {
      id: {header: 'ConfigId'},
      tag: {header: 'Tag'},
      parentId: {header: 'ParentId'},
      deploymentFlowId: {header: 'DeploymentFlow'},
      createTime: {header: 'CreateTime'},
    } as Columns
  }

  get domainOptions(): DomainOption[] {
    debug('get domainOptions()')

    return ['config']
  }

  async buildRequestParameters(options: Partial<flags.Output>): Promise<AppConfigsGetParams> {
    debug('buildRequestParameters()')
    const {config: configId} = options

    return {configId}
  }

  doRequest(client: MixClient, params: AppConfigsGetParams): Promise<MixResponse> {
    debug('doRequest()')
    return AppConfigsAPI.getAppConfig(client, params)
  }

  outputHumanReadable(transformedData: any) {
    debug('outputHumanReadable()')
    if (transformedData === undefined) {
      this.log('No application configuration found.')

      return
    }

    this.outputAsKeyValuePairs(transformedData, this.columns)
  }

  setRequestActionMessage(_options: any) {
    debug('setRequestActionMessage()')
    this.requestActionMessage = 'Retrieving application configuration details'
  }

  transformResponse(result: MixResult) {
    debug('transformResponse()')
    const data = result.data as any
    return data.config
  }
}
