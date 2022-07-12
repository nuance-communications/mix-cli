/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import makeDebug from 'debug'

import buildURL from './utils/build-url'

import {
  IntentsDeleteParams,
} from './intents-types'

import {MixClient, MixResponse} from '../types'

const debug = makeDebug('mix:api:intents')

/**
 * Delete an intent from a project.
 *
 * @category intents
 */
export async function deleteIntent(client: MixClient, params: IntentsDeleteParams): Promise<MixResponse> {
  debug('deleteIntent()')
  const {projectId, intentName} = params

  return client.request({
    method: 'delete',
    url: buildURL(client.getServer(), `/v4/projects/${projectId}/intents/${intentName}`),
  })
}
