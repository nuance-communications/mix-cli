/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {Expand} from './shared-types'

/** Entity type */
export type Entity =
  | 'UNSPECIFIED'
  | 'BASE'
  | 'RELATIONAL'
  | 'LIST'
  | 'FREEFORM'
  | 'REGEX'
  | 'RULE_BASED'

/** @hidden */
export type EntitiesGetPathParams = {
  /** Name of the entity to retrieve. */
  entityName: string,

  /** ID of the project the intent belongs to. */
  projectId: string
}

/** @hidden */
export type EntitiesGetParams = Expand<EntitiesGetPathParams>

/** @hidden */
export type EntitiesParams =
  | EntitiesGetParams

