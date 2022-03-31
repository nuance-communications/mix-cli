/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import makeDebug from 'debug'

import buildURL from './utils/build-url'
import {BuildsGetParams, BuildsListParams, BuildsLatestParams} from './builds-types'
import {MixClient, MixResponse} from '../types'

const debug = makeDebug('mix:api:builds')

/**
 * Delete a build.
 * @category builds
 */
export async function deleteBuild(client: MixClient, params: BuildsGetParams): Promise<MixResponse> {
  debug('deleteBuild()')
  const {buildLabel} = params

  return client.request({
    method: 'delete',
    url: buildURL(client.getServer(), `/v4/builds/${buildLabel}`),
  })
}

/**
 * Download the build resources.
 * @category builds
 */
export async function exportBuild(client: MixClient, params: BuildsGetParams): Promise<MixResponse> {
  debug('exportBuild()')
  const {buildLabel, ...requestParams} = params

  return client.request({
    method: 'get',
    url: buildURL(client.getServer(), `/v4/builds/${buildLabel}/.download`, requestParams),
    options: {responseType: 'stream'},
  })
}

/**
 * Retrieve the details of a build.
 * @category builds
 */
export async function getBuild(client: MixClient, params: BuildsGetParams): Promise<MixResponse> {
  debug('getBuild()')
  const {buildLabel} = params

  return client.request({
    method: 'get',
    url: buildURL(client.getServer(), `/v4/builds/${buildLabel}`),
  })
}

/**
 * Retrieve the list of all ASR, NLU, or dialog builds for a project.
 * @category builds
 */
export async function listBuilds(client: MixClient, params: BuildsListParams): Promise<MixResponse> {
  debug('listBuilds()')
  const {projectId, ...requestParams} = params

  return client.request({
    method: 'get',
    url: buildURL(client.getServer(), `/v4/projects/${projectId}/builds`, requestParams),
  })
}

/**
 * Retrieve the latest ASR, NLU, and dialog builds for a project.
 * @category builds
 */
export async function getBuildsLatest(client: MixClient, params: BuildsLatestParams): Promise<MixResponse> {
  debug('getBuildsLatest()')
  const {projectId} = params

  return client.request({
    method: 'get',
    url: buildURL(client.getServer(), `/v4/projects/${projectId}/builds/.latest`),
  })
}
