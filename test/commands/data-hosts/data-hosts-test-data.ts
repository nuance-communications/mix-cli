/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

export default {
  dataHostsListResponse: {
    dataHosts: [ 
      { 
        id: '742',
        alias: 'test',
        environmentId: '87',
        environmentGeographyId: '1',
        value: 'https://www.testing.com'
      },
      { 
        id: '743',
        alias: 'test2',
        environmentId: '87',
        environmentGeographyId: '1',
        value: 'http://data.com'
      }
    ]
  },
  dataHostsLatestResponse: {
    dataHosts: [
      { 
        id: '743',
        alias: 'test2',
        environmentId: '87',
        environmentGeographyId: '1',
        value: 'http://data.com'
      }
    ]
  },
  noDataHostsReponse: {
    dataHosts: [],
  },
}
