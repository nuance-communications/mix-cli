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

import * as BotCredentialsAPI from '../../mix/api/bot-credentials'
import * as MixFlags from '../../utils/flags'
import {BotCredentialsParams, MixClient, MixResponse, MixResult} from '../../mix/types'
import {DomainOption} from '../../utils/validations'
import MixCommand from '../../utils/base/mix-command'

const debug = makeDebug.debug('mix:commands:bot-credentials:list')

export default class BotCredentialsList extends MixCommand {
  static description = `list credentials for a bot
  
Use this command to list the credentials for a bot.
This lets you retrieve the bot ID that is required in other
commands.`

  static examples = [
    'List bot credentials for a bot',
    '$ mix bot-credentials:list -B 12',
    '',
    'List bot credentials for a bot that match a specific environment-geography',
    '$ mix bot-credentials:list -B 12 --with-geo-name "Production US"',
  ]

  static flags = {
    'with-geo-name': MixFlags.geoNameFlag,
    full: MixFlags.showFullBotCredentialsDetailsFlag,
    bot: MixFlags.botFlag,
    ...MixFlags.machineOutputFlags,
  }

  get domainOptions(): DomainOption[] {
    debug('get domainOptions()')
    return ['bot']
  }

  async buildRequestParameters(options: Partial<flags.Output>): Promise<BotCredentialsParams> {
    debug('buildRequestParameters()')
    const {'with-geo-name': envGeographyName, full, bot: botId} = options

    return {
      botId,
      ...(typeof envGeographyName === 'undefined' ? {} : {envGeographyName}),
      view: full ? 'BCV_FULL' : 'BCV_VIEW_UNSPECIFIED',
    }
  }

  doRequest(client: MixClient, params: BotCredentialsParams): Promise<MixResponse> {
    debug('doRequest()')
    return BotCredentialsAPI.listBotCredentials(client, params)
  }

  outputClientDetails(clients: any) {
    debug('outputClientDetails()')
    for (const [clientIndex, client] of clients.entries()) {
      if (clientIndex > 0) {
        this.log() // leave blank line between client blocks
      }

      const {clientId, clientName, oauthScopes, createTime, updateTime} = client
      this.log('  Client Name: ' + clientName)
      this.log('  Client ID: ' + clientId)
      this.log('  OAuth Scopes: ' + oauthScopes.split(' ').sort().join(' '))
      this.log('  Create Time: ' + createTime)
      if (createTime !== updateTime) {
        this.log('  Update Time: ' + updateTime)
      }
    }
  }

  outputHumanReadable(credentials: any, options: Partial<flags.Output>) {
    debug('outputHumanReadable()')
    const {'with-geo-name': geographyName, full, bot: botId} = options

    if (credentials.length === 0) {
      const msg = `No credentials found for bot ID ${chalk.cyan(botId)}` +
        (geographyName ? ` and geography ${chalk.cyan(geographyName)}.` : '.')

      this.log(msg)

      return
    }

    return full ?
      this.outputHumanReadableFull(credentials) :
      this.outputHumanReadableRegular(credentials)
  }

  outputHumanReadableFull(credentials: any) {
    debug('outputHumanReadableFull()')
    for (const [credIndex, cred] of credentials.entries()) {
      if (credIndex > 0) {
        this.log() // leave blank line betweeen runtime bot blocks
      }

      this.log(`${chalk.bold('Bot ID :')} ${chalk.cyan(cred.credential.appId)}`)

      for (const envGeo of cred.geographies) {
        const envType = envGeo.envType
        const geography = envGeo.geography.displayName
        this.log(`${chalk.bold('Environment:')} ${chalk.cyan(envType)} - ${chalk.bold('Geography:')} ${chalk.cyan(geography)}`)
      }

      this.log()

      const {clients} = cred.credential

      if (!Array.isArray(clients) || clients.length === 0) {
        this.log('No clients found for this runtime bot.')
      } else {
        this.outputClientDetails(clients)
      }
    }
  }

  outputHumanReadableRegular(credentials: any) {
    debug('outputHumanReadableRegular()')
    const columns = {
      botId: {header: 'Runtime Bot ID (BotID)'},
      envType: {header: 'Environment'},
      geography: {header: 'Geography'},
    }

    const tableData = []

    for (const cred of credentials) {
      const botId = cred.credential.appId

      for (const g of cred.geographies) {
        const envType = g.envType
        const geography = g.geography.displayName
        tableData.push({botId, envType, geography})
      }
    }

    this.outputCLITable(tableData, columns)
  }

  setRequestActionMessage(_options: any) {
    debug('setRequestActionMessage()')
    this.requestActionMessage = 'Retrieving bot credentials'
  }

  transformResponse(result: MixResult) {
    debug('transformResponse()')
    const data = result.data as any
    return data.credentials
  }
}
