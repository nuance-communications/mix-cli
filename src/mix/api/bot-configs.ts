/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import makeDebug from 'debug'

import {
  BotConfigsListParams,
} from './bot-configs-types'

import buildURL from './utils/build-url'
import {MixClient, MixResponse} from '../types'

const debug = makeDebug('mix:api:bot-configs')

/**
 * Retrieve the list of application configurations for a bot.
 * @category bot-configs
 */
export async function listBotConfigs(client: MixClient, params: BotConfigsListParams): Promise<MixResponse> {
  debug('listBotConfigs()')
  const {botId, ...searchParams} = params

  return client.request({
    method: 'get',
    url: buildURL(client.getServer(), `/v4/bots/${botId}/configs`, searchParams),
  })
}
