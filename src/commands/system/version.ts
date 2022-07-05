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

import * as MixFlags from '../../utils/flags'
import * as SystemAPI from '../../mix/api/system'
import {Config} from '../../utils/config'
import {DomainOption} from '../../utils/validations'
import {MixClient, MixResponse, SystemVersionParams} from '../../mix/types'
import MixCommand from '../../utils/base/mix-command'

const debug = makeDebug('mix:commands:system:version')

export default class SystemVersion extends MixCommand {
  static description = `list Mix API version and environment
  
  Use this command to list Mix APi version and environment information.`

  static examples = ['mix system:version']

  static flags = {
    json: MixFlags.jsonFlag,
    ...MixFlags.tableFlags({except: ['extended', 'filter', 'sort']}),
    yaml: MixFlags.yamlFlag,
  }

  get columns() {
    return {
      mixAPIServer: {header: 'MixAPIServer'},
      mixEnvironment: {header: 'MixEnvironment'},
      mixVersion: {header: 'MixVersion'},
      apiVersion: {header: 'APIVersion'},
    }
  }

  get domainOptions(): DomainOption[] {
    debug('get domainOptions()')
    return []
  }

  async buildRequestParameters(_options: Partial<flags.Output>): Promise<SystemVersionParams> {
    debug('buildRequestParameters()')
    return {}
  }

  doRequest(client: MixClient): Promise<MixResponse> {
    debug('doRequest(')
    return SystemAPI.getSystemVersion(client)
  }

  outputHumanReadable(transformedData: any) {
    debug('outputHumanReadable()')
    const {apiVersion, mixEnvironment, mixVersion} = transformedData
    const mixCLIConfig = Config.getMixCLIConfig()
    const mixAPIServer = mixCLIConfig.apiServer

    return this.log(
      `Mix API server ${chalk.cyan(mixAPIServer)}` +
        `\nrunning API version ${chalk.cyan(apiVersion)}` +
        `\nin environment ${chalk.cyan(mixEnvironment)}` +
        ` on Mix version ${chalk.cyan(mixVersion)}`)
  }

  outputCSV(transformedData: any) {
    debug('outputCSV()')
    const mixCLIConfig = Config.getMixCLIConfig()
    const mixAPIServer = mixCLIConfig.apiServer

    super.outputCSV({
      ...transformedData,
      mixAPIServer,
    })
  }

  setRequestActionMessage(_options: any) {
    debug('setRequestActionMessage()')
    this.requestActionMessage = 'Retrieving system version details'
  }
}
