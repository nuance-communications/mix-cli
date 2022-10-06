/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import chalk from 'chalk'
import makeDebug from 'debug'
import {writeFileSync} from 'node:fs'

const debug = makeDebug.debug('mix:utils:save-file')

export function saveFile(response: any, filepath: string, shouldOverwrite: boolean) {
  debug('downloadFile() filepath: %s  shouldOverwrite: %s', filepath, shouldOverwrite)
  const flags = shouldOverwrite ? 'w' : 'wx'

  try {
    writeFileSync(filepath, JSON.stringify(response.data), {
      flag: flags,
    })

    const defaultFilePath = `./interface-bot-${response.data.bot}-config-${response.data.config}.json`
    console.log(`Interface data saved to file ${filepath ? chalk.cyan(filepath) : chalk.cyan(defaultFilePath)}.`)
  } catch (error) {
    debug.log(error)
    console.log(chalk.red('File already exist.'))
  }
}
