/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {Expand} from './shared-types'

/** @hidden */
export type IntentsGetPathParams = {
  /** Name of the intent to retrieve. */
  intentName: string,

  /** ID of the project the intent belongs to. */
  projectId: string
}

export type IntentsListPathParams = {
  /** ID of the project the intents belong to. */
  projectId: string
}

/** @hidden */
export type IntentsCreateParams = Expand<IntentsGetPathParams>
export type IntentsDeleteParams = Expand<IntentsGetPathParams>
export type IntentsGetParams = Expand<IntentsGetPathParams>
export type IntentsListParams = Expand<IntentsListPathParams>

/** @hidden */
export type IntentsParams =
  | IntentsCreateParams
  | IntentsDeleteParams
  | IntentsGetParams
  | IntentsListParams
