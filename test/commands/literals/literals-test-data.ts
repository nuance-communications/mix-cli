/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

module.exports = {
  append: {
    flags: {
      confirm: 'DrinkSize',
      'entity-name': 'DrinkSize',
      filepath: './literals.trsx',
      locale: 'en-US',
      project: 1922,
      replace: false,
    },
    request: {
      params: {
        locales: 'en-US',
      },
    },
    response: {
      data: {
        id: 'long-random-job-id',
      },
    },
  },
  export: {
    flags: {
      'entity-name': 'DrinkSize',
      filepath: './out.zip',
      locale: 'en-US',
      project: 1922,
    },
    request: {
    },
    response: {
      data: {
      },
    },
  },
  replace: {
    flags: {
      confirm: 'DrinkSize',
      'entity-name': 'DrinkSize',
      filepath: './literals.trsx',
      locale: 'en-US',
      project: 1922,
      replace: true,
    },
    request: {
      params: {
        locales: 'en-US',
      },
    },
    response: {
      data: {
        id: 'long-random-job-id',
      },
    },
  },
  request: {
    'entity-name': 'CoffeeSize',
    EntityWithNoLiterals: 'entityWithNoLiterals',
    locale: 'en_US',
    offset: 0,
    order: 'ASC',
    projectId: 1922,
    size: 50,
    sort: 'LITERAL',
    unknownProjectId: 999999
  },
}