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
import {DataTypesListParams} from './data-types-types'

const debug = makeDebug('mix:api:data-types')

/**
 * Retrieve the available data types.
 *
 * @category data-types
 */
export async function listDataTypes(client: MixClient, params: DataTypesListParams): Promise<MixResponse> {
  debug('listDatatypes()')
  const {...searchParams} = params

  return client.request({
    method: 'get',
    url: buildURL(client.getServer(), '/v4/data-types', searchParams),
  })
}
