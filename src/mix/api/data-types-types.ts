/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {Expand} from './shared-types'

/** @hidden */
export type DataTypesListSearchParams = {
  /** When set to true, includes the compatible data types. */
  includeCompatibleEntityTypes?:boolean
}

/** @hidden */
export type DataTypesListParams = Expand<DataTypesListSearchParams>

/** @hidden */
export type DataTypesParams =
| DataTypesListParams

/** @hidden */
export type DataTypesSearchParams =
| DataTypesListSearchParams
