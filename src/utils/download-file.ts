/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

/** eslint-disable unicorn/prefer-node-protocol */
import makeDebug from 'debug'
import {createWriteStream} from 'node:fs'

const debug = makeDebug.debug('mix:utils:download-file')

export function downloadFile(response: any, filepath: string, shouldOverwrite: boolean) {
  debug('downloadFile() filepath: %s  shouldOverwrite: %s', filepath, shouldOverwrite)
  const flags = shouldOverwrite ? 'w' : 'wx'
  const writer = createWriteStream(filepath, {flags})

  return new Promise((resolve, reject) => {
    const outstream = response.data.pipe(writer)

    outstream.on('finish', () => {
      debug('outstream received "finish" event')
      resolve(true)
    })

    outstream.on('error', (error: any) => {
      debug(`outstream received "error" event ${error}`)
      reject(error)
    })
  })
}
