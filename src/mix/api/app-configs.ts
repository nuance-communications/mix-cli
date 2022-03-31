/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import makeDebug from 'debug'

import {
  AppConfigsCreateParams,
  AppConfigsDeleteParams,
  AppConfigsDeployParams,
  AppConfigsExportParams,
  AppConfigsGetParams,
  AppConfigsListParams,
  AppConfigsUpgradeParams,
} from './app-configs-types'

import buildURL from './utils/build-url'
import {MixClient, MixResponse} from '../types'

const debug = makeDebug('mix:api:app-configs')

/**
 * Create a new application configuration.
 * @category app-configs
 */
export async function createAppConfig(client: MixClient, params: AppConfigsCreateParams): Promise<MixResponse> {
  debug('createAppConfig()')
  const {applicationId, deploymentFlowId, tag, ...searchParams} = params
  const body = {
    dataHosts: [],
    deploymentFlowId: `${deploymentFlowId}`,
    tag: `${tag}`,
    builds: {},
  }

  return client.request({
    method: 'post',
    url: buildURL(client.getServer(), `/v4/apps/${applicationId}/app-configs`, searchParams),
    data: body,
  })
}

/**
 * Delete an application configurations.
 * @category app-configs
 */
export async function deleteAppConfig(client: MixClient, params: AppConfigsDeleteParams): Promise<MixResponse> {
  debug('deleteAppConfig()')
  const {configId, ...searchParams} = params

  return client.request({
    method: 'delete',
    url: buildURL(client.getServer(), `/v4/app-configs/${configId}`, searchParams),
  })
}

/**
 * Deploy an application configuration .
 * @category app-configs
 */
export async function deployAppConfig(client: MixClient, params: AppConfigsDeployParams): Promise<MixResponse> {
  debug('deployAppConfig()')
  const {configId, ...searchParams} = params
  const body = {}

  return client.request({
    method: 'put',
    url: buildURL(client.getServer(), `/v4/app-configs/${configId}/.deploy`, searchParams),
    data: body,
  })
}

/**
 * Download the contents of an application configuration that is currently deployed in an environment.
 * @category app-configs
 */
export async function exportAppConfig(client: MixClient, params: AppConfigsExportParams): Promise<MixResponse> {
  debug('exportappconfig()')
  const {configId, ...searchParams} = params

  return client.request({
    method: 'get',
    url: buildURL(client.getServer(), `/v4/app-configs/${configId}/.download`, searchParams),
    options: {responseType: 'stream'},
  })
}

/**
 * Retrieve an application configuration.
 * @category app-configs
 */
export async function getAppConfig(client: MixClient, params: AppConfigsGetParams): Promise<MixResponse> {
  debug('getAppConfig()')
  const {configId} = params

  return client.request({
    method: 'get',
    url: buildURL(client.getServer(), `/v4/app-configs/${configId}`),
  })
}

/**
 * Retrieve the list of application configurations available in the Mix application specified.
 * @category app-configs
 */
export async function listAppConfigs(client: MixClient, params: AppConfigsListParams): Promise<MixResponse> {
  debug('listAppConfigs()')
  const {applicationId, ...searchParams} = params

  return client.request({
    method: 'get',
    url: buildURL(client.getServer(), `/v4/apps/${applicationId}/app-configs`, searchParams),
  })
}

/**
 * Undeploy an application configuration.
 * @category app-configs
 */
export async function undeployAppConfig(client: MixClient, params: AppConfigsDeployParams): Promise<MixResponse> {
  debug('undeployAppConfig()')
  const {configId, ...searchParams} = params
  const body = {}

  return client.request({
    method: 'put',
    url: buildURL(client.getServer(), `/v4/app-configs/${configId}/.undeploy`, searchParams),
    data: body,
  })
}

/**
 * Override an existing application configuration using the latest build versions.
 * @category app-configs
 */
export async function ugpradeAppConfig(client: MixClient, params: AppConfigsUpgradeParams): Promise<MixResponse> {
  debug('ugpradeAppConfig()')
  const {configId, ...searchParams} = params
  const augmentedParams = {
    ...searchParams,
    latest: true as const,
  }

  const body = {
    dataHosts: [],
    builds: {},
  }

  return client.request({
    method: 'post',
    url: buildURL(client.getServer(), `/v4/app-configs/${configId}/.override`, augmentedParams),
    data: body,
  })
}
