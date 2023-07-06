/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import makeDebug from 'debug'
import {VoicesListParams} from './voices-types'
import {MixClient, MixResponse} from '../types'
import buildURL from './utils/build-url'

const debug = makeDebug('mix:api:voices')

/**
 * List voices in an organization.
 *
 * @category voices
 */

export async function listVoices(client: MixClient, params: VoicesListParams): Promise<MixResponse> {
  debug('listVoices()')
  const {orgId} = params

  return client.request({
    method: 'get',
    url: buildURL(client.getServer(), `/v4/organizations/${orgId}/voices`),
  })
}
