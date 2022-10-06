/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import makeDebug from 'debug'
import {writeFileSync} from 'node:fs'

const debug = makeDebug.debug('mix:utils:save-file')

export function saveFile(response: any, filepath: string, shouldOverwrite: boolean) {
  debug('downloadFile() filepath: %s  shouldOverwrite: %s', filepath, shouldOverwrite)
  const flags = shouldOverwrite ? 'w' : 'wx'

  writeFileSync(filepath, JSON.stringify(response.data), {
    flag: flags,
  })
}
