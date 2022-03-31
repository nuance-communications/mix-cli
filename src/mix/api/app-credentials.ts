/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import makeDebug from 'debug'

import buildURL from './utils/build-url'
import {AppCredentialsListParams} from './app-credentials-types'
import {MixClient, MixResponse} from '../types'

const debug = makeDebug('mix:api:app-credentials')

/**
 * Retrieve the list of application credentials that correspond to the query criteria specified.
 * @category app-credentials
 */
export async function listAppCredentials(client: MixClient, params: AppCredentialsListParams): Promise<MixResponse> {
  debug('listAppCredentials()')
  const {applicationId, ...requestParams} = params

  return client.request({
    method: 'get',
    url: buildURL(client.getServer(), `/v4/apps/${applicationId}/credentials`, requestParams),
  })
}
