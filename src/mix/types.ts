/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {AxiosRequestConfig, AxiosRequestHeaders} from 'axios'

import {AllowedHTTPMethod} from './api/shared-types'

import {AppConfigsParams, AppConfigsSearchParams} from './api/app-configs-types'
import {AppCredentialsParams, AppCredentialsSearchParams} from './api/app-credentials-types'
import {ApplicationsListSearchParams, ApplicationsParams} from './api/applications-types'
import {BotConfigsParams, BotConfigsSearchParams} from './api/bot-configs-types'
import {BotCredentialsParams, BotCredentialsSearchParams} from './api/bot-credentials-types'
import {BotInterfacesParams} from './api/bot-interfaces-types'
import {BotsParams, BotsSearchParams} from './api/bots-types'
import {BuildsParams, BuildsSearchParams} from './api/builds-types'
import {ChannelsParams} from './api/channels-types'
import {DataHostsParams, DataHostsSearchParams} from './api/data-hosts-types'
import {DeploymentFlowsParams, DeploymentFlowsSearchParams} from './api/deployment-flows-types'
import {EnginePacksParams} from './api/engine-packs-types'
import {EntitiesParams, EntitiesSearchParams} from './api/entities-types'
import {EnvironmentsParams, EnvironmentsSearchParams} from './api/environments-types'
import {GeographiesParams, GeographiesSearchParams} from './api/geographies-types'
import {IntentsParams} from './api/intents-types'
import {JobsParams, JobsSearchParams} from './api/jobs-types'
import {LanguageTopicsParams} from './api/language-topics-types'
import {LiteralsParams, LiteralsSearchParams} from './api/literals-types'
import {OntologyParams, OntologySearchParams} from './api/ontology-types'
import {OrganizationsParams, OrganizationsSearchParams} from './api/organizations-types'
import {ProjectsParams} from './api/projects-types'
import {SamplesParams, SamplesSearchParams} from './api/samples-types'

export * from './api/app-configs-types'
export * from './api/app-credentials-types'
export * from './api/applications-types'
export * from './api/bot-configs-types'
export * from './api/bot-credentials-types'
export * from './api/bot-interfaces-types'
export * from './api/bots-types'
export * from './api/builds-types'
export * from './api/data-hosts-types'
export * from './api/deployment-flows-types'
export * from './api/engine-packs-types'
export * from './api/entities-types'
export * from './api/environments-types'
export * from './api/geographies-types'
export * from './api/intents-types'
export * from './api/jobs-types'
export * from './api/language-topics-types'
export * from './api/literals-types'
export * from './api/ontology-types'
export * from './api/organizations-types'
export * from './api/projects-types'
export * from './api/samples-types'
export * from './api/system-types'

/** @hidden */
export type MixRequestParams =
  | AppConfigsParams
  | AppCredentialsParams
  | ApplicationsParams
  | BotConfigsParams
  | BotCredentialsParams
  | BotInterfacesParams
  | BotsParams
  | BuildsParams
  | ChannelsParams
  | DataHostsParams
  | DeploymentFlowsParams
  | EnginePacksParams
  | EntitiesParams
  | EnvironmentsParams
  | GeographiesParams
  | IntentsParams
  | JobsParams
  | LanguageTopicsParams
  | LiteralsParams
  | OntologyParams
  | OrganizationsParams
  | ProjectsParams
  | SamplesParams

/** @hidden */
export type MixRequestSearchParams =
  | AppConfigsSearchParams
  | AppCredentialsSearchParams
  | ApplicationsListSearchParams
  | BotConfigsSearchParams
  | BotCredentialsSearchParams
  | BotsSearchParams
  | BuildsSearchParams
  | DataHostsSearchParams
  | DeploymentFlowsSearchParams
  | EntitiesSearchParams
  | EnvironmentsSearchParams
  | GeographiesSearchParams
  | JobsSearchParams
  | LiteralsSearchParams
  | OntologySearchParams
  | OrganizationsSearchParams
  | SamplesSearchParams

/** @hidden */
export interface APIDependencies {
  mixClient: MixClient;
  headers: MixHeaders;
  v4Server: string;
}

// MixClient
export interface MixClientConfig {
  mixAPIServer: string;
}
export interface MixHeaders {
  /** The Authorization header */
  Authorization: string;

  /**
   * The User-Agent header
   * @defaultValue 'mix-js-client'
   * */
  'User-Agent': string;
}
export interface MixClient {
  /** Returns the fully-qualified domain name of the Mix V4 API server */
  getServer: () => string

  /** Sets the bearer token used for OAuth */
  setToken: (token: string) => void

  /** Makes a request to the Mix V4 API server and returns the response in a promise */
  request: (requestParams: RequestArgs) => Promise<MixResponse>
}

export interface MixClientOptions {
  /** Fully-qualified domain name of the Mix V4 API server */
  server: string;

  /** Agent string that will be used by the HTTP client */
  userAgent?: string
}

/** @hidden */
export type RequestArgs = {
  method: AllowedHTTPMethod
  url: URL
  data?: any
  headers?:AxiosRequestHeaders
  options?: AxiosRequestConfig
}

// MixResponse
export interface ConnectionError {
  /** The state of of the response */
  _state: 'connectionFailure'

  /** The error code */
  code: string

  /** The response error message */
  message: string
}

export interface MixResult {
  /** The state of of the response */
  _state: 'success'

  /** The response data */
  data: object
}

export interface MixError {
  /** The state of of the response */
  _state: 'mixFailure'

  /** The HTTP response code */
  statusCode: number

  /** The error code */
  code: number

  /** The error message */
  message: string

  /** The error details */
  details: object[]
}

/**
 * A MixResponse can be one of three types, depending on the outcome of the request.
 * Type MixResult is returned when the request is successful.
 * Type MixError is returned when the Mix V4 API Server fails to process the request.
 * Finally, Type ConnectionError is returned if a networking issue or other exception
 * occurs.
 */
export type MixResponse = ConnectionError | MixResult | MixError
