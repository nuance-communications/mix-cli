/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {Expand} from './shared-types'

/** @hidden */
export type DeploymentFlowsListPathParams = {
  /** ID of the organization for which to get the list of deployment flows. */
  orgId: string
}

/** @hidden */
export type DeploymentFlowsListSearchParams = {
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
export type DeploymentFlowsListParams = Expand<DeploymentFlowsListPathParams & DeploymentFlowsListSearchParams>

/** @hidden */
export type DeploymentFlowsParams = DeploymentFlowsListParams

/** @hidden */
export type DeploymentFlowsSearchParams = DeploymentFlowsListSearchParams
