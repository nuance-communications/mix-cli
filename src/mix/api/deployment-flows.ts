/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import makeDebug from 'debug'

import buildURL from './utils/build-url'
import {DeploymentFlowsListParams} from './deployment-flows-types'
import {MixClient, MixResponse} from '../types'

const debug = makeDebug('mix:api:deployment-flows')

/**
 * Get the list of deployment flows available in an organization.
 *
 * You can limit the number of results returned and use an offset to determine
 * the starting position of results returned.
 *
 * You can also sort the results by id or displayName and specify the sort order
 * with the - or + sign. For example, to sort by alphabetical order of
 * displayName, enter +displayName. You can also specify multiple sorting fields
 * by separating them with commas; for example: +displayName,-id.
 *
 * @category deployment-flows
 */
export async function listDeploymentFlows(client: MixClient, params: DeploymentFlowsListParams): Promise<MixResponse> {
  debug('listDeploymentFlows()')
  const {orgId, ...requestParams} = params

  return client.request({
    method: 'get',
    url: buildURL(client.getServer(), `/v4/organizations/${orgId}/deployment-flows`, requestParams),
  })
}
