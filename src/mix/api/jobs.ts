/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import makeDebug from 'debug'

import buildURL from './utils/build-url'
import {JobsGetParams, JobsListParams} from './jobs-types'
import {MixClient, MixResponse} from '../types'

const debug = makeDebug('mix:api:jobs')

/**
 * Delete the specified job.
 *
 * @category jobs
 */
export async function deleteJob(client: MixClient, params: JobsGetParams): Promise<MixResponse> {
  debug('deleteJob()')
  const {jobId, projectId, ...requestParams} = params

  return client.request({
    method: 'delete',
    url: buildURL(client.getServer(), `/v4/projects/${projectId}/jobs/${jobId}`, requestParams),
  })
}

/**
 * Retrieve the details of a job in a project.
 *
 * @category jobs
 */
export async function getJob(client: MixClient, params: JobsGetParams): Promise<MixResponse> {
  debug('getJob()')
  const {jobId, projectId, ...requestParams} = params

  return client.request({
    method: 'get',
    url: buildURL(client.getServer(), `/v4/projects/${projectId}/jobs/${jobId}`, requestParams),
  })
}

/**
 * Retrieve the list of jobs available in a project.
 *
 * @category jobs
 */
export async function listJobs(client: MixClient, params: JobsListParams): Promise<MixResponse> {
  debug('listJobs()')
  const {projectId, ...requestParams} = params

  return client.request({
    method: 'get',
    url: buildURL(client.getServer(), `/v4/projects/${projectId}/jobs`, requestParams),
  })
}
