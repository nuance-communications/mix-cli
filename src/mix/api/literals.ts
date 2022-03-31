/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import makeDebug from 'debug'

import {createForm} from './utils/create-form'
import buildURL from './utils/build-url'
import {LiteralsExportParams, LiteralsImportParams} from './literals-types'
import {MixClient, MixResponse} from '../types'

const debug = makeDebug('mix:api:literals')

/**
 * Append the literal-value pairs in the provided file to the existing ones for
 * the specified project and entity. The literal-value pairs must be provided in
 * a valid TRSX file (.trsx), a .list file, or a .nmlist file.
 *
 * @category literals
 */
export async function appendLiterals(client: MixClient, params: LiteralsImportParams): Promise<MixResponse> {
  debug('appendLiterals()')
  const {entityName, filePath, projectId, ...requestParams} = params
  const form = createForm(filePath)

  return client.request({
    method: 'put',
    url: buildURL(client.getServer(), `/v4/projects/${projectId}/entities/${entityName}/literals/.append`, requestParams),
    data: form,
    headers: form.getHeaders(),
  })
}

/**
 * Export the literal-value pairs for an entity.
 *
 * @category literals
 */
export async function exportLiterals(client: MixClient, params: LiteralsExportParams): Promise<MixResponse> {
  debug('exportLiterals()')
  const {entityName, projectId, ...requestParams} = params

  return client.request({
    method: 'get',
    url: buildURL(client.getServer(), `/v4/projects/${projectId}/entities/${entityName}/literals/.export`, requestParams),
    options: {responseType: 'stream'},
  })
}

/**
 * Replace the rule-based GrXML grammars for an entity. The GrXML files must be
 * provided in a .zip file, in a folder identifying the locale for the grammar
 * (for example, en-US/grammar.grxml). Note that rule-based grammars are
 * restricted to Nuance Professional Services users and not available to all
 * users.
 *
 * @category literals
 */
export async function replaceLiterals(client: MixClient, params: LiteralsImportParams): Promise<MixResponse> {
  debug('replaceLiterals()')
  const {entityName, filePath, projectId, ...requestParams} = params
  const form = createForm(filePath)

  return client.request({
    method: 'post',
    url: buildURL(client.getServer(), `/v4/projects/${projectId}/entities/${entityName}/literals/.replace`, requestParams),
    data: form,
    headers: form.getHeaders(),
  })
}
