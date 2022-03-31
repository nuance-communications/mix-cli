/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {Expand, True} from './shared-types'

/** @hidden */
export type AppConfigsCreatePathParams = {
  /** ID of Mix application under which the configuration will be created.  */
  applicationId: string

  /**  ID of the deployment flow which will get assigned to the configuration. */
  deploymentFlowId: string

  /** Context tag name that will be given to the configuration. */
  tag: string
}

/** @hidden */
export type AppConfigsCreateSearchParams = {
  /** Build types to use for creating the configuration. */
  buildTypes?: string[]

  /** Locales to use for creating the configuration. */
  locales?: string[]

  /** Project ID to use to get the latest models that were built for this project. */
  useLatestFromProject: string

  /** When set to true, the default data hosts will be used, where applicable. */
  useProjectDefault?: boolean
}

/** @hidden */
export type AppConfigsCreateParams = Expand<AppConfigsCreateSearchParams & AppConfigsCreatePathParams>

/** @hidden */
export type AppConfigsDeletePathParams = {
  /** ID of the application configuration to delete. */
  configId: string
}

/** @hidden */
export type AppConfigsDeleteParams = Expand<AppConfigsDeletePathParams>

/** @hidden */
export type AppConfigsDeployPathParams = {
  /** ID of the application configuration to deploy. */
  configId: string
}

/** @hidden */
export type AppConfigsDeploySearchParams = {
  /**
   * IDs of envigonment-geographies the application configuration will be deployed to.
   * If not provided, the next environment-geography in the deployment flow is used.
   * */
  environmentGeographyIds?: string[]
}

/** @hidden */
export type AppConfigsDeployParams = Expand<AppConfigsDeployPathParams & AppConfigsDeploySearchParams>

/** @hidden */
export type AppConfigsExportPathParams = {
  /** ID of the application configuration to export. */
  configId: string
}

/** @hidden */
export type AppConfigsExportSearchParams = {
  /** ID of the runtime application where the application configuration is deployed. */
  appId: string
}

/** @hidden */
export type AppConfigsExportParams = Expand<AppConfigsExportPathParams & AppConfigsExportSearchParams>

/** @hidden */
export type AppConfigsGetPathParams = {
  /** ID of the application configuration to retrieve. */
  configId: string
}

/** @hidden */
export type AppConfigsGetParams = Expand<AppConfigsGetPathParams>

/** @hidden */
export type AppConfigsListPathParams = {
  /** ID of the Mix application for which to list application configurations. */
  applicationId: string
}

/** @hidden */
export type AppConfigsListSearchParams = {
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
export type AppConfigsListParams = Expand<AppConfigsListPathParams & AppConfigsListSearchParams>

/** @hidden */
export type AppConfigsUpgradePathParams = {
  /** ID of the application configuration to upgrade. */
  configId: string
}

/** @hidden */
export type AppConfigsUpgradeSearchParams = {
  /** When set to true, the default data hosts will be used, where applicable. */
  useProjectDefault?: boolean
}

/** @hidden */
export type AppConfigsUpgradeAugmentedSearchParams = {useProjectDefault?: boolean; latest: True}

/** @hidden */
export type AppConfigsUpgradeParams = Expand<AppConfigsUpgradePathParams & AppConfigsUpgradeSearchParams>

/** @hidden */
export type AppConfigsParams =
  | AppConfigsCreateParams
  | AppConfigsDeleteParams
  | AppConfigsDeployParams
  | AppConfigsExportParams
  | AppConfigsGetParams
  | AppConfigsListParams
  | AppConfigsUpgradeParams

/** @hidden */
export type AppConfigsSearchParams =
  | AppConfigsCreateSearchParams
  | AppConfigsDeploySearchParams
  | AppConfigsExportSearchParams
  | AppConfigsListSearchParams
  | AppConfigsUpgradeAugmentedSearchParams
