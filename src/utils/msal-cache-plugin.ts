/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 *
 * This was inspired from:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/tree/dev/lib/msal-node
 */
import makeDebug from 'debug'

import fs from 'node:fs'

const debug = makeDebug('mix:utils:msal-cache-plugin')

export default function getMSALCachePlugin(cacheLocation: string) {
  debug('getMSALCachePlugin()')

  const beforeCacheAccess = (cacheContext: any) => {
    return new Promise<void>((resolve, reject) => {
      if (fs.existsSync(cacheLocation)) {
        fs.readFile(cacheLocation, 'utf-8', (err:any, data:any) => {
          if (err) {
            debug('error reading cache file: %O', err)
            reject(err)
          } else {
            cacheContext.tokenCache.deserialize(data)
            resolve()
          }
        })
      } else {
        debug('cache file does not exist: creating')
        fs.writeFile(
          cacheLocation,
          cacheContext.tokenCache.serialize(),
          (err: any) => {
            if (err) {
              debug('error writing cache file: %O', err)
              reject(err)
            }
          },
        )

        resolve()
      }
    })
  }

  const afterCacheAccess = (cacheContext: { cacheHasChanged: any; tokenCache: { serialize: () => any } }) => {
    return new Promise<void>((resolve, reject) => {
      if (cacheContext.cacheHasChanged) {
        debug('cache has changed: writing to file')
        fs.writeFile(
          cacheLocation,
          cacheContext.tokenCache.serialize(),
          (err: any) => {
            if (err) {
              reject(err)
            }

            resolve()
          },
        )
      } else {
        debug('cache has not changed')
        resolve()
      }
    })
  }

  return {
    beforeCacheAccess,
    afterCacheAccess,
  }
}
