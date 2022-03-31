/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

module.exports = {
    request: {
        buildLabel: 'DIALOG_1922_1',
        projectId: 1922,
        version: 1,
        unknownProjectID: 999999,
        dialogFlowId: 88,
        'mix-app': 32,
    },
    response: {
        json: {dataHosts: [ { "id": "742", "alias": "test", "environmentId": "87", "environmentGeographyId": "1", "value": "https://www.testing.com" }, { "id": "743", "alias": "test2", "environmentId": "87", "environmentGeographyId": "1", "value": "http://data.com" } ]},
        empty: {dataHosts: []},
        filter: {dataHosts: [{ "id": "743", "alias": "test2", "environmentId": "87", "environmentGeographyId": "1", "value": "http://data.com" }]},
    },
    csvOutput:
`DataHostId,Alias,EnvironmentId,EnvironmentGeographyId,Value
742,test,87,1,https://www.testing.com
743,test2,87,1,http://data.com
`,
}