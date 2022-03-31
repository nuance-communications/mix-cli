/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

/* eslint-disable unicorn/prefer-node-protocol */
import makeDebug from 'debug'
import {createReadStream} from 'fs'
import FormData from 'form-data'
import path from 'path'

const debug = makeDebug.debug('mix:utils:create-form')

export function createForm(filePath: string): any {
  debug('createForm()')
  const fileName = filePath.split(path.delimiter).pop()
  debug(`fileName: ${fileName}`)
  const fileStream = createReadStream(filePath)
  const form = new FormData()
  form.append('file', fileStream, fileName)

  return form
}
