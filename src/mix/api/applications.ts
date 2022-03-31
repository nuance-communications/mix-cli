/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import makeDebug from 'debug'

import buildURL from './utils/build-url'
import {ApplicationsListParams} from './applications-types'
import {MixClient, MixResponse} from '../types'

const debug = makeDebug('mix:api:applications')

/**
 * Retrieve the list of Mix applications.
 *
 * Nuance Professional Services and global admin users can retrieve the list of
 * Mix applications in all organizations. Other users must specify an
 * organization to which they have access.
 *
 * You can limit the number of results returned and use an offset to determine
 * the starting position of results returned.
 *
 * @category applications
 */
export async function listApplications(client: MixClient, params: ApplicationsListParams): Promise<MixResponse> {
  debug('listApplications()')
  const {orgId, ...requestParams} = params

  return client.request({
    method: 'get',
    url: buildURL(client.getServer(), `/v4/organizations/${orgId}/apps`, requestParams),
  })
}
