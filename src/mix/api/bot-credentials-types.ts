/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {Expand} from './shared-types'

/**
 * New Command
 */

/** bot-credentials:list Command */

/**
 * Bot credentials view to return.
 * - BCV_VIEW_UNSPECIFIED: Returns credentials details without including clients
 * - BCV_FULL: Returns all credentials details, including list of clients
 *
 * @defaultValue: BCV_VIEW_UNSPECIFIED
 */
/** View to be used for the response. */
export type BotCredentialsView = 'BCV_VIEW_UNSPECIFIED' | 'BCV_FULL'

/** @hidden */
type BotCredentialsListPathParams = {
  /** ID of the bot for which to get the list of credentials. */
  botId: string
}

/** @hidden */
export type BotCredentialsListSearchParams = {
  /** Name of the environment geography; for example, US. */
  envGeographyName?: string,

  /**
   * Bot credentials view to return.
   * - BCV_VIEW_UNSPECIFIED: Returns credentials details without including clients
   * - BCV_FULL: Returns all credentials details, including list of clients
   *
   * @defaultValue: BCV_VIEW_UNSPECIFIED
   */
  /** View to be used for the response. */
  view?: BotCredentialsView
}

/** @hidden */
export type BotCredsListParams = Expand<BotCredentialsListPathParams & BotCredentialsListSearchParams>

/** @hidden */
export type BotCredentialsListParams = Expand<BotCredsListParams>

/** @hidden */
export type BotCredentialsParams =
  | BotCredentialsListParams

/** @hidden */
export type BotCredentialsSearchParams =
  | BotCredentialsListSearchParams
