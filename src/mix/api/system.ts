/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import makeDebug from 'debug'

import buildURL from './utils/build-url'
import {MixClient, MixResponse} from '../types'
import {SystemVersionParams} from './system-types'

const debug = makeDebug('mix:api:system')

/**
 * Get system versions.
 *
 * @category system
 */
export async function getSystemVersion(client: MixClient, _requestParams: SystemVersionParams = {}): Promise<MixResponse> {
  debug('getSystemVersion()')
  return client.request({
    method: 'get',
    url: buildURL(client.getServer(), '/v4/version'),
  })
}
