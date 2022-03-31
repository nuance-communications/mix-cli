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
import MixCommand from '../../utils/base/mix-command'
import {AppConfigsListParams, MixClient, MixResponse, MixResult} from '../../mix/types'
import {DomainOption} from '../../utils/validations'

const debug = makeDebug('mix:commands:app-configs:list')

export default class AppConfigsList extends MixCommand {
  static description = `list application configurations for a Mix application
  
Use this command to list the application configurations in an organization.
The organization ID can be retrieved using the organizations:list command.
A number of flags can be used to constrain the returned results. The runtime
application IDs can be retrieved using the app-credentials:list command.`

  static examples = [
    '$ mix app-configs:list -M 164 --with-runtime-app NMDPTRIAL_alex_smith_company_com_20190919T190532',
  ]

  static flags = {
    json: MixFlags.jsonFlag,
    'mix-app': MixFlags.mixApplicationFlag,
    'exclude-overrides': MixFlags.excludeOverridesFlag,
    'live-only': MixFlags.liveOnlyFlag,
    ...MixFlags.tableFlags({except: ['extended']}),
    'with-runtime-app': MixFlags.withRuntimeApp,
    'with-tag': MixFlags.withTag,
    yaml: MixFlags.yamlFlag,
  }

  get columns() {
    debug('get columns()')

    return {
      id: {header: 'ConfigId'},
      tag: {header: 'ContextTag'},
      parentId: {header: 'ParentId'},
      deploymentFlowId: {header: 'DeploymentFlow'},
      createTime: {header: 'CreateTime'},
    }
  }

  get domainOptions(): DomainOption[] {
    debug('get domainOptions()')
    return ['mix-app']
  }

  async buildRequestParameters(options: Partial<flags.Output>): Promise<AppConfigsListParams> {
    debug('buildRequestParameters()')
    const {
      'mix-app': applicationId,
      'with-tag': tag,
      'with-runtime-app': appId,
      'live-only': liveOnly,
      'exclude-overrides': excludeOverrides,
    } = options

    return {
      ...(typeof appId === 'undefined' ? {} : {appId}),
      liveOnly,
      excludeOverrides,
      applicationId,
      ...(typeof tag === 'undefined' ? {} : {tag}),
    }
  }

  captureOptions() {
    debug('captureOptions()')
    const {flags} = this.parse(AppConfigsList)
    this.options = flags
  }

  doRequest(client: MixClient, params: AppConfigsListParams): Promise<MixResponse> {
    debug('doRequest()')
    return AppConfigsAPI.listAppConfigs(client, params)
  }

  setRequestActionMessage(_options: any) {
    debug('setRequestActionMessage()')
    this.requestActionMessage = 'Retrieving application configurations'
  }

  transformResponse(result: MixResult) {
    debug('transformResponse()')
    const data = result.data as any
    return data.configs
  }
}
