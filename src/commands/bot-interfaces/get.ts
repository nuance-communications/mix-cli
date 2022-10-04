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

import * as BotInterfacesGetAPI from '../../mix/api/bot-interfaces'
import * as MixFlags from '../../utils/flags'
import MixCommand from '../../utils/base/mix-command'
import {BotInterfacesGetParams, MixClient, MixResponse, MixResult} from '../../mix/types'
import {DomainOption} from '../../utils/validations'

const debug = makeDebug('mix:commands:bot-interfaces:get')

export default class BotInterfacesGet extends MixCommand {
  static description = `retrive an interface for bot
 
Use this command to get an interface for bot. The configuration ID
can be retrieved using the bot-configs:list command.`

  static examples = [
    'Retrive an interface for bot',
    '$ mix bot-interfaces:get -B 32 - C 54',
  ]

  static flags = {
    json: MixFlags.jsonFlag,
    bot: MixFlags.botFlag,
    config: MixFlags.appConfigurationFlag,
    yaml: MixFlags.yamlFlag,
  }

  get domainOptions(): DomainOption[] {
    debug('get domainOptions()')
    return ['bot', 'config']
  }

  async buildRequestParameters(options: Partial<flags.Output>): Promise<BotInterfacesGetParams> {
    debug('buildRequestParameters()')
    const {bot: botId, config: configId} = options

    return {botId, configId}
  }

  doRequest(client: MixClient, params: BotInterfacesGetParams): Promise<MixResponse> {
    debug('doRequest()')
    return BotInterfacesGetAPI.getBotInterfaces(client, params)
  }

  outputHumanReadable(_transformedData: any) {
    debug('outputHumanReadable()')

    this.log(`${chalk.bold('Bot interface ID:')} ${chalk.cyan(_transformedData.id)}`)
    this.log(`${chalk.bold('Version:')} ${chalk.cyan(_transformedData.Version)}`)
    this.log(`${chalk.bold('LanguageTopic:')} ${chalk.cyan(_transformedData.LanguageTopic)}`)
    this.log(`${chalk.bold('Locales:')} ${chalk.cyan(_transformedData.locales)}`)
    this.log('\n This bot interface defines:')
    this.log(Object.keys(_transformedData.channels).length + ' channels')
    this.log(Object.keys(_transformedData.variables).length + ' variables')
    this.log(Object.keys(_transformedData.transferNodes).length + ' transfer nodes')

    this.log('\n Use this command with the `json` flag to get the complete interface.')
    this.log('\n Use the bot-interfaces:export command to export the interface to a JSON file.')
  }

  setRequestActionMessage(_options: any) {
    debug('setRequestActionMessage()')
    this.requestActionMessage = `Retrieving interface for bot ${chalk.cyan(this.options.bot)} with config ${chalk.cyan(this.options.config)}`
  }

  transformResponse(result: MixResult) {
    debug('transformResponse()')
    const data = result.data as any
    return data.interface
  }
}
