/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import crypto from 'crypto'

const mixAPIServer = 'mix-api.example.com'

export const mixAPIServerURL = `https://${mixAPIServer}`

export const getMixCLIConfigMock = {
  authServer: 'auth.example.com',
  clientId: crypto.randomUUID(),
  clientSecret: crypto.randomUUID(),
  apiServer: mixAPIServer, 
  scope: 'mix-api',
  tenant: 'mix'
}

export const oAuthMock = {
  renewAccessToken: () => {},
  retrieveAccessToken: () => {
    return {
      error: null,
      parsedToken: {}
    }
  },
  isAccessTokenExpired: () => {false}
}
