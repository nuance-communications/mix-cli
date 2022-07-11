/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {Expand} from './shared-types'

/** @hidden */
export type IntentsListPathParams = {
  /** ID of the project the intents belong to. */
  projectId: string
}

/** @hidden */
export type IntentsListParams = Expand<IntentsListPathParams>

/** @hidden */
export type IntentsParams =
| IntentsListParams
