/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

export default {
  botConfigsListResponse: {
    configs: [
      {
        id: '456',
        tag: 'A3_C1',
        deployments: [
          {
            id: '339',
            status: 'DEPLOYED',
            envGeographyDeployments: [
              {
                id: '119',
                envGeography: {
                id: '33',
                geography: {
                  id: '1',
                  displayName: 'Azure US'
                },
                envType: 'SANDBOX',
                envHost: 'api.com'
              },
              status: 'DEPLOYED',
              deploymentResult: 'success',
              isOverridden: false
              }
            ]
          },
          {
            id: '340',
            status: 'DEPLOYED',
            envGeographyDeployments: [
            {
              id: '160',
              envGeography: {
                id: '39',
                geography: {
                  id: '1',
                  displayName: 'Extra Geo'
                },
                envType: 'SANDBOX',
                envHost: 'api.com'
              },
              status: 'DEPLOYED',
              deploymentResult: 'success',
              isOverridden: false
            }
            ]
          },
          {
            id: '341',
            status: 'PENDING_REQUEST',
            envGeographyDeployments: []
          },
          {
            id: '342',
            status: 'UNDEPLOYED',
            envGeographyDeployments: []
          }
          ],
        parentId: '92',
        hasInterface: true,
        createTime: 'now'
      }
    ]
  },
  noBotConfigsResponse: {
    configs: [],
  },
}
