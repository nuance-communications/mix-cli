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

import * as BotInterfacesAPI from '../../mix/api/bot-interfaces'
import * as MixFlags from '../../utils/flags'
import MixCommand from '../../utils/base/mix-command'
import {BotInterfacesExportParams, MixClient, MixResponse} from '../../mix/types'
import {DomainOption} from '../../utils/validations'

const debug = makeDebug('mix:commands:bot-interfaces:export')

export default class BotInterfacesExport extends MixCommand {
  static description = `export an interface for bot
 
Use this command to export an interface for bot. The configuration ID
can be retrieved using the bot-configs:list command.`

  static examples = [
    'Export an interface for bot',
    '$ mix bot-interfaces:export -B 32 - C 54',
  ]

  static flags = {
    bot: MixFlags.botFlag,
    config: MixFlags.appConfigurationFlag,
    filepath: MixFlags.saveFilePathFlag,
  }

  shouldSaveBody = true

  get domainOptions(): DomainOption[] {
    debug('get domainOptions()')
    return ['bot', 'config']
  }

  async buildRequestParameters(options: Partial<flags.Output>): Promise<BotInterfacesExportParams> {
    debug('buildRequestParameters()')
    const {bot: botId, config: configId} = options

    return {botId, configId}
  }

  doRequest(client: MixClient, params: BotInterfacesExportParams): Promise<MixResponse> {
    debug('doRequest()')
    return BotInterfacesAPI.exportBotInterfaces(client, params)
  }

  outputHumanReadable(_transformedData: any) {
    debug('outputHumanReadable()')
    this.log(`Interface data saved to file (${this.options.filepath ? chalk.cyan(this.options.filepath) : chalk.cyan(`./interface-bot-${this.options.bot}-config-${this.options.config}.json`)}).`)
  }

  setRequestActionMessage(_options: any) {
    debug('setRequestActionMessage()')
    this.requestActionMessage = `Exporting interface for bot ${chalk.cyan(this.options.bot)} with config ${chalk.cyan(this.options.config)}`
  }
}
