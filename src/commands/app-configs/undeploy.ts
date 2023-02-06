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
import {AppConfigsDeployParams, MixClient, MixResponse, MixResult} from '../../mix/types'
import {DomainOption} from '../../utils/validations'

const debug = makeDebug('mix:commands:app-configs:undeploy')

export default class AppConfigsUndeploy extends MixCommand {
  static description = `undeploy an application configuration
  
Use this command to undeploy a specific application configuration.
The configuration ID can be retrieved using the app-configs:list command.
The environment-geographies relevant to an application configuration can be
found in the JSON output of the app-configs:get command.`

  static examples = [
    'Undeploy an application configuration to the next environment-geography',
    '$ mix app-configs:undeploy -C 88',
    '',
    'Undeploy an application configuration from a specific environment-geography',
    '$ mix app-configs:undeploy -C 88 --env-geo 233',
  ]

  static flags = {
    config: MixFlags.appConfigurationFlag,
    'env-geo': MixFlags.envGeoIDMultipleFlag,
    ...MixFlags.machineOutputFlags,
  }

  get columns() {
    debug('get columns()')

    return {
      configId: {header: 'ConfigId'},
      applicationConfigDeploymentId: {header: 'ConfigDeploymentId'},
      environmentGeographyId: {header: 'EnvironmentGeographyId'},
      message: {header: 'Message'},
    }
  }

  get domainOptions(): DomainOption[] {
    debug('get domainOptions()')
    return ['config', 'env-geo[]']
  }

  // Uses same params as deploy
  async buildRequestParameters(options: Partial<flags.Output>): Promise<AppConfigsDeployParams> {
    debug('buildRequestParameters()')
    const {config: configId, 'env-geo': environmentGeographyIds} = options

    return {
      configId,
      ...(typeof environmentGeographyIds === 'undefined' ? {} : {environmentGeographyIds}),
    }
  }

  doRequest(client: MixClient, params: AppConfigsDeployParams): Promise<MixResponse> {
    debug('doRequest()')
    return AppConfigsAPI.undeployAppConfig(client, params)
  }

  outputHumanReadable(transformedData: any) {
    debug('outputHumanReadable()')
    if (transformedData.length === 0) {
      this.log('No application configurations found to undeploy.')

      return
    }

    this.outputCLITable(transformedData, this.columns)
  }

  setRequestActionMessage(options: any) {
    debug('setRequestActionMessage()')
    const optionalEnvGeoInfo = options['env-geo'] ? ` from environmentGeography ID ${options['env-geo']}` : ''
    this.requestActionMessage = `Undeploying application configuration ${options.config}` + optionalEnvGeoInfo
  }

  transformResponse(result: MixResult) {
    debug('transformResponse()')
    const data = result.data as any
    return data.undeployments
  }
}
