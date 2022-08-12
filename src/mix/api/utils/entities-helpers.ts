/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import makeDebug from 'debug'

const debug = makeDebug.debug('mix:utils:entities-helpers')

export const buildConvertEntityBody = (params: any) => {
  debug('buildConvertEntityBody()')

  const {
    hasA,
    isA,
    newType,
    pattern,
  } = params

  const adjustedNewtype = newType.toUpperCase().replace('-', '_')

  return {
    ...(hasA !== undefined && {hasA: {entities: hasA}}),
    ...(isA !== undefined && {isA}),
    ...(newType === 'list') && {data: {}},
    newType: adjustedNewtype,
    ...(pattern !== undefined && {pattern}),
  }
}

const buildEntityPayload = (params: any) => {
  debug('buildEntityPayload()')

  const {
    anaphora,
    canonicalize,
    dataType,
    entityType,
    hasA,
    isA,
    isDynamic,
    isSensitive,
    locale,
    name,
    pattern,
  } = params

  let entityTypeKey
  entityTypeKey = entityType === 'rule-based' ? 'ruleBased' : entityType
  entityTypeKey = `${entityTypeKey}Entity`

  const adjustedAnaphora = anaphora !== undefined &&
    `ANAPHORA_${anaphora.toUpperCase().replace('-', '_')}`

  const adjustedDataType = dataType !== undefined &&
    dataType.toUpperCase().replace('-', '_')

  return {
    [entityTypeKey]: {
      ...(anaphora !== undefined && {anaphora: adjustedAnaphora}),
      ...(entityType === 'list') && {data: {}},
      ...(dataType !== undefined && {dataType: adjustedDataType}),
      ...(hasA !== undefined && {hasA: {entities: hasA}}),
      ...(isA !== undefined && {isA}),
      ...(isDynamic !== undefined && {isDynamic}),
      ...(locale !== undefined && {locale}),
      ...(name !== undefined && {name}),
      ...(pattern !== undefined && {pattern}),
      settings: {
        ...(canonicalize !== undefined && {canonicalize}),
        ...(isSensitive !== undefined && {isSensitive}),
      },
    },
  }
}

export const buildCreateEntityBody = (params: any) => {
  return buildEntityPayload(params)
}

export const buildUpdateEntityBody = (params: any) => {
  return buildEntityPayload(params)
}
