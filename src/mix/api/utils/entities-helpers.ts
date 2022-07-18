/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import makeDebug from 'debug'

const debug = makeDebug.debug('mix:utils:entities-helpers')

export const buildCreateOrUpdateEntityBody = (params: any) => {
  debug('buildCreateOrUpdateEntityBody()')

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

  return {
    [entityTypeKey]: {
      ...(anaphora !== undefined && {anaphora}),
      ...(entityType === 'list') && {data: {}},
      ...(dataType !== undefined && {dataType}),
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
