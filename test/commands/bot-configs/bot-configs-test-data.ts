/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

module.exports = {
  request: {
    botId: "1386",
  },
  response: {
    json: {
      configs: [
        {
          id: "1386",
          tag: "TestBotV3",
          deployments: [
            {
              id: "339",
              status: "DEPLOYED",
              envGeographyDeployments: [
                {
                  id: "1159",
                  envGeography: {
                  id: "338",
                  geography: {
                      id: "1",
                      displayName: "Sandbox US"
                    },
                    envType: "SANDBOX",
                    envHost: "api.nuance.com"
                  },
                  status: "DEPLOYED",
                  deploymentResult: "success",
                  isOverridden: false
                }
              ]
            },
            {
              id: "340",
              status: "DEPLOYED",
              envGeographyDeployments: [
                {
                  id: "1160",
                  envGeography: {
                    id: "339",
                    geography: {
                      id: "1",
                      displayName: "Sandbox US"
                    },
                    envType: "SANDBOX",
                    envHost: "api.nuance.com"
                  },
                  status: "DEPLOYED",
                  deploymentResult: "success",
                  isOverridden: false
                }
              ]
            },
            {
              id: "341",
              status: "PENDING_REQUEST",
              envGeographyDeployments: []
            },
            {
              id: "342",
              status: "UNDEPLOYED",
              envGeographyDeployments: []
            }
          ],
          parentId: "null",
          hasInterface: true,
          createTime: "2021-01-28T01:19:59.415Z"
        }
      ]
    },
  },
}