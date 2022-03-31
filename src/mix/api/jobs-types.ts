/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {Expand} from './shared-types'

/** @hidden */
export type JobsGetPathParams = {
  /** ID of the job to retrieve. */
  jobId: string,

  /** ID of the project the job belongs to. */
  projectId: string
}

/** @hidden */
export type JobsGetParams = Expand<JobsGetPathParams>

/** @hidden */
export type JobsListPathParams = {
  /** ID of the project for which to list jobs. */
  projectId: string
}

/** @hidden */
export type JobsListSearchParams = {
  /** The maximum number of items to be returned in the response. */
  limit?: number

  /** The offset from which (sorted) elements will get included in the response. */
  offset?: number

  /**
   * Comma-separated properties to sort by.
   * Prepend with +/- for ascending/descending.
   */
  sortBy?: string
}

/** @hidden */
export type JobsListParams = Expand<JobsListPathParams & JobsListSearchParams>

/** @hidden */
export type JobsParams = JobsGetParams | JobsListParams

/** @hidden */
export type JobsSearchParams = JobsListSearchParams
