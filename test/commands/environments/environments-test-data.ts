/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

module.exports = {
  request: {
    params: {
      orgId: 1,
      limit: 25,
      offset: 1,
    },
  },
  response: {
    json: {
      environments: [
        {
          id: "132",
          displayName: "Sandbox",
          geographies: [
            {
              id: "128",
              geography: {id: "1", displayName: "Azure US"},
              envType: "SANDBOX",
              envHost: "api.nuance.com",
            },
            {
                id: "129",
                geography: {id: "9", displayName: "Extra Geo"},
                envType: "SANDBOX",
                envHost: "api.nuance.com",
              },
          ],
        },
        {
          id: "138",
          displayName: "QA Env",
          geographies: [
            {
              id: "137",
              geography: {id: "2", displayName: "Azure Runtime_Canada"},
              envType: "SANDBOX",
              envHost: "api.nuance.com",
            },
          ],
        },
      ],   
      totalSize: 1,
      count: 1,
      limit: 25,
      offset: 0
    },
  },
}
