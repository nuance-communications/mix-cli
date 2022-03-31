/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {Expand} from './shared-types'

/** @hidden */
export type LanguageTopicsListPathParams = {
  /** ID of the organization for which to get the list of language topics. */
  orgId: string
}

/** @hidden */
export type LanguageTopicsListParams = Expand<LanguageTopicsListPathParams>

/** @hidden */
export type LanguageTopicsParams = LanguageTopicsListParams
