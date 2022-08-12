/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {Expand} from './shared-types'

export const AnaphoraDefault = 'not-set'
export const Anaphoras = {
  [AnaphoraDefault]: 'ANAPHORA_NOT_SET',
  'ref-moment': 'ANAPHORA_REF_MOMENT',
  'ref-person': 'ANAPHONRA_REF_PERSON',
  'ref-place': 'ANAPHORA_REF_PLACE',
  'ref-thing': 'ANAPHORA_REF_THING',
}

export type Anaphora = typeof Anaphoras[keyof typeof Anaphoras]

export const DataTypeDefault = 'not-set'
export const DataTypes = {
  alphanum: 'ALPHANUM',
  amount: 'AMOUNT',
  boolean: 'BOOLEAN',
  date: 'DATE',
  digits: 'DIGITS',
  distance: 'DISTANCE',
  'no-format': 'NO_FORMAT',
  [DataTypeDefault]: 'NOT_SET',
  number: 'NUMBER',
  temperature: 'TEMPERATURE',
  time: 'TIME',
  'yes-no': 'YES_NO',
}

export type DataType = typeof DataTypes[keyof typeof DataTypes]

/** Entity type */
export const Entities = {
  base: 'BASE',
  freeform: 'FREEFORM',
  list: 'LIST',
  regex: 'REGEX',
  relational: 'RELATIONAL',
  'rule-based': 'RULE_BASED',
}

export type Entity = typeof Entities[keyof typeof Entities]

/** @hidden */
export type EntitiesConfigureBodyParams = {
  /** Name of the entity that this entity has an `isA` relationship with */
  isA?: string,

  /** Names of the entities that this entity has a `hasA` relationship with */
  hasA?: string[],

  /** Specifies the referrer for this entity */
  anaphora?: Anaphora

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
export type EntitiesConvertBodyParams = {
  /** Name of the entity that this entity has an `isA` relationship with */
  isA?: string,

  /** Names of the entities that this entity has a `hasA` relationship with */
  hasA?: string[],

  /** Data type for the entity */
  newType?: Entity

  /** Regular expression pattern for this entity */
  pattern?: string
}

/** @hidden */
export type EntitiesCreateBodyParams = EntitiesConfigureBodyParams & {
  /** New entity name */
  name: string,
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
export type EntitiesConfigureParams = Expand<EntitiesGetPathParams & EntitiesConfigureBodyParams>
export type EntitiesConvertParams = Expand<EntitiesGetPathParams & EntitiesConvertBodyParams>
export type EntitiesCreateParams = Expand<EntitiesListPathParams & EntitiesCreateBodyParams>
export type EntitiesDeleteParams = Expand<EntitiesGetPathParams>
export type EntitiesGetParams = Expand<EntitiesGetPathParams>
export type EntitiesListParams = Expand<EntitiesListPathParams & EntitiesListSearchParams>
export type EntitiesRenameParams = Expand<EntitiesGetPathParams & EntitiesRenameBodyParams>

/** @hidden */
export type EntitiesParams =
  | EntitiesConfigureParams
  | EntitiesConvertParams
  | EntitiesCreateParams
  | EntitiesDeleteParams
  | EntitiesGetParams
  | EntitiesListParams
  | EntitiesRenameParams

/** @hidden */
export type EntitiesSearchParams = EntitiesListSearchParams
