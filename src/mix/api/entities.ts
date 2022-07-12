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
  EntitiesGetParams,
} from './entities-types'

import {MixClient, MixResponse} from '../types'

const debug = makeDebug('mix:api:entities')

/**
 * Retrieve the details of an entity in a project.
 *
 * @category entities
 */
export async function getEntity(client: MixClient, params: EntitiesGetParams): Promise<MixResponse> {
  debug('getEntity()')
  const {entityName, projectId} = params

  return client.request({
    method: 'get',
    url: buildURL(client.getServer(), `/v4/projects/${projectId}/entities/${entityName}`),
  })
}