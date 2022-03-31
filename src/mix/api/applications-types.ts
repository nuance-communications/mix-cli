/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {Expand} from './shared-types'

/**
 * Application credentials view to return.
 * - ACV_VIEW_UNSPECIFIED: Returns credentials details without including clients
 * - ACV_FULL: Returns all credentials details, including list of clients
 *
 * @defaultValue: ACV_VIEW_UNSPECIFIED
 */
export type ApplicationsView = 'AV_VIEW_UNSPECIFIED' | 'AV_FULL' | 'AV_FULL_AVAILABLE_CONFIGS'

/** @hidden */
export type ApplicationsListPathParams = {
  /** ID of the organization for which to get the list of applications. */
  orgId: string
}

/** @hidden */
export type ApplicationsListSearchParams = {
  /** Runtime app ID to filter the results; for example, NMDPTRIAL_alex_smith_company_com_20190919T190532. */
  appId?: string,

  /**
   * Application view to return.
   * - ACV_VIEW_UNSPECIFIED: Returns credentials details without including clients
   * - ACV_FULL: Returns all credentials details, including list of clients
   *
   * @defaultValue: ACV_VIEW_UNSPECIFIED
   */
  view?: ApplicationsView
}

/** @hidden */
export type ApplicationsListParams = Expand<ApplicationsListPathParams & ApplicationsListSearchParams>

/** @hidden */
export type ApplicationsParams = ApplicationsListParams
