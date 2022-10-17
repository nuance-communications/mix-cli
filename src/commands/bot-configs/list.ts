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

import * as BotConfigsAPI from '../../mix/api/bot-configs'
import * as MixFlags from '../../utils/flags'
import MixCommand from '../../utils/base/mix-command'
import {BotConfigsListParams, MixClient, MixResponse, MixResult} from '../../mix/types'
import {DomainOption} from '../../utils/validations'

const debug = makeDebug('mix:commands:bot-configs:list')

export default class BotConfigsList extends MixCommand {
  static description = `list application configurations for a bot
  
Use this command to list the application configurations for a bot.
A number of flags can be used to constrain the returned results. The runtime
bot IDs can be retrieved using the bot-credentials:list command.`

  static examples = [
    '$ mix bot-configs:list -B 164 --with-runtime-app NMDPTRIAL_alex_smith_company_com_20190919T190532',
  ]

  static flags = {
    json: MixFlags.jsonFlag,
    bot: MixFlags.botFlag,
    'exclude-overrides': MixFlags.excludeOverridesFlag,
    'live-only': MixFlags.liveOnlyFlag,
    ...MixFlags.tableFlags({except: ['extended']}),
    'with-runtime-app': MixFlags.withRuntimeApp,
    'with-tag': MixFlags.withTag,
    yaml: MixFlags.yamlFlag,
  }

  get columns() {
    debug('get columns()')
    return {
      id: {header: 'ConfigId'},
      tag: {header: 'ContextTag'},
      parentId: {header: 'ParentId'},
      hasInterface: {header: 'HasInterface'},
      createTime: {header: 'CreateTime'},
    }
  }

  get domainOptions(): DomainOption[] {
    debug('get domainOptions()')
    return ['bot']
  }

  async buildRequestParameters(options: Partial<flags.Output>): Promise<BotConfigsListParams> {
    debug('buildRequestParameters()')
    const {
      bot: botId,
      'with-tag': tag,
      'with-runtime-app': appId,
      'live-only': liveOnly,
      'exclude-overrides': excludeOverrides,
    } = options

    return {
      ...(typeof appId === 'undefined' ? {} : {appId}),
      liveOnly,
      excludeOverrides,
      botId,
      ...(typeof tag === 'undefined' ? {} : {tag}),
    }
  }

  doRequest(client: MixClient, params: BotConfigsListParams): Promise<MixResponse> {
    debug('doRequest()')
    return BotConfigsAPI.listBotConfigs(client, params)
  }

  outputHumanReadable(transformedData: any) {
    debug('outputHumanReadable()')
    const {columns} = this
    if (transformedData.length === 0) {
      const msg = 'No configurations found.'
      this.log(msg)

      return
    }

    super.outputCLITable(transformedData, columns)
  }

  setRequestActionMessage(options: any) {
    debug('setRequestActionMessage()')
    this.requestActionMessage = `Retrieving application configurations for bot ID ${chalk.cyan(options.bot)}`
  }

  transformResponse(result: MixResult) {
    debug('transformResponse()')
    const data = result.data as any
    return data.configs
  }
}
