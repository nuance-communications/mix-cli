/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

export default {
  botCredentialsListResponse: {
    credentials: [
      {
        id: "456",
        credential: {
          id: "203",
          appId: "app_123",
          clients: [],
          createTime: "now",
          updateTime: "later"
        },
        geographies: [
          {
            id: "412",
            geography: {
              id: "1",
              displayName: "Azure US"
            },
            envType: "SANDBOX",
            envHost: "api.com",
            envName: ""
          }
        ],
        createTime: "now",
        updateTime: "later"
      }
    ]
  },
  fullBotCredentialsListResponse: {
    credentials: [
      {
        id: "456",
        credential: {
          id: "203",
          appId: "app_123",
          clients: [
            {
              id: "67",
              clientId: "client_123",
              clientName: "default",
              oauthScopes: "asr dlg nlu tts",
              createTime: "2022-09-12T16:14:53Z",
              updateTime: "2022-09-22T19:26:21Z"
            }
          ],
          createTime: "now",
          updateTime: "later"
        },
        geographies: [
          {
            id: "412",
            geography: {
              id: "1",
              displayName: "Azure US"
            },
            envType: "SANDBOX",
            envHost: "api.com",
            envName: ""
          }
        ],
        createTime: "now",
        updateTime: "later"
      }
    ]
  },
  noBotCredentialsResponse: {
    credentials: [],
  },
}
