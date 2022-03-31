/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

module.exports = {
  request: {
    applicationId: 88,
    envGeographyName: 'Production US',
    view: 'ACV_FULL',
  },
  response: {
    json: {credentials: [ { id: "491", credential: { id: "236", appId: "ACME-PROD", clients: [ { id: "491", clientId: "appID:ACME-PROD:geo:dev:clientName:default", clientName: "default", oauthScopes: "asr dlg nlu tts log asr.wordset nlu.wordset", createTime: "2020-12-02T17:37:05Z", updateTime: "2020-12-02T17:37:05Z", }, ], createTime: "2020-12-02T17:37:05Z", updateTime: "2020-12-02T17:37:05Z", }, geographies: [ { id: "305", geography: { id: "11", displayName: "Production US" }, envType: "PRODUCTION", envHost: "api.nuance.com", }, ], createTime: "2020-12-02T17:40:20Z", updateTime: "2020-12-02T17:40:20Z", }, { id: "489", credential: { id: "234", appId: "ACME-DEV", clients: [ { id: "489", clientId: "appID:ACME-DEV:geo:dev:clientName:default", clientName: "default", oauthScopes: "asr dlg nlu tts log asr.wordset nlu.wordset", createTime: "2020-12-02T17:36:57Z", updateTime: "2020-12-02T17:36:57Z", }, ], createTime: "2020-12-02T17:36:57Z", updateTime: "2020-12-02T17:36:57Z", }, geographies: [ { id: "303", geography: { id: "10", displayName: "Sandbox US" }, envType: "SANDBOX", envHost: "api.nuance.com", }, ], createTime: "2020-12-02T17:40:08Z", updateTime: "2020-12-02T17:40:24Z", }, { id: "490", credential: { id: "235", appId: "ACME-STAGE", clients: [ { id: "490", clientId: "appID:ACME-STAGE:geo:dev:clientName:default", clientName: "default", oauthScopes: "asr dlg nlu tts log asr.wordset nlu.wordset", createTime: "2020-12-02T17:37:01Z", updateTime: "2020-12-02T17:37:01Z", }, ], createTime: "2020-12-02T17:37:01Z", updateTime: "2020-12-02T17:37:01Z", }, geographies: [ { id: "304", geography: { id: "11", displayName: "Production US" }, envType: "PRODUCTION", envHost: "api.nuance.com", }, ], createTime: "2020-12-02T17:40:14Z", updateTime: "2020-12-02T17:40:29Z", }, ]},

    multiClientsGeo: {credentials: [ { id: "491", credential: { id: "236", appId: "ACME-PROD", clients: [ { id: "491", clientId: "appID:ACME-PROD:geo:dev:clientName:default", clientName: "default", oauthScopes: "asr dlg nlu tts log asr.wordset nlu.wordset", createTime: "2020-12-02T17:37:05Z", updateTime: "2020-12-02T17:37:05Z", }, { id: "492", clientId: "appID:ACME-PROD:geo:dev:clientName:default", clientName: "NVP", oauthScopes: "asr.wordset nlu.wordset", createTime: "2020-12-02T17:37:05Z", updateTime: "2020-12-02T17:37:05Z", }, ], createTime: "2020-12-02T17:37:05Z", updateTime: "2020-12-02T17:37:05Z", }, geographies: [ { id: "305", geography: { id: "11", displayName: "Production US" }, envType: "PRODUCTION", envHost: "api.nuance.com", }, { id: "306", geography: { id: "12", displayName: "Production UK" }, envType: "PRODUCTION", envHost: "api.nuance.co.uk", }, ], createTime: "2020-12-02T17:40:20Z", updateTime: "2020-12-02T17:40:20Z", }, { id: "490", credential: { id: "235", appId: "ACME-STAGE", clients: [ { id: "490", clientId: "appID:ACME-STAGE:geo:dev:clientName:default", clientName: "default", oauthScopes: "asr dlg nlu tts log asr.wordset nlu.wordset", createTime: "2020-12-02T17:37:01Z", updateTime: "2020-12-02T17:37:01Z", }, ], createTime: "2020-12-02T17:37:01Z", updateTime: "2020-12-02T17:37:01Z", }, geographies: [ { id: "304", geography: { id: "11", displayName: "Production US" }, envType: "PRODUCTION", envHost: "api.nuance.com", }, ], createTime: "2020-12-02T17:40:14Z", updateTime: "2020-12-02T17:40:29Z", }, ]},

    emptyClient: {credentials: [ { id: "491", credential: { id: "236", appId: "ACME-PROD", clients: [], createTime: "2020-12-02T17:37:05Z", updateTime: "2020-12-02T17:37:05Z", }, geographies: [ { id: "305", geography: { id: "11", displayName: "Production US" }, envType: "PRODUCTION", envHost: "api.nuance.com", }, ], createTime: "2020-12-02T17:40:20Z", updateTime: "2020-12-02T17:40:20Z", }, ]},
    
    empytGeo: {credentials: [ { id: "491", credential: { id: "236", appId: "ACME-PROD", clients: [ { id: "491", clientId: "appID:ACME-PROD:geo:dev:clientName:default", clientName: "default", oauthScopes: "asr dlg nlu tts log asr.wordset nlu.wordset", createTime: "2020-12-02T17:37:05Z", updateTime: "2020-12-02T17:37:05Z", }, ], createTime: "2020-12-02T17:37:05Z", updateTime: "2020-12-02T17:37:05Z", }, geographies: [ { id: "305", geography: { id: "11", displayName: "Production US" }, envType: "PRODUCTION", envHost: "api.nuance.com", }, ], createTime: "2020-12-02T17:40:20Z", updateTime: "2020-12-02T17:40:20Z", }, ]},
    
    envGeo: {credentials: [{ id: "491", credential: { id: "236", appId: "ACME-PROD", clients: [ { id: "491", clientId: "appID:ACME-PROD:geo:dev:clientName:default", clientName: "default", oauthScopes: "asr dlg nlu tts log asr.wordset nlu.wordset", createTime: "2020-12-02T17:37:05Z", updateTime: "2020-12-02T17:37:05Z", }, ], createTime: "2020-12-02T17:37:05Z", updateTime: "2020-12-02T17:37:05Z", }, geographies: [ { id: "305", geography: { id: "11", displayName: "Production US" }, envType: "PRODUCTION", envHost: "api.nuance.com", }, ], createTime: "2020-12-02T17:40:20Z", updateTime: "2020-12-02T17:40:20Z", }]},

    emptyCredentials: { credentials: [] },
  },
};