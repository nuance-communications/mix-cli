/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {Expand} from './shared-types'

type DataType =
  | 'ALPHANUM'
  | 'AMOUNT'
  | 'BOOLEAN'
  | 'DATE'
  | 'DIGITS'
  | 'DISTANCE'
  | 'NOT_SET'
  | 'NO_FORMAT'
  | 'NUMBER'
  | 'TEMPERATURE'
  | 'TIME'
  | 'YES_NO'

/** Entity type */
export type Entity =
  | 'BASE'
  | 'FREEFORM'
  | 'LIST'
  | 'REGEX'
  | 'RELATIONAL'
  | 'RULE_BASED'
  | 'UNSPECIFIED'

/** @hidden */
export type EntitiesCreateBodyParams = {
  /** New entity name */
  name: string,

  /** Name of the entity that this entity has an `isA` relationship with */
  isA?: string,

  /** Names of the entities that this entity has a `hasA` relationship with */
  hasA?: string[],

  /** Specifies the referrer for this entityi */
  anaphora?: string

  /** Data type for the entity */
  dataType?: DataType

  /** Data type for the entity */
  entityType?: Entity

  /** When set to true, indicates that the entity is dynamic */
  isDynamic?: boolean

  /** When set to true, indicates that the entity is sensitive */
  isSensitive?: boolean

  /** When set to true, indicates that the entity is canonicalized */
  canonicalize?: boolean

  /** Locale for the pattern */
  locale?: string

  /** Regular expression pattern for this entity */
  pattern?: string
}

/** @hidden */
export type EntitiesGetPathParams = {
  /** Name of the entity to retrieve. */
  entityName: string,

  /** ID of the project the intent belongs to. */
  projectId: string
}

/** @hidden */
export type EntitiesListPathParams = {
  /** ID of the project the intents belong to. */
  projectId: string
}

/** @hidden */
export type EntitiesListSearchParams = {
  /** Entity type to filter the results */
  type: string
}

/** @hidden */
export type EntitiesRenameBodyParams = {
  /** New entity name */
  newEntityName: string
}

/** @hidden */
export type EntitiesCreateParams = Expand<EntitiesListPathParams & EntitiesCreateBodyParams>
export type EntitiesDeleteParams = Expand<EntitiesGetPathParams>
export type EntitiesGetParams = Expand<EntitiesGetPathParams>
export type EntitiesListParams = Expand<EntitiesListPathParams & EntitiesListSearchParams>
export type EntitiesRenameParams = Expand<EntitiesGetPathParams & EntitiesRenameBodyParams>

/** @hidden */
export type EntitiesParams =
  | EntitiesCreateParams
  | EntitiesDeleteParams
  | EntitiesGetParams
  | EntitiesListParams
  | EntitiesRenameParams

/** @hidden */
export type EntitiesSearchParams = EntitiesListSearchParams
