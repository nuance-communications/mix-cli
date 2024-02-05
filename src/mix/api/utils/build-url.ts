/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

/* eslint-disable unicorn/prefer-node-protocol */
import {URL} from 'url'

import {MixRequestSearchParams, ServerInfo} from '../../types'

export default function buildURL(serverInfo: ServerInfo, path: string, params?: MixRequestSearchParams): URL {
  const paramsList = []
  const safeParams = typeof params === 'undefined' ? {} : params

  for (const [key, value] of Object.entries(safeParams)) {
    if (Array.isArray(value)) {
      for (const v of value) {
        paramsList.push([key, v])
      }
    } else if (typeof value !== 'undefined') {
      paramsList.push([key, value.toString()])
    }
  }

  let url
  try {
    const searchParams = new URLSearchParams(paramsList)

    // Adjust path based on tenant
    url = new URL(`${serverInfo.pathPrefix}${path}`, `https://${serverInfo.server}`)
    url.search = searchParams.toString()
  } catch {
    throw new Error('invalid server URL; verify the value for apiServer in your configuration file.')
  }

  return url
}
