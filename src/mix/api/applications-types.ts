/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {Expand} from './shared-types'

/**
 * Application view to return.
 * - AV_VIEW_UNSPECIFIED: Returns application details without including application configurations
 * - AV_FULL: Returns all application details, including the list of application configurations
 * - AV_FULL_AVAILABLE_CONFIGS: Returns all application details, omitting configs that are overridden
 * - AV_FULL_LIVE_CONFIGS: Returns all application configs that are deployed
 *
 * @defaultValue: AV_VIEW_UNSPECIFIED
 */
export type ApplicationsView = 'AV_VIEW_UNSPECIFIED' | 'AV_FULL' | 'AV_FULL_AVAILABLE_CONFIGS' | 'AV_FULL_LIVE_CONFIGS'

/** @hidden */
export type ApplicationsListSearchParams = {
  /** Runtime app ID to filter the results; for example, NMDPTRIAL_alex_smith_company_com_20190919T190532. */
  appId?: string,

  /** Filter results parameter: application display name. The search is case sensitive. */
  filter?: string

  /** The maximum number of items to be returned in the response. */
  limit?: number

  /** The offset from which (sorted) elements will get included in the response. */
  offset?: number

  /** ID of the organization for which to get the list of applications. */
  orgId?: string

  /**
   * Application view to return.
   * - AV_VIEW_UNSPECIFIED: Returns application details without including application configurations
   * - AV_FULL: Returns all application details, including the list of application configurations
   * - AV_FULL_AVAILABLE_CONFIGS: Returns all application details, omitting configs that are overridden
   * - AV_FULL_LIVE_CONFIGS: Returns all application configs that are deployed
   *
   * @defaultValue: AV_VIEW_UNSPECIFIED
   */
  view?: ApplicationsView
}

/** @hidden */
export type ApplicationsListParams = Expand<ApplicationsListSearchParams>

/** @hidden */
export type ApplicationsParams = ApplicationsListParams
