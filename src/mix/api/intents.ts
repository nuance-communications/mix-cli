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
  IntentsCreateParams,
} from './intents-types'

import {MixClient, MixResponse} from '../types'

const debug = makeDebug('mix:api:intents')

/**
 * Create a new intent in a project.
 *
 * @category intents
 */
export async function createIntent(client: MixClient, params: IntentsCreateParams): Promise<MixResponse> {
  debug('createIntent()')
  const {projectId, intentName} = params
  const body = {intentName}

  return client.request({
    method: 'post',
    url: buildURL(client.getServer(), `/v4/projects/${projectId}/intents`),
    data: body,
  })
}
