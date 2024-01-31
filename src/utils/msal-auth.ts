/*
 * copyright 2024, nuance, inc. and its contributors.
 * all rights reserved.
 *
 * this source code is licensed under the apache-2.0 license found in
 * the license file in the root directory of this source tree.
 */

import makeDebug from 'debug'
// eslint-disable-next-line node/no-missing-import
import msal, {InteractionRequiredAuthError} from '@azure/msal-node'

import getMSALCachePlugin from './msal-cache-plugin'

const debug = makeDebug('mix:util:msal-auth')

const AUTHENTICATION_TIMEOUT_SEC = 60

export function getMSALClient(
  {authority, configDir, clientId}:
  {authority: string, configDir: string, clientId: string}): msal.PublicClientApplication | null {
  debug('getMSALClient()')

  const cacheFilePath = `${configDir}/msal-cache.json`
  let cachePlugin: any

  debug('cacheFilePath: %s', cacheFilePath)

  let pca

  try {
    cachePlugin = getMSALCachePlugin(cacheFilePath)

    const clientConfig = {
      auth: {
        clientId,
        authority,
      },
      cache: {
        cachePlugin,
      },
    }

    pca = new msal.PublicClientApplication(clientConfig)
  } catch (error) {
    debug('failed to create MSAL client')
    console.log(error)
    return null
  }

  return pca
}

export async function getMSALTokenDeviceCode(options: any) {
  const {
    pca,
    scope,
    callback,
  } = options

  debug('getMSALTokenDeviceCode()')
  const deviceCodeRequest = {
    scopes: [scope],
    deviceCodeCallback: callback,
    timeout: AUTHENTICATION_TIMEOUT_SEC,
  }

  let response

  try {
    debug('acquiring token using device code flow')

    response = await pca.acquireTokenByDeviceCode(deviceCodeRequest)
  } catch (error) {
    debug('failed to acquire token using device code flow')
    console.log(error.message)
    response = null
  }

  return response
}

export async function getMSALTokenSilent(options: any) {
  const {
    pca,
    scope,
    callback,
  } = options

  debug('getMSALTokenSilent()')
  const accounts = await pca.getTokenCache().getAllAccounts()

  let token

  if (accounts.length === 1) {
    debug('one account found in cache')

    const [account] = accounts
    const silentRequest = {account}

    try {
      token = pca.acquireTokenSilent(silentRequest)
    } catch (error) {
      debug('failed to acquire token silently')
      if (error instanceof InteractionRequiredAuthError) {
        debug('switching to device code flow')
        console.log(error)
        return getMSALTokenDeviceCode({pca, scope, callback})
      }
    }

    debug('retrieved token from cache')
    return token
  }

  // TODO: handle multiple accounts in cache
  if (accounts.length > 1) {
    debug('multiple accounts found in cache')
    // this.error('Handling of multiple cached accounts not implemented yet')
  } else {
    debug('no account found in cache')
    return null
  }
}
