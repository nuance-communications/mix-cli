/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import makeDebug from 'debug'

import buildURL from './utils/build-url'
import {DataHostsListParams, DataHostsLatestParams} from './data-hosts-types'
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

/**
 * Retrieve the list of the data hosts associated with the last generated dialog build.
 * @category data-hosts
 */
export async function listLatestDataHosts(client: MixClient, params: DataHostsLatestParams): Promise<MixResponse> {
  debug('listLatestDataHosts()')
  const {applicationId, projectId, ...requestParams} = params

  return client.request({
    method: 'get',
    url: buildURL(client.getServer(), `/v4/apps/${applicationId}/projects/${projectId}/data-hosts/.latest`, requestParams),
  })
}
