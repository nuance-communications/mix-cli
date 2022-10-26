/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import makeDebug from 'debug'

import {buildProjectsBuildBody, buildProjectsCreateBody} from './utils/projects-helpers'
import {createForm} from './utils/create-form'
import buildURL from './utils/build-url'
import {MixClient, MixResponse} from '../types'
import {
  ProjectsBuildParams,
  ProjectsConfigureParams,
  ProjectsCreateParams,
  ProjectsGetParams,
  ProjectsListParams,
  ProjectsRenameParams,
  ProjectsReplaceParams,
  ProjectsLockParams,
  ProjectsUnlockParams,
  ProjectsLockGetParams,
  ProjectsLockListParams} from './projects-types'

const debug = makeDebug('mix:api:projects')

/**
 * Start ASR, NLU, and/or dialog builds for a project.
 *
 * @category projects
 */
export async function buildProject(client: MixClient, params: ProjectsBuildParams): Promise<MixResponse> {
  debug('buildProject()')
  const {projectId, ...bodyParams} = params
  const body = buildProjectsBuildBody(bodyParams)

  return client.request({
    method: 'post',
    url: buildURL(client.getServer(), `/v4/projects/${projectId}/.build`),
    data: body,
  })
}

/**
 * Update the Nuance data pack version used by a project for a locale.
 *
 * @category projects
 */
export async function configureProject(client: MixClient, params: ProjectsConfigureParams): Promise<MixResponse> {
  debug('configureProject()')
  const {locale, projectId, version} = params

  return client.request({
    method: 'put',
    url: buildURL(client.getServer(), `/v4/projects/${projectId}/.datapack`),
    data: {locale, version},
  })
}

/**
 * Create a new project in an organization.
 *
 * Nuance’s Child Data Policy is related to online services that are subject to
 * applicable child data privacy laws, such as, but not limited to, the
 * Children’s Online Privacy Protection Act (COPPA) and Article 8 of GDPR.
 * Nuance’s Child Data Policy prohibits providing hosted services to websites or
 * online services that are primarily directed towards children under the
 * age of 16.
 *
 * When you create a project, you are required to acknowledge whether or not the
 * builds for this project will be used in an application that is deployed in a
 * Nuance hosted service in connection with an online site, service, application
 * or product that is primarily directed to children under 16.
 * This acknowledgement must be completed for any projects that are intended for
 * use in the Nuance SaaS cloud.
 *
 * To acknowledge such a project, set the isChildDataCompliant parameter to YES
 * and provide a description of the project in projectDescription.
 *
 * @category projects
 */
export async function createProject(client: MixClient, params: ProjectsCreateParams): Promise<MixResponse> {
  debug('createProject()')
  const {orgId, ...bodyParams} = params
  const body = buildProjectsCreateBody(bodyParams)

  return client.request({
    method: 'post',
    url: buildURL(client.getServer(), `/v4/organizations/${orgId}/projects`),
    data: body,
  })
}

/**
 * Delete a project.
 *
 * @category projects
 */
export async function deleteProject(client: MixClient, params: ProjectsGetParams): Promise<MixResponse> {
  debug('deleteProject()')
  const {projectId} = params

  return client.request({
    method: 'delete',
    url: buildURL(client.getServer(), `/v4/projects/${projectId}`),
  })
}

/**
 * Export the project package to a .zip file. Note that the grammar,
 * transformation, and pronunciation files are restricted to Nuance Professional
 * Services users and not available to all users. As such, the project package
 * exported by regular users will not include these files. Regular users may end
 * up with an incomplete project after calling this endpoint.
 *
 * @category projects
 */
export async function exportProject(client: MixClient, params: ProjectsGetParams): Promise<MixResponse> {
  debug('exportProject()')
  const {projectId} = params

  return client.request({
    method: 'get',
    url: buildURL(client.getServer(), `/v4/projects/${projectId}/.export`),
    options: {responseType: 'stream'},
  })
}

/**
 * Export the project metadata to a .json file.
 *
 * @category projects
 */
