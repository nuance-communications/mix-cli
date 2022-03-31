/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import makeDebug from 'debug'

import buildURL from './utils/build-url'
import {LanguageTopicsListParams} from './language-topics-types'
import {MixClient, MixResponse} from '../types'

const debug = makeDebug('mix:api:language-topics')

/**
 * Retrieve the list of language topics available in an organization.
 *
 * @category language-topics
 */
export async function listLanguageTopics(client: MixClient, params: LanguageTopicsListParams): Promise<MixResponse> {
  debug('listLanguageTopics()')
  const {orgId} = params

  return client.request({
    method: 'get',
    url: buildURL(client.getServer(), `/v4/organizations/${orgId}/language-topics`),
  })
}
