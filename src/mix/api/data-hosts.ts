/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import makeDebug from 'debug'

import buildURL from './utils/build-url'
import {DataHostsListParams} from './data-hosts-types'
import {MixClient, MixResponse} from '../types'

const debug = makeDebug('mix:api:data-hosts')

/**
 * Retrieve the list of data hosts for the build and application specified.
 * @category data-hosts
 */
export async function listDataHosts(client: MixClient, params: DataHostsListParams): Promise<MixResponse> {
  debug('listDataHosts()')
  const {buildLabel, ...requestParams} = params

  return client.request({
    method: 'get',
    url: buildURL(client.getServer(), `/v4/builds/${buildLabel}/data-hosts`, requestParams),
  })
}
