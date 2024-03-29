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

See https://docs.nuance.com/mix/apis/mix-api/v4/reference/bots/ for details.`

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

  get filepath(): string {
    debug('get filepath()')
    const filePath = this.options.filepath ?? this.defaultFilepath
    return filePath
  }

  get defaultFilepath(): string {
    debug('get defaultFilepath()')
    const defaultFilePath = `interface-bot-${this.options.bot}-config-${this.options.config}.json`
    return defaultFilePath
  }

  get domainOptions(): DomainOption[] {
    debug('get domainOptions()')
    return ['bot', 'config']
  }

  async buildRequestParameters(options: Partial<FlagOutput>): Promise<BotInterfacesExportParams> {
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
    console.log(`Bot interface exported to file ${options.filepath ? chalk.cyan(options.filepath) : chalk.cyan(this.defaultFilepath)}.`)
  }

  setRequestActionMessage(options: any) {
    debug('setRequestActionMessage()')
    this.requestActionMessage = `Exporting interface for bot ${chalk.cyan(options.bot)} with config ${chalk.cyan(options.config)}`
  }
}
