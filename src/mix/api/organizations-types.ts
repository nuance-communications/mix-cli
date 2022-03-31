/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {Expand} from './shared-types'

/** Organization type */
export type Organization = 'TYPE_UNSPECIFIED' | 'PERSONAL' | 'STANDARD'

/** View to be used for the response. */
export type OrganizationsListView = 'FULL' | 'VIEW_UNSPECIFIED'

/** @hidden */
export type OrganizationsListSearchParams = {
  /**
   * When set to true, shows all existing organizations. This parameter requires
   * specific permissions; while it is visible to all users, it will be enabled
   * only for users with these permissions.
   */
  showAll: boolean

  type: Organization
  view: OrganizationsListView

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
export type OrganizationsListParams = Expand<OrganizationsListSearchParams>

/** @hidden */
export type OrganizationsParams = OrganizationsListParams

/** @hidden */
export type OrganizationsSearchParams = OrganizationsListSearchParams
