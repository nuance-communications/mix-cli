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

import * as AppConfigsAPI from '../../mix/api/app-configs'
import * as MixFlags from '../../utils/flags'
import MixCommand from '../../utils/base/mix-command'
import {AppConfigsDeployParams, MixClient, MixResponse} from '../../mix/types'
import {DomainOption} from '../../utils/validations'

const debug = makeDebug('mix:commands:app-configs:deploy')

export default class AppConfigsDeploy extends MixCommand {
  static description = `deploy an application configuration
  
Use this command to deploy an application configuration. The configuration ID
can be retrieved using the app-configs:list command.

A specific environment-geography can be specified using the --env-geo flag.
If none is specified, the application configuration will get deployed to the
next environment-geography defined in the deployment flow specified when
the application configuration was created.
  `

  static examples = [
    'Deploy an application configuration to the next environment-geography',
    '$ mix app-configs:deploy -C 88',
    '',
    'Deploy an application configuration to a specific environment-geography',
    '$ mix app-configs:deploy -C 88 --env-geo 233',
  ]

  static flags = {
    config: MixFlags.appConfigurationFlag,
    'env-geo': MixFlags.envGeoIDMultipleFlag,
    ...MixFlags.machineOutputFlags,
  }

  get domainOptions(): DomainOption[] {
    debug('get domainOptions()')
    return ['config', 'env-geo[]']
  }

  async buildRequestParameters(options: Partial<flags.Output>): Promise<AppConfigsDeployParams> {
    debug('buildRequestParameters()')
    const {config: configId, 'env-geo': environmentGeographyIds} = options

    return {
      configId,
      ...(typeof environmentGeographyIds === 'undefined' ? {} : {environmentGeographyIds}),
    }
  }

  doRequest(client: MixClient, params: AppConfigsDeployParams): Promise<MixResponse> {
    debug('doRequest(')
    return AppConfigsAPI.deployAppConfig(client, params)
  }

  outputHumanReadable(transformedData: any) {
    debug('outputHumanReadable()')
    const {deployments} = transformedData

    for (const deployment of deployments) {
      const {id: deploymentId, configId} = deployment

      this.log(`Application configuration ID ${chalk.cyan(configId)} deployed ` +
        `with deployment ID ${chalk.cyan(deploymentId)}`)
    }
  }

  setRequestActionMessage(_options: any) {
    debug('setRequestActionMessage()')
    this.requestActionMessage = 'Deploying application configuration'
  }
}