export async function exportProjectMetadata(client: MixClient, params: ProjectsGetParams): Promise<MixResponse> {
  debug('exportProjectMetadata()')
  const {projectId} = params

  return client.request({
    method: 'get',
    url: buildURL(client.getServer(), `/v4/projects/${projectId}/metadata/.export`),
    options: {responseType: 'stream'},
  })
}

/**
 * Retrieve the details of a project.
 *
 * @category projects
 */
export async function getProject(client: MixClient, params: ProjectsGetParams): Promise<MixResponse> {
  debug('getProject()')
  const {projectId} = params

  return client.request({
    method: 'get',
    url: buildURL(client.getServer(), `/v4/projects/${projectId}`),
  })
}

/**
 * Retrieve details about a project lock.
 *
 * @category locks
 */
export async function getProjectLock(client: MixClient, params: ProjectsLockGetParams): Promise<MixResponse> {
  debug('getProjectLock()')
  const {projectId} = params

  return client.request({
    method: 'get',
    url: buildURL(client.getServer(), `/v4/projects/${projectId}/.lock`),
  })
}

/**
 * Retrieve the list of projects available in an organization.
 *
 * @category projects
 */
export async function listProjects(client: MixClient, params: ProjectsListParams): Promise<MixResponse> {
  debug('listProjects()')
  const {orgId} = params

  return client.request({
    method: 'get',
    url: buildURL(client.getServer(), `/v4/organizations/${orgId}/projects`),
  })
}

/**
 * Retrieve list of projects lock.
 *
 * @category locks
 */
export async function listProjectLock(client: MixClient, requestParams: ProjectsLockListParams): Promise<MixResponse> {
  debug('listProjectLock()')

  return client.request({
    method: 'get',
    url: buildURL(client.getServer(), '/v4/projects/.locks', requestParams),
  })
}

/**
 * Lock a project.
 *
 * @category projects
 */
export async function lockProject(client: MixClient, params: ProjectsLockParams): Promise<MixResponse> {
  debug('lockProject()')
  const {projectId, notes} = params
  const body = {notes}

  return client.request({
    method: 'put',
    url: buildURL(client.getServer(), `/v4/projects/${projectId}/.lock`),
    data: body,
  })
}

/**
 * Unlock a project.
 *
 * @category projects
 */
export async function unlockProject(client: MixClient, params: ProjectsUnlockParams): Promise<MixResponse> {
  debug('unlockProject()')
  const {projectId} = params

  return client.request({
    method: 'put',
    url: buildURL(client.getServer(), `/v4/projects/${projectId}/.unlock`),
  })
}

/**
 * Rename a channel in a project.
 *
 * @category projects
 */
export async function renameProject(client: MixClient, params: ProjectsRenameParams): Promise<MixResponse> {
  debug('renameProject()')
  const {displayName, projectId} = params
  const body = {displayName}

  return client.request({
    method: 'put',
    url: buildURL(client.getServer(), `/v4/projects/${projectId}/.rename`),
    data: body,
  })
}

/**
 * Replace the project content with the .zip file provided in the content
 * parameter.
 * !!! IMPORTANT !!! This endpoint may permanently delete data.
 * When replacing an existing project, Nuance recommends that you back up
 * the existing project by first exporting it. Note that the grammar,
 * transformation, and pronunciation files are restricted to Nuance
 * Professional Services users and not available to all users. As such,
 * regular users are not allowed to replace grammar, transformation,
 * and pronunciation files, so they may end up with an incomplete project
 * after calling this endpoint
 *
 * @category projects
 */
export async function replaceProject(client: MixClient, params: ProjectsReplaceParams): Promise<MixResponse> {
  debug('replaceProject()')
  const {projectId, ...bodyParams} = params
  const {filePath} = bodyParams
  const form = createForm(filePath)

  return client.request({
    method: 'post',
    url: buildURL(client.getServer(), `/v4/projects/${projectId}/.replace`),
    data: form,
    headers: form.getHeaders(),
  })
}
