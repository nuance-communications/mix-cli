/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {Expand} from './shared-types'

/** View to be used for the response. */
export type AppCredentialsView = 'ACV_VIEW_UNSPECIFIED' | 'ACV_FULL'

/** @hidden */
type AppCredentialsListPathParams = {
  /** ID of the Mix application for which to get the list of credentials. */
  applicationId: string
}

/** @hidden */
export type AppCredentialsListSearchParams = {
  /** Name of the environment geography; for example, US. */
  envGeographyName?: string,

  /**
   * Application credentials view to return.
   * - ACV_VIEW_UNSPECIFIED: Returns credentials details without including clients
   * - ACV_FULL: Returns all credentials details, including list of clients
   *
   * @defaultValue: ACV_VIEW_UNSPECIFIED
   */
  view?: AppCredentialsView
}

/** @hidden */
export type AppCredentialsListParams = Expand<AppCredentialsListPathParams & AppCredentialsListSearchParams>

/** @hidden */
export type AppCredentialsParams = Expand<AppCredentialsListParams>

/** @hidden */
export type AppCredentialsSearchParams = AppCredentialsListSearchParams
