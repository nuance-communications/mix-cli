/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

/* eslint-disable unicorn/prefer-node-protocol */
/* eslint-disable camelcase */
import * as fs from 'fs'
import {ClientCredentials} from 'simple-oauth2'
import {getUnixTime, parseISO} from 'date-fns'
import makeDebug from 'debug'
import path from 'path'
import {v4 as uuidv4} from 'uuid'

import {eUnauthorized} from './errors'
import {eTokenFileFormat, eTokenFileNotFound} from './errors'

const debug = makeDebug('mix:utils:auth')

const MIN_TIME_TO_TOKEN_RENEWAL = 60 // seconds

let client: any = null
let redirect_uri: string
let clientState: string

export type AuthServerAndCreds = {
  authServerHost: string
  id: string
  secret: string
}

export interface OAuth2Config {
  client: {
    id: string;
    secret: string;
  };
  auth: {
    tokenHost: string;
    tokenPath: string;
    authorizePath: string;
  };
}

export const oAuth = {
  getOAuthAPI: (authServerAndCreds: AuthServerAndCreds) => {
    debug('getOAuthAPI()')
    if (!client) {
      const oAuth2Config = oAuth2API.getOAuth2Config(authServerAndCreds)

      client = new ClientCredentials(oAuth2Config)
      clientState = uuidv4()
    }

    return oAuth2API
  },
}

export const oAuth2API = {
  getAuthorizationURL: (uri: string, scope: string, tenant: string) => {
    debug('getAuthorizationURL()')
    redirect_uri = uri

    return client.authorizeURL({
      redirect_uri,
      state: clientState,
      scope,
      tenant: tenant,
    })
  },

  getAccessToken: async (scope: string) => {
    debug('getAccessToken()')
    let accessToken: any = null
    let errorMessage: string | null = null
    try {
      const {token} = await client.getToken({scope})
      accessToken = token
    } catch (error) {
      errorMessage = `${error?.output?.payload?.message} ?? Access Token error: ${error.message}\n`
    }

    return {accessToken, errorMessage}
  },

  getOAuth2Config: (authServerAndCreds: AuthServerAndCreds): OAuth2Config => {
    debug('getOAuth2Config()')
    const {
      authServerHost,
      id = '',
      secret = '',
    } = authServerAndCreds

    return {
      client: {
        id,
        secret,
      },
      auth: {
        tokenHost: `https://${authServerHost}`,
        tokenPath: '/oauth2/token',
        authorizePath: '/oauth2/auth',
      },
    }
  },

  renewAccessToken: async (scope: string, tokenDir: string, tokenFileName: string): Promise<{renewedToken: any; error: any}> => {
    debug('renewAccessToken()')
    const {accessToken: renewedToken, errorMessage: tokenErrorMessage} = await oAuth2API.getAccessToken(scope)

    let errorMessage: string | null = tokenErrorMessage

    if (renewedToken !== null) {
      errorMessage = oAuth2API.storeAccessToken(renewedToken, tokenDir, tokenFileName)
      return {renewedToken, error: errorMessage}
    }

    return {renewedToken: null, error: eUnauthorized(errorMessage)}
  },

  retrieveAccessToken: (tokenDir: string, tokenFileName: string): any => {
    debug('retrieveAccessToken()')
    let parsedToken: any = null
    let error: any = null

    const tokenFilePath = path.join(tokenDir, tokenFileName)
    if (!fs.existsSync(tokenFilePath)) {
      return {parsedToken, error: eTokenFileNotFound}
    }

    const token = fs.readFileSync(tokenFilePath, {
      encoding: 'utf8',
      flag: 'r',
    })

    try {
      parsedToken = JSON.parse(token)
    } catch {
      parsedToken = null
      error = eTokenFileFormat
    }

    return {parsedToken, error}
  },

  isAccessTokenExpired(token: any): boolean {
    debug('isAccessTokenExpired()')

    // If expiresInSeconds is negative then the token is simply expired.
    // If token is not expired but is close to be expired, token
    // gets renewed to avoid having it expire in the middle of chained
    // endpoint requests
    const {expires_at: expiresAt} = token
    const nowInSeconds = getUnixTime(new Date())
    const expiresAtSeconds = getUnixTime(parseISO(expiresAt))
    const expiresInSeconds = expiresAtSeconds - nowInSeconds
    return (expiresInSeconds < MIN_TIME_TO_TOKEN_RENEWAL)
  },

  storeAccessToken: (token: any, tokenDir: string, tokenFileName: string): string | null => {
    debug('storeAccessToken()')
    let errorMessage: string | null = null

    if (!fs.existsSync(tokenDir)) {
      debug('creating token directory at %s', tokenDir)
      try {
        fs.mkdirSync(tokenDir, {mode: '0700'}) // rwx mode for user only
      } catch (error) {
        const errMessage = error.message ? `: ${error.message}` : ''
        errorMessage = `Failed to create directory ${tokenDir}: ${errMessage}`
        return errorMessage
      }
    }

    const tokenFilePath = path.join(tokenDir, tokenFileName)
    debug('saving token to file')
    try {
      fs.writeFileSync(tokenFilePath, JSON.stringify(token, null, 2), {
        encoding: 'utf8',
        mode: '0600', // rw mode for user only
        flag: 'w',
      })
    } catch (error) {
      const errMessage = error.message ? `: ${error.message}` : ''
      errorMessage = `Failed to write token file${errMessage}`
      return errorMessage
    }

    return errorMessage
  },
}
