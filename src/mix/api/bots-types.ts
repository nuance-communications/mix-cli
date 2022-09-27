/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {Expand} from './shared-types'


/** bots:credential Cammand Implementation */

/**
 * Bots view to return.
 * - BV_VIEW_UNSPECIFIED: Returns bot details without including application configurations
 * - BV_FULL: Returns all bot details, including the list of application configurations
 * - BV_FULL_AVAILABLE_CONFIGS: Returns all bot details, omitting configs that are overridden
 * - BV_FULL_LIVE_CONFIGS: Returns all bot configs that are deployed
 *
 * @defaultValue: BV_VIEW_UNSPECIFIED
 */
export type BotsView = 'BV_VIEW_UNSPECIFIED' | 'BV_FULL' | 'BV_FULL_AVAILABLE_CONFIGS' | 'BV_FULL_LIVE_CONFIGS'

/** @hidden */
export type BotsListPathParams = {
  /** ID of the organization for which to get the list of bots. */
  orgId: string
}

/** @hidden */
export type BotsListSearchParams = {

/**
 * Bots view to return.
 * - BV_VIEW_UNSPECIFIED: Returns bot details without including application configurations
 * - BV_FULL: Returns all bot details, including the list of application configurations
 * - BV_FULL_AVAILABLE_CONFIGS: Returns all bot details, omitting configs that are overridden
 * - BV_FULL_LIVE_CONFIGS: Returns all bot configs that are deployed
 *
 * @defaultValue: BV_VIEW_UNSPECIFIED
 */

  view?: BotsView
}


/** @hidden */
export type BotsListParams = Expand<BotsListPathParams & BotsListSearchParams>

/**
 * New Command
 */

/** bots:credential Cammand Implementation */

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
  /** ID of the Mix bot for which to get the list of credentials. */
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
  view?: BotCredentialsView
}

/** @hidden */
export type BotCredentialsListParams = Expand<BotCredentialsListPathParams & BotCredentialsListSearchParams>

/** @hidden */
export type BotCredentialsParams = Expand<BotCredentialsListParams>

/** @hidden */
export type BotCredentialsSearchParams = BotCredentialsListSearchParams


/** @hidden */
export type BotsParams =
  | BotsListParams
  | BotCredentialsParams

/** @hidden */
export type BotsSearchParams =
  | BotsListSearchParams
  | BotCredentialsSearchParams