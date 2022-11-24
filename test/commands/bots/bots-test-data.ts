/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

export default {
  botsListResponse: {
    bots: [
      {
        id: "456",
        applicationName: "Mix Sample App",
        configs: [],
        createTime: "2022-09-12T16:14:53Z"
      }
    ],
    totalSize: 1
  },
  fullBotsDetailsResponse: {
    bots: [
      {
        id: "456",
        applicationName: "Mix Sample App",
        configs: [
          {
            id: "514",
            tag: "A3_C1",
            deployments: [
              {
                id: "49",
                status: "DEPLOYED",
                envGeographyDeployments: [
                  {
                    id: "40",
                    envGeography: {
                      id: "4912",
                      geography: {
                        id: "1",
                        displayName: "Azure US"
                      },
                      envType: "SANDBOX",
                      envHost: "api.com",
                      envName: "Sandbox"
                    },
                    status: "DEPLOYED",
                    deploymentResult: "success",
                    isOverridden: false,
                    dataHosts: [],
                    approvalRequired: false
                  }
                ]
              }
            ],
            parentId: "",
            hasInterface: true,
            deploymentFlowId: 6582,
            createTime: "2022-10-17T17:30:06Z"
          }
        ],
        createTime: "2022-09-12T16:14:53Z"
      }
    ],
    totalSize: 1
  },
  noBotsReponse: {
    bots: [],
  },
}