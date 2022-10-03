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
 * bot-interfaces:export
 */
/** @hidden */
export type BotInterfacesExportPathParams = {
  /** ID of the bot for which to get the configuration interface. */
  botId: string,

  /** ID of the application configuration for which to get the interface. */
  configId: string
}

/** @hidden */
export type BotInterfacesExportParams = Expand<BotInterfacesExportPathParams>

/** @hidden */
export type BotInterfacesParams =
  | BotInterfacesExportParams
