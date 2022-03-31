/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

module.exports = {
  request: {
    apiVersion: 'v4',
    sort: 'LITERAL',
    end: 25,
    intention: 'ORDER_DRINK',
    jobId: '8f3e480e-f8e2-4274-8daf-ae8a304f11e4',
    locale: 'en-US',
    orderBy: 'REVERSE_INSERTION_ORDER',
    projectId: 1922,
    start: 0,
    unknownProjectId: '999999',
    unknownJobId: '00000000-0000-0000-0000-000000000000',
  },
  response: { jobs: [ { id: "8f3e480e-f8e2-4274-8daf-ae8a304f11e4", type: "BUILD_MODELS", projectId: "1922", status: "PARTIALLY_COMPLETED", createTime: "2021-08-30T11:19:23Z", updateTime: "2021-08-30T11:20:15Z", duration: "52s", }, { id: "f0e0f601-cae7-41f3-8516-ec9be79a8fc1", type: "BUILD_MODELS", projectId: "1922", status: "COMPLETED", createTime: "2021-08-30T11:17:19Z", updateTime: "2021-08-30T11:25:45Z", duration: "506s", }, ], totalSize: 2, count: 2, limit: 10, offset: 0, },
  noJobsResponse: { jobs: [ ], totalSize: 0, count: 0, limit: 10, offset: 0, },
  moreJobsResponse: { jobs: [ { id: "8f3e480e-f8e2-4274-8daf-ae8a304f11e4", type: "BUILD_MODELS", projectId: "1922", status: "PARTIALLY_COMPLETED", createTime: "2021-08-30T11:19:23Z", updateTime: "2021-08-30T11:20:15Z", duration: "52s", }, { id: "f0e0f601-cae7-41f3-8516-ec9be79a8fc1", type: "BUILD_MODELS", projectId: "1922", status: "COMPLETED", createTime: "2021-08-30T11:17:19Z", updateTime: "2021-08-30T11:25:45Z", duration: "506s", }, ], totalSize: 5, count: 2, limit: 10, offset: 0, },
  projectData: {'name': 'Test Project'},
  getResponse: { id: "8f3e480e-f8e2-4274-8daf-ae8a304f11e4", type: "BUILD_MODELS", projectId: "1922", status: "PARTIALLY_COMPLETED", report: { nluBuildReports: { reports: [ { errors: { errors: [ { message: "[\"'NLU' jobs still pending for project \\\"4d63cda0-518e-4275-ae0d-bc7184f21fad\\\"\", \"at JobHelper\"]", code: "-1", }, ], }, locale: "en-US", createTime: "2021-08-30T11:19:27Z", status: "FAILED", }, ], }, asrBuildReports: { reports: [ { locale: "en-US", version: "4", buildLabel: "ASR_1922_4", createTime: "2021-08-30T11:19:31Z", status: "RUNNING", }, { locale: "en-US", createTime: "2021-08-30T11:20:15Z", status: "COMPLETED", }, ], }, }, createTime: "2021-08-30T11:19:23Z", updateTime: "2021-08-30T11:20:15Z", duration: "52s", },
  deleteResponse: { code: 0, message: 'Job deleted.', details: [] },
  jsonOutput: {
    jobs: [
      {
        "id": "8f3e480e-f8e2-4274-8daf-ae8a304f11e4",
        "type": "BUILD_MODELS",
        "projectId": "1922",
        "status": "PARTIALLY_COMPLETED",
        "createTime": "2021-08-30T11:19:23Z",
        "updateTime": "2021-08-30T11:20:15Z",
        "duration": "52s"
      },
      {
        "id": "f0e0f601-cae7-41f3-8516-ec9be79a8fc1",
        "type": "BUILD_MODELS",
        "projectId": "1922",
        "status": "COMPLETED",
        "createTime": "2021-08-30T11:17:19Z",
        "updateTime": "2021-08-30T11:25:45Z",
        "duration": "506s"
      }
    ],
    count: 2,
    limit: 10,
    offset: 0,
    totalSize: 2,
  },
  csvOutput: // Do not indent the following multiline string literal
`JobId,CreateTime,Status
8f3e480e-f8e2-4274-8daf-ae8a304f11e4,2021-08-30T11:19:23Z,PARTIALLY_COMPLETED
f0e0f601-cae7-41f3-8516-ec9be79a8fc1,2021-08-30T11:17:19Z,COMPLETED
`
}