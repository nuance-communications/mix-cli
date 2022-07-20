/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import makeDebug from 'debug'

import {buildCreateEntityBody, buildUpdateEntityBody} from './utils/entities-helpers'
import buildURL from './utils/build-url'
import {
  EntitiesConfigureParams,
  EntitiesCreateParams,
  EntitiesDeleteParams,
  EntitiesGetParams,
  EntitiesListParams,
  EntitiesRenameParams,
} from './entities-types'

import {MixClient, MixResponse} from '../types'

const debug = makeDebug('mix:api:entities')

/**
 * Configure a new entity in a project.
 *
 * @category entities
 */
export async function configureEntity(client: MixClient, params: EntitiesConfigureParams): Promise<MixResponse> {
  debug('configureEntity()')
  const {entityName, projectId, ...bodyParams} = params
  const body = buildUpdateEntityBody(bodyParams)

  debug('body: %O', body)

  return client.request({
    method: 'put',
    url: buildURL(client.getServer(), `/v4/projects/${projectId}/entities/${entityName}`),
    data: body,
  })
}

/**
 * Create a new entity in a project.
 *
 * @category entities
 */
export async function createEntity(client: MixClient, params: EntitiesCreateParams): Promise<MixResponse> {
  debug('createEntity()')
  const {projectId, ...bodyParams} = params
  const body = buildCreateEntityBody(bodyParams)

  debug('body: %O', body)

  return client.request({
    method: 'post',
    url: buildURL(client.getServer(), `/v4/projects/${projectId}/entities`),
    data: body,
  })
}

/**
 * Delete an entity from a project.
 *
 * @category entities
 */
export async function deleteEntity(client: MixClient, params: EntitiesDeleteParams): Promise<MixResponse> {
  debug('deleteEntity()')
  const {projectId, entityName} = params

  return client.request({
    method: 'delete',
    url: buildURL(client.getServer(), `/v4/projects/${projectId}/entities/${entityName}`),
  })
}

/**
 * Retrieve the details of an entity in a project.
 *
 * @category entities
 */
export async function getEntity(client: MixClient, params: EntitiesGetParams): Promise<MixResponse> {
  debug('getEntity()')
  const {entityName, projectId} = params

  return client.request({
    method: 'get',
    url: buildURL(client.getServer(), `/v4/projects/${projectId}/entities/${entityName}`),
  })
}

/**
 * Retrieve the list of available entities in a project.
 *
 * @category entities
 */
export async function listEntities(client: MixClient, params: EntitiesListParams): Promise<MixResponse> {
  debug('listEntities()')
  const {projectId, ...requestParams} = params

  return client.request({
    method: 'get',
    url: buildURL(client.getServer(), `/v4/projects/${projectId}/entities`, requestParams),
  })
}

/**
 * Rename an entity in a project.
 *
 * @category entities
 */
export async function renameEntity(client: MixClient, params: EntitiesRenameParams): Promise<MixResponse> {
  debug('renameEntity()')
  const {entityName, projectId, newEntityName} = params
  const body = {newEntityName}

  return client.request({
    method: 'put',
    url: buildURL(client.getServer(), `/v4/projects/${projectId}/entities/${entityName}/.rename`),
    data: body,
  })
}
