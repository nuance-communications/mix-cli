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
  IntentsRenameParams,
} from './intents-types'

import {MixClient, MixResponse} from '../types'

const debug = makeDebug('mix:api:intents')

/**
 * Rename an intent in a project.
 *
 * @category intents
 */
export async function renameIntent(client: MixClient, params: IntentsRenameParams): Promise<MixResponse> {
  debug('renameIntent()')
  const {intentName, projectId, newIntentName} = params
  const body = {newIntentName}

  return client.request({
    method: 'put',
    url: buildURL(client.getServer(), `/v4/projects/${projectId}/intents/${intentName}/.rename`),
    data: body,
  })
}
