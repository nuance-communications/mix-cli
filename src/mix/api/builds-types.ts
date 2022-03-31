/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {Expand} from './shared-types'

/** @hidden */
export type BuildsGetPathParams = {
  /** Build display name. */
  buildLabel: string
}

/** @hidden */
export type BuildsGetParams = Expand<BuildsGetPathParams>

/** @hidden */
export type BuildsListPathParams = {
  /** ID of the project. */
  projectId: string
}

/** @hidden */
export type BuildsListSearchParams = {
  /** The maximum number of items to be returned in the response. */
  limit?: number

  /** The offset from which (sorted) elements will get included in the response. */
  offset?: number

  /**
   * Comma-separated properties to sort by.
   * Prepend with +/- for ascending/descending.
   */
  sortBy?: string

  /**
   * Type of build.
   *
   * - NLU: NLU build
   * - ASR: ASR build
   * - DIALOG: Dialog build
   */
  type: string
}

/** @hidden */
export type BuildsListParams = Expand<BuildsListPathParams & BuildsListSearchParams>

/** @hidden */
export type BuildsLatestParams = Expand<BuildsListPathParams>

/** @hidden */
export type BuildsParams = BuildsListParams | BuildsGetParams

/** @hidden */
export type BuildsSearchParams = BuildsListSearchParams
