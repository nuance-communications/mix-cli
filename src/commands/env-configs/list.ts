/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {FlagOutput} from '@oclif/core/lib/interfaces'
import makeDebug from 'debug'

import * as MixFlags from '../../utils/flags'
import MixCommand from '../../utils/base/mix-command'
import {MixClient, MixResponse, MixResult} from '../../mix/types'
import {EnvConfigsListParams} from '../../mix/api/env-configs-types'
import {listEnvConfigs} from '../../mix/api/env-configs'

const debug = makeDebug('mix:commands:env-configs:list')
export default class EnvConfigsList extends MixCommand {
  static description = `list environment configurations
  
  Use this command to list all environment configurations for a specific project.`

  static examples = [
    'List environment configurations for the project with ID 29050',
    'mix projects:list -P 29050',
  ]

  static flags = {
    json: MixFlags.jsonFlag,
    project: MixFlags.projectWithDefaultFlag,
    yaml: MixFlags.yamlFlag,
  }

  async buildRequestParameters(options: Partial<FlagOutput>): Promise<EnvConfigsListParams> {
    debug('buildRequestParameters()')
    return {projectId: options.project}
  }

  doRequest(client: MixClient, params: EnvConfigsListParams): Promise<MixResponse> {
    debug('doRequest()')
    return listEnvConfigs(client, params)
  }

  outputHumanReadable(transformedData: any) {
    debug('outputHumanReadable()')
    if (transformedData.length === 0) {
      this.log('No application configurations found.')
    }

    // this.outputCLITable(transformedData, this.columns)
  }

  setRequestActionMessage(_options: any) {
    debug('setRequestActionMessage()')
    this.requestActionMessage = 'Retrieving environment configurations'
  }

  transformResponse(result: MixResult) {
    debug('transformResponse()')
    return result.data
  }
}
