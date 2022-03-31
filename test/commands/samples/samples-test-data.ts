/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

module.exports = {
  export: {
    flags: {
      project: 1922,
      'intent-name': 'ORDER_DRINK',
      locale: 'en-US',
    },
    request: {
      params: {
        locales: 'en-US',
      },
    },
    response: {},
  },
  append: {
    flags: {
      confirm: 'ORDER_DRINK',
      filepath: './samples.trsx',
      'intent-name': 'ORDER_DRINK',
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
  replace: {
    flags: {
      confirm: 'ORDER_DRINK',
      filepath: './samples.trsx',
      'intent-name': 'ORDER_DRINK',
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
}
