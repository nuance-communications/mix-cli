/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import makeDebug from 'debug'

import buildURL from './utils/build-url'
import {BotCredentialsListParams} from './bot-credentials-types'
import {MixClient, MixResponse} from '../types'

const debug = makeDebug('mix:api:bot-credentials')

/**
 * Retrieve the list of bots credentials that correspond to the query criteria specified.
 * @category bot-credentials
*/
export async function listBotCredentials(client: MixClient, params: BotCredentialsListParams): Promise<MixResponse> {
  debug('listBotCredentials()')
  const {botId, ...requestParams} = params

  return client.request({
    method: 'get',
    url: buildURL(client.getServer(), `/v4/bots/${botId}/credentials`, requestParams),
  })
}
