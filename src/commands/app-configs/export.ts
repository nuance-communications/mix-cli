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
import {AppConfigsExportParams, MixClient, MixResponse} from '../../mix/types'
import {DomainOption} from '../../utils/validations'

const debug = makeDebug('mix:commands:app-configs:export')

export default class AppConfigsExport extends MixCommand {
  static description = `export an application configuration
 
Use this command to export an application configuration. The configuration ID
can be retrieved using the app-configs:list command. The runtime application ID
can be found with the app-credentials:list command.

The contents of the exported zip file depend on the role you have been granted
on the Mix platform.`

  static examples = [
    'Export an application configuration',
    '$ mix app-configs:export -C 2269 -R NMDPTRIAL_alex_smith_company_com_20190919T190532 -f app-config.zip',
  ]

  static flags = {
    config: MixFlags.appConfigurationFlag,
    filepath: MixFlags.outputFilePathFlag,
    overwrite: MixFlags.overwriteFileFlag,
    'runtime-app': MixFlags.runtimeApplicationFlag,
  }

  shouldDownloadFile = true

  get domainOptions(): DomainOption[] {
    debug('get domainOptions()')
    return ['config']
  }

  async buildRequestParameters(options: Partial<flags.Output>): Promise<AppConfigsExportParams> {
    debug('buildRequestParameters()')
    const {config: configId, 'runtime-app': appId} = options

    return {appId, configId}
  }

  doRequest(client: MixClient, params: AppConfigsExportParams): Promise<MixResponse> {
    debug('doRequest()')
    return AppConfigsAPI.exportAppConfig(client, params)
  }

  outputHumanReadable(_transformedData: any) {
    debug('outputHumanReadable()')
    this.log(`Application configuration exported to file ${chalk.cyan(this.options.filepath)}.`)
  }

  setRequestActionMessage(_options: any) {
    debug('setRequestActionMessage()')
    this.requestActionMessage = 'Exporting application configuration'
  }
}
