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
import {MixClient, MixResponse} from '../types'
import {SamplesExportParams, SamplesImportParams} from './samples-types'

const debug = makeDebug('mix:api:samples')

/**
 * Append the samples in the provided file to the existing samples for the
 * specified project and intent. The samples must be provided in a valid
 * TRSX file (.trsx) or in a text file (.txt).
 *
 * @category samples
 */
export async function appendSamples(client: MixClient, params: SamplesImportParams): Promise<MixResponse> {
  debug('appendSamples()')
  const {filePath, intentName, projectId,  ...requestParams} = params
  const form = createForm(filePath)

  return client.request({
    method: 'put',
    url: buildURL(client.getServer(), `/v4/projects/${projectId}/intents/${intentName}/samples/.append`, requestParams),
    data: form,
    headers: form.getHeaders(),
  })
}

/**
 * Export the samples for an intent in a project.
 *
 * @category samples
 */
export async function exportSamples(client: MixClient, params: SamplesExportParams): Promise<MixResponse> {
  debug('exportSamples()')
  const {intentName, projectId, ...requestParams} = params

  return client.request({
    method: 'get',
    url: buildURL(client.getServer(), `/v4/projects/${projectId}/intents/${intentName}/samples/.export`, requestParams),
    options: {responseType: 'stream'},
  })
}

/**
 * Replace the existing project samples associated with an intent with the
 * ones provided in the file. The samples must be provided in a valid TRSX
 * file (.trsx) or in a text file (.txt).
 * !!! IMPORTANT !!! This endpoint will delete any existing project samples.
 *
 * @category samples
 */
export async function replaceSamples(client: MixClient, params: SamplesImportParams): Promise<MixResponse> {
  debug('replaceSamples()')
  const {filePath, intentName, projectId,  ...requestParams} = params
  const form = createForm(filePath)

  return client.request({
    method: 'post',
    url: buildURL(client.getServer(), `/v4/projects/${projectId}/intents/${intentName}/samples/.replace`, requestParams),
    data: form,
    headers: form.getHeaders(),
  })
}
