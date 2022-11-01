/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import makeDebug from 'debug'

import buildURL from './utils/build-url'
import {BotsListParams} from './bots-types'
import {MixClient, MixResponse} from '../types'

const debug = makeDebug('mix:api:bots')

/**
 * Retrieve the list of Bots.
 *
 * Nuance Professional Services and global admin users can retrieve the list of
 * bots in all organizations. Other users must specify an
 * organization to which they have access.
 *
 * You can limit the number of results returned and use an offset to determine
 * the starting position of results returned.
 *
 * @category bots
 */
export async function listBots(client: MixClient, params: BotsListParams): Promise<MixResponse> {
  debug('listBots()')
  const {orgId, ...requestParams} = params

  return client.request({
    method: 'get',
    url: buildURL(client.getServer(), `/v4/organizations/${orgId}/bots`, requestParams),
  })
}
