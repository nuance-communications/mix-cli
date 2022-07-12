/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import makeDebug from 'debug'

import buildURL from './utils/build-url'

import {
  IntentsCreateParams,
  IntentsDeleteParams,
  IntentsGetParams,
  IntentsListParams,
  IntentsRenameParams,
} from './intents-types'

import {MixClient, MixResponse} from '../types'

const debug = makeDebug('mix:api:intents')

/**
 * Create a new intent in a project.
 *
 * @category intents
 */
export async function createIntent(client: MixClient, params: IntentsCreateParams): Promise<MixResponse> {
  debug('createIntent()')
  const {projectId, intentName} = params
  const body = {intentName}

  return client.request({
    method: 'post',
    url: buildURL(client.getServer(), `/v4/projects/${projectId}/intents`),
    data: body,
  })
}

/**
 * Delete an intent from a project.
 *
 * @category intents
 */
export async function deleteIntent(client: MixClient, params: IntentsDeleteParams): Promise<MixResponse> {
  debug('deleteIntent()')
  const {projectId, intentName} = params

  return client.request({
    method: 'delete',
    url: buildURL(client.getServer(), `/v4/projects/${projectId}/intents/${intentName}`),
  })
}

/**
 * Retrieve the details of an intent in a project.
 *
 * @category intents
 */
export async function getIntent(client: MixClient, params: IntentsGetParams): Promise<MixResponse> {
  debug('getIntent()')
  const {intentName, projectId, ...requestParams} = params

  return client.request({
    method: 'get',
    url: buildURL(client.getServer(), `/v4/projects/${projectId}/intents/${intentName}`, requestParams),
  })
}

/**
 * Retrieve the list of available intents in a project.
 *
 * @category intents
 */
export async function listIntents(client: MixClient, params: IntentsListParams): Promise<MixResponse> {
  debug('listIntents()')
  const {projectId, ...requestParams} = params

  return client.request({
    method: 'get',
    url: buildURL(client.getServer(), `/v4/projects/${projectId}/intents`, requestParams),
  })
}

/**
 * Rename an intent in a project.
 *
 * @category intents
 */
export async function renameIntent(client: MixClient, params: IntentsRenameParams): Promise<MixResponse> {
  debug('renameIntent()')
  const {intentName, projectId, newIntentName} = params
  const body = {newIntentName}

  return client.request({
    method: 'put',
    url: buildURL(client.getServer(), `/v4/projects/${projectId}/intents/${intentName}/.rename`),
    data: body,
  })
}
