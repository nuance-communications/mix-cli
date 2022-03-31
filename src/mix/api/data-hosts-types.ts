/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {Expand} from './shared-types'

/** @hidden */
export type DataHostsListPathParams = {
  /** Dialog build display name for which to get the list of data hosts. */
  buildLabel: string
}

/** @hidden */
export type DataHostsListSearchParams = {
  /** ID of the Mix application for which to get the list of data hosts. */
  applicationId: string,

  /** ID of the deployment flow for which to return data hosts. */
  deploymentFlowId?: string
}

/** @hidden */
export type DataHostsListParams = Expand<DataHostsListPathParams & DataHostsListSearchParams>

/** @hidden */
export type DataHostsParams = DataHostsListParams

/** @hidden */
export type DataHostsSearchParams = DataHostsListSearchParams
