/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {EntitiesCreateBodyParams} from '../entities-types'
import makeDebug from 'debug'

const debug = makeDebug.debug('mix:utils:entities-helpers')

const buildFreefromEntityCreateBody = (params: EntitiesCreateBodyParams) => {
  debug('buildFreefromEntityCreateBody()')

  const {
    canonicalize,
    dataType,
    isSensitive,
    name,
  } = params

  return {
    freeformEntity: {
      name,
      settings: {
        ...(canonicalize === undefined ? {} : {canonicalize}),
        ...(isSensitive === undefined ? {} : {isSensitive}),
      },
      ...(dataType === undefined ? {} : {dataType}),
    },
  }
}

const buildListEntityCreateBody = (params: EntitiesCreateBodyParams) => {
  debug('buildListEntityCreateBody()')

  const {
    anaphora,
    canonicalize,
    dataType,
    isDynamic,
    isSensitive,
    name,
  } = params

  return {
    listEntity: {
      ...(anaphora === undefined ? {} : {anaphora}),
      ...(isDynamic === undefined ? {} : {isDynamic}),
      name,
      settings: {
        ...(canonicalize === undefined ? {} : {canonicalize}),
        ...(isSensitive === undefined ? {} : {isSensitive}),
      },
      data: {},
      ...(dataType === undefined ? {} : {dataType}),
    },
  }
}

const buildRegexEntityCreateBody = (params: EntitiesCreateBodyParams) => {
  debug('buildRegexEntityCreateBody()')

  const {
    anaphora,
    canonicalize,
    dataType,
    isSensitive,
    locale,
    name,
    pattern,
  } = params

  return {
    regexEntity: {
      ...(anaphora === undefined ? {} : {anaphora}),
      locale,
      name,
      pattern,
      settings: {
        ...(canonicalize === undefined ? {} : {canonicalize}),
        ...(isSensitive === undefined ? {} : {isSensitive}),
      },
      ...(dataType === undefined ? {} : {dataType}),
    },
  }
}

const buildRelationalEntityCreateBody = (params: EntitiesCreateBodyParams) => {
  debug('buildRelationalEntityCreateBody()')

  const {
    anaphora,
    canonicalize,
    dataType,
    hasA,
    isA,
    isSensitive,
    name,
  } = params

  return {
    relationalEntity: {
      ...(anaphora ? {anaphora} : {}),
      ...(hasA ? {hasA: {entities: hasA}} : {}),
      ...(isA ? {isA} : {}),
      name,
      settings: {
        ...(canonicalize ? {canonicalize} : {}),
        ...(isSensitive ? {isSensitive} : {}),
      },
      ...(dataType ? {dataType} : {}),
    },
  }
}

const buildRuleBasedEntityCreateBody = (params: EntitiesCreateBodyParams) => {
  debug('buildRuleBasedEntityCreateBody()')

  const {
    anaphora,
    canonicalize,
    dataType,
    isSensitive,
    name,
  } = params

  return {
    ruleBasedEntity: {
      ...(anaphora ? {anaphora} : {}),
      name,
      settings: {
        ...(canonicalize ? {canonicalize} : {}),
        ...(isSensitive ? {isSensitive} : {}),
      },
      ...(dataType ? {dataType} : {}),
    },
  }
}

// Build request body for the backend call to create project
export function buildEntitiesCreateBody(params: EntitiesCreateBodyParams): any {
  debug('buildEntitiesCreateBody()')

  let body = {}
  const {entityType} = params

  switch (entityType) {
    case 'FREEFORM':
      body = buildFreefromEntityCreateBody(params)
      break

    case 'LIST':
      body = buildListEntityCreateBody(params)
      break

    case 'REGEX':
      body = buildRegexEntityCreateBody(params)
      break

    case 'RELATIONAL':
      body = buildRelationalEntityCreateBody(params)
      break

    case 'RULE_BASED':
      body = buildRuleBasedEntityCreateBody(params)
      break

    default:
      body = {}
  }

  debug('entities:create request body: %s', JSON.stringify(body))

  return body
}
