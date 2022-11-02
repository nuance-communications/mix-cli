/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import makeDebug from 'debug'

import {
  BotInterfacesExportParams,
  BotInterfacesGetParams,
} from './bot-interfaces-types'

import buildURL from './utils/build-url'
import {MixClient, MixResponse} from '../types'

const debug = makeDebug('mix:api:bot-interfaces')

/**
 * Export the configuration interface (locales, channels, variables, and so on) for a bot.
 * @category bot-interfaces
 */
export async function exportBotInterfaces(client: MixClient, params: BotInterfacesExportParams): Promise<MixResponse> {
  debug('exportBotInterfaces()')
  const {botId, configId, ...requestParams} = params

  return client.request({
    method: 'get',
    url: buildURL(client.getServer(), `/v4/bots/${botId}/configs/${configId}/interface`, requestParams),
  })
}

/**
 * Get the configuration interface (locales, channels, variables, and so on) for a bot.
 * @category bot-interfaces
 */
export async function getBotInterfaces(client: MixClient, params: BotInterfacesGetParams): Promise<MixResponse> {
  debug('getBotInterfaces()')
  const {botId, configId, ...requestParams} = params

  return client.request({
    method: 'get',
    url: buildURL(client.getServer(), `/v4/bots/${botId}/configs/${configId}/interface`, requestParams),
  })
}
