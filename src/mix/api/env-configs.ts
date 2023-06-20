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
import {EnvConfigsListParams} from './env-configs-types'

const debug = makeDebug('mix:api:env-configs')

/**
 * Retrieve the list of environment configurations available in the Mix project specified.
 * @category env-configs
 */
export async function listEnvConfigs(client: MixClient, params: EnvConfigsListParams): Promise<MixResponse> {
  debug('listEnvConfigs()')
  const {projectId} = params
  return client.request({
    method: 'get',
    url: buildURL(client.getServer(), `/v4/projects/${projectId}/env-configs`),
  })
}
