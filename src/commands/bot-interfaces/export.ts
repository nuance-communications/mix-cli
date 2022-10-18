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
  static description = `export the interface of a bot
 
Use this command to export the interface of a bot.
The configuration ID can be retrieved using the bot-configs:list command.

Bots are used in certain integration scenarios. A bot is a Mix application
with configurations that include dialog builds.

See https://docs.mix.nuance.com/mix-api/v4/#bots for details.`

  static examples = [
    'Export the interface of a bot',
    '$ mix bot-interfaces:export -B 32 -C 54',
  ]

  static flags = {
    bot: MixFlags.botFlag,
    config: MixFlags.appConfigurationFlag,
    filepath: {
      ...MixFlags.outputFilePathFlag,
      required: false,
    },
    overwrite: MixFlags.overwriteFileFlag,
  }

  shouldSaveBody = true

  get getFilePath(): string {
    debug('get getFilePath()')
    const filePath = this.options.filePath ?? this.getDefaultFilePath()
    return filePath
  }

  getDefaultFilePath(): string {
    const defaultFilePath = `./interface-bot-${this.options.bot}-config-${this.options.config}.json`
    return defaultFilePath
  }

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

  outputHumanReadable(_transformedData: any, options: any) {
    debug('outputHumanReadable()')
    const defaultFilePath = this.getDefaultFilePath()
    console.log(`Interface data saved to file ${options.filepath ? chalk.cyan(options.filepath) : chalk.cyan(defaultFilePath)}.`)
  }

  setRequestActionMessage(options: any) {
    debug('setRequestActionMessage()')
    this.requestActionMessage = `Exporting interface for bot ${chalk.cyan(options.bot)} with config ${chalk.cyan(options.config)}`
  }
}
