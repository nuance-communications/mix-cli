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
import {OrganizationsListParams} from './organizations-types'

const debug = makeDebug('mix:api:organizations')

/**
 * Return the list of organizations on the Mix platform.
 *
 * @category organizations
 */
export async function listOrganizations(client: MixClient, requestParams: OrganizationsListParams): Promise<MixResponse> {
  debug('listOrganizations()')
  return client.request({
    method: 'get',
    url: buildURL(client.getServer(), '/v4/organizations', requestParams),
  })
}
