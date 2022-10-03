/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

/** eslint-disable unicorn/prefer-node-protocol */
import makeDebug from 'debug'
import {writeFile} from 'node:fs'

const debug = makeDebug.debug('mix:utils:download-file')

export function saveFile(response: any, filepath: string) {
  debug('downloadFile() filepath: %s  shouldOverwrite: %s', filepath)

  writeFile((filepath ? filepath : `./interface-bot-${response.data.bot}-config-${response.data.config}.json`), JSON.stringify(response.data), err => {
    if (err) throw err

    debug('File saved successfully')
  })
}
