/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {Expand} from './shared-types'

/** @hidden */
export type GeographiesListSearchParams = {
  /** The maximum number of items to be returned in the response. */
  limit?: number;

  /** The offset from which (sorted) elements will get included in the response. */
  offset?: number;

  /**
   * Comma-separated properties to sort by.
   * Prepend with +/- for ascending/descending.
   */
  sortBy?: string;
}

/** @hidden */
export type GeographiesListParams = Expand<GeographiesListSearchParams>

/** @hidden */
export type GeographiesParams = GeographiesListParams

/** @hidden */
export type GeographiesSearchParams = GeographiesListSearchParams
