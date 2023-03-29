/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import chalk from 'chalk'
import {FlagOutput} from '@oclif/core/lib/interfaces'
import makeDebug from 'debug'

import * as AppConfigsAPI from '../../mix/api/app-configs'
import * as MixFlags from '../../utils/flags'
import MixCommand from '../../utils/base/mix-command'
import {AppConfigsDeleteParams, MixClient, MixResponse} from '../../mix/types'
import {DomainOption} from '../../utils/validations'

const debug = makeDebug('mix:commands:app-configs:destroy')

export default class AppConfigsDestroy extends MixCommand {
  static description = `destroy an application configuration
  
Use this command to permanently delete an application configuration.
The deletion needs to be confirmed by re-typing the application configuration
ID when prompted. It can also be pre-confirmed by using the 'confirm' flag.`

  static flags = {
    config: MixFlags.appConfigurationFlag,
    confirm: MixFlags.confirmFlag,
    ...MixFlags.machineOutputFlags,
  }

  get domainOptions(): DomainOption[] {
    debug('get domainOptions()')
    return ['config']
  }

  action = 'destroy'
  shouldConfirmCommand = true

  async buildRequestParameters(options: Partial<FlagOutput>): Promise<AppConfigsDeleteParams> {
    debug('buildRequestParameters()')
    const {config} = options

    return {configId: config}
  }

  doRequest(client: MixClient, params: AppConfigsDeleteParams): Promise<MixResponse> {
    debug('doRequest()')
    return AppConfigsAPI.deleteAppConfig(client, params)
  }

  get expectedConfirmationValue() {
    debug('expectedConfirmationValue()')
    return this.options.config.toString()
  }

  outputHumanReadable(_transformedData: any) {
    debug('outputHumanReadable()')
    // Add app config ID as endpoint response does not provide it
    this.log(`Application configuration ${chalk.cyan(this.options.config)} was deleted.`)
  }

  setRequestActionMessage(_options: any) {
    debug('setRequestActionMessage()')
    this.requestActionMessage = 'Deleting application configuration'
  }

  warnBeforeConfirmation() {
    debug('warnBeforeConfirmation()')
    this.warn(chalk.yellow('Destroying an application configuration cannot be undone.'))
  }
}
