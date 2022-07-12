/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {Expand} from './shared-types'

export type IntentsGetPathParams = {
  /** Name of the intent to retrieve. */
  intentName: string,

  /** ID of the project the intent belongs to. */
  projectId: string
}

/** @hidden */
export type IntentsRenameBodyParams = {
  /** New intent name */
  newIntentName: string
}

/** @hidden */
export type IntentsGetParams = Expand<IntentsGetPathParams>
export type IntentsRenameParams = Expand<IntentsGetPathParams & IntentsRenameBodyParams>

/** @hidden */
export type IntentsParams =
  | IntentsGetParams
  | IntentsRenameParams
