/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

const mixAPIServer = 'mix-api.example.com'

module.exports = {
  headers: {
    Authorization: 'Bearer longTokenString',
    'User-Agent': 'mix.cli user agent'
  },
  server: mixAPIServer,
  version: {
    'mixEnvironment': 'test',
    'mixVersion': '3.6.5.41.9485fe96c.797489',
    'apiVersion': '0.9.15-30.b5f59d4.797490',
    mixAPIServer,
  }
}
