/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import makeDebug from 'debug'

import buildURL from './utils/build-url'
import {EnginePacksListParams} from './engine-packs-types'
import {MixClient, MixResponse} from '../types'

const debug = makeDebug('mix:api:engine-packs')

/**
 * Retrieve the list of all available engine packs in an organization as well as
 * the Nuance core data packs that are supported for each engine pack.
 *
 * @category engine-packs
 */
export async function listEnginePacks(client: MixClient, params: EnginePacksListParams): Promise<MixResponse> {
  debug('listEnginePacks()')
  const {orgId, ...requestParams} = params

  return client.request({
    method: 'get',
    url: buildURL(client.getServer(), `/v4/organizations/${orgId}/engine-packs`, requestParams),
  })
}
