/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {Expand} from './shared-types'

/** @hidden */
export type BotConfigsListPathParams = {
  /** ID of the bot for which to list application configurations. */
  botId: string
}

/** @hidden */
export type BotConfigsListSearchParams = {
  /** ID of the runtime application that will be used to filter results.  */
  appId?: string,

  /** When set to true, application configurations that are overridden are excluded from the list. */
  excludeOverrides?:boolean,

  /** When set to true, returns only the application configurations that are currently deployed. */
  liveOnly?:boolean,

  /** Context tag name to filter the results. */
  tag?: string
}

/** @hidden */
export type BotConfigsListParams = Expand<BotConfigsListPathParams & BotConfigsListSearchParams>

/** @hidden */
export type BotConfigsParams =
  | BotConfigsListParams

/** @hidden */
export type BotConfigsSearchParams =
  | BotConfigsListSearchParams
