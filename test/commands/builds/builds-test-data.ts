/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

module.exports = {
  flags: {
    buildType: 'asr',
    unknownProjectID: 999999,
  },
  request: {
      apiVersion: 'v4',
      sort: 'BuildId',
      end: 25,
      type: 'ASR',
      filepath: './myBuild.zip',
      buildLabel: 'ASR_1922_1',
      buildId: '8f3e480e-f8e2-4274-8daf-ae8a304f11e4',
      locale: 'en_US',
      orderBy: 'REVERSE_INSERTION_ORDER',
      projectId: 1922,
      start: 2,
      unknownProjectID: 999999,
  },
  response: { projectId: "1922", builds: [
    { projectId: "1922", buildLabel: "NLU_1922_6", buildId: "3345", buildType: "NLU", buildVersion: "6", status: "BST_COMPLETED", languageTopic: "gen", datapack: { displayName: "en-US", version: "4.7.0", }, notes: "string", createTime: "2021-09-06T07:24:49Z", dynamicEntities: [ { name: "ROOM", structureType: "custom_words", }, ], modelType: "FAST", dataSources: [ "nuance_custom_data", ], },
    { projectId: "1922", buildLabel: "NLU_1922_1", buildId: "3302", buildType: "NLU", buildVersion: "1", status: "BST_COMPLETED", languageTopic: "gen", datapack: { displayName: "en-US", version: "4.7.0", }, notes: "", createTime: "2021-08-29T17:58:00Z", modelType: "FAST", dataSources: [ "nuance_custom_data", ], },
    { projectId: "1922", buildLabel: "NLU_1922_2", buildId: "3303", buildType: "NLU", buildVersion: "2", status: "BST_COMPLETED", languageTopic: "gen", datapack: { displayName: "en-US", version: "4.7.0", }, notes: "", createTime: "2021-08-30T07:05:43Z", dynamicEntities: [ { name: "ROOM", structureType: "custom_words", }, ], modelType: "FAST", dataSources: [ "nuance_custom_data", ], },
    { projectId: "1922", buildLabel: "NLU_1922_5", buildId: "3330", buildType: "NLU", buildVersion: "5", status: "BST_COMPLETED", languageTopic: "gen", datapack: { displayName: "en-US", version: "4.7.0", }, notes: "string", createTime: "2021-09-01T03:29:15Z", dynamicEntities: [ { name: "ROOM", structureType: "custom_words", }, ], modelType: "FAST", dataSources: [ "nuance_custom_data", ], },
    { projectId: "1922", buildLabel: "NLU_1922_3", buildId: "3305", buildType: "NLU", buildVersion: "3", status: "BST_COMPLETED", languageTopic: "gen", datapack: { displayName: "en-US", version: "4.7.0", }, notes: "string", createTime: "2021-08-30T11:17:19Z", dynamicEntities: [ { name: "ROOM", structureType: "custom_words", }, ], modelType: "FAST", dataSources: [ "nuance_custom_data", ], },
    { projectId: "1922", buildLabel: "NLU_1922_4", buildId: "3306", buildType: "NLU", buildVersion: "4", status: "BST_FAILED", errors: { errors: [ { message: "'NLU' jobs still pending for project \"4d63cda0-518e-4275-ae0d-bc7184f21fad", code: "-1", }, ], }, languageTopic: "gen", notes: "string", createTime: "2021-08-30T11:19:23Z", modelType: "FAST", }, ],
    totalSize: 6, count: 6, limit: 10, offset: 0, },

  noBuildsResponse: { "projectId": "1922", "builds": [], "totalSize": 0, "count": 0, "limit": 25, "offset": 0 },

  moreBuildsResponse: { projectId: "1922", builds: [
    { projectId: "1922", buildLabel: "ASR_1922_5", buildId: "3266", buildType: "ASR", buildVersion: "5", status: "BST_COMPLETED", languageTopic: "gen", datapack: { displayName: "en-US", version: "4.4.0", }, notes: "Testing1", createTime: "2021-09-01T03:29:26Z", modelType: "FAST", dataSources: [ "nuance_custom_data", ], },
    { projectId: "1922", buildLabel: "ASR_1922_2", buildId: "3235", buildType: "ASR", buildVersion: "2", status: "BST_COMPLETED", languageTopic: "gen", datapack: { displayName: "en-US", version: "4.5.0", }, notes: "Testing2", createTime: "2021-08-30T07:05:46Z", modelType: "FAST", dataSources: [ "nuance_custom_data", ], },
    { projectId: "1922", buildLabel: "ASR_1922_3", buildId: "3237", buildType: "ASR", buildVersion: "3", status: "BST_COMPLETED", languageTopic: "gen", datapack: { displayName: "en-US", version: "4.6.0", }, notes: "Testing3", createTime: "2021-08-30T11:17:31Z", modelType: "FAST", dataSources: [ "nuance_custom_data", ], },
    { projectId: "1922", buildLabel: "ASR_1922_4", buildId: "3238", buildType: "ASR", buildVersion: "4", status: "BST_COMPLETED", languageTopic: "gen", datapack: { displayName: "en-US", version: "4.7.0", }, notes: "Testing4", createTime: "2021-08-30T11:19:27Z", modelType: "FAST", dataSources: [ "nuance_custom_data", ], }, ],
    totalSize: 6, count: 4, limit: 10, offset: 2, },

  limitBuildsResponse: { projectId: "1922", builds: [ { projectId: "1922", buildLabel: "ASR_1922_1", buildId: "3234", buildType: "ASR", buildVersion: "1", status: "BST_COMPLETED", languageTopic: "gen", datapack: { displayName: "en-US", version: "4.7.0", }, notes: "", createTime: "2021-08-29T17:58:01Z", dataSources: [ "nuance_custom_data", ], }, { projectId: "1922", buildLabel: "ASR_1922_2", buildId: "3235", buildType: "ASR", buildVersion: "2", status: "BST_COMPLETED", languageTopic: "gen", datapack: { displayName: "en-US", version: "4.7.0", }, notes: "", createTime: "2021-08-30T07:05:46Z", dataSources: [ "nuance_custom_data", ], }, ], totalSize: 6, count: 2, limit: 2, offset: 0, },
  latestBuildsResponse: { "models": { "asr": { "builds": [ { "locale": "en-US", "buildVersion": "13", "buildLabel": "ASR_1922_13" } ], "projectId": "1922" }, "nlu": { "builds": [ { "locale": "en-US", "buildVersion": "16", "buildLabel": "NLU_1922_16" } ], "projectId": "1922" }, "dialog": { "projectId": "1922", "buildVersion": "8", "buildLabel": "DIALOG_1922_8" } } },
  latestMultipleLocalesResponse: { "models": { "asr": { "builds": [ { "locale": "en-US", "buildVersion": "13", "buildLabel": "ASR_1922_13" },{ "locale": "en-GB", "buildVersion": "13", "buildLabel": "ASR_1922_13" } ], "projectId": "1922" }, "nlu": { "builds": [ { "locale": "en-US", "buildVersion": "16", "buildLabel": "NLU_1922_16" },{ "locale": "en-GB", "buildVersion": "16", "buildLabel": "NLU_1922_16" } ], "projectId": "1922" }, "dialog": { "projectId": "1922", "buildVersion": "8", "buildLabel": "DIALOG_1922_8" } } },
  noLatestBuildResponse: { "models": {} },
  projectNotFoundResponse: {code: 5, message: 'Project with id=999999 does not exist.', details: []},
  projectData: {'name': 'Test Project'},
  getResponse: { id: "8f3e480e-f8e2-4274-8daf-ae8a304f11e4", type: "BUILD_MODELS", projectId: "1922", status: "PARTIALLY_COMPLETED", report: { nluBuildReports: { reports: [ { errors: { errors: [ { message: "[\"'NLU' jobs still pending for project \\\"4d63cda0-518e-4275-ae0d-bc7184f21fad\\\"\"]", code: "-1", }, ], }, locale: "en-US", createTime: "2021-08-30T11:19:27Z", status: "FAILED", }, ], }, asrBuildReports: { reports: [ { locale: "en-US", version: "4", buildLabel: "ASR_1922_4", createTime: "2021-08-30T11:19:31Z", status: "RUNNING", }, { locale: "en-US", createTime: "2021-08-30T11:20:15Z", status: "COMPLETED", }, ], }, }, createTime: "2021-08-30T11:19:23Z", updateTime: "2021-08-30T11:20:15Z", duration: "52s", },
  deleteResponse: { code: 0, message: 'Job deleted.', details: [] },
  exportResponse:{ data: {} },
  jsonOutput: [ { "projectId": "1922", "buildLabel": "ASR_1922_6", "buildId": "3280", "buildType": "ASR", "buildVersion": "6", "status": "BST_COMPLETED", "languageTopic": "gen", "datapack": { "displayName": "en-US", "version": "4.7.0" }, "notes": "Testing", "createTime": "2021-09-06T07:25:01Z", "dataSources": [ "nuance_custom_data" ] }, , { "projectId": "1922", "buildLabel": "ASR_1922_5", "buildId": "3266", "buildType": "ASR", "buildVersion": "5", "status": "BST_COMPLETED", "languageTopic": "gen", "datapack": { "displayName": "en-US", "version": "4.7.0" }, "notes": "Testing", "createTime": "2021-09-01T03:29:26Z", "dataSources": [ "nuance_custom_data" ] }, { "projectId": "1922", "buildLabel": "ASR_1922_2", "buildId": "3235", "buildType": "ASR", "buildVersion": "2", "status": "BST_COMPLETED", "languageTopic": "gen", "datapack": { "displayName": "en-US", "version": "4.7.0" }, "notes": "", "createTime": "2021-08-30T07:05:46Z", "dataSources": [ "nuance_custom_data" ] }, { "projectId": "1922", "buildLabel": "ASR_1922_3", "buildId": "3237", "buildType": "ASR", "buildVersion": "3", "status": "BST_COMPLETED", "languageTopic": "gen", "datapack": { "displayName": "en-US", "version": "4.7.0" }, "notes": "Testing", "createTime": "2021-08-30T11:17:31Z", "dataSources": [ "nuance_custom_data" ] }, { "projectId": "1922", "buildLabel": "ASR_1922_4", "buildId": "3238", "buildType": "ASR", "buildVersion": "4", "status": "BST_COMPLETED", "languageTopic": "gen", "datapack": { "displayName": "en-US", "version": "4.7.0" }, "notes": "Testing", "createTime": "2021-08-30T11:19:27Z", "dataSources": [ "nuance_custom_data" ] } ],
  getBuildResponse: { projectId: "1922", buildLabel: "ASR_1922_1", buildId: "1617", buildType: "ASR", buildVersion: "1", status: "BST_COMPLETED", languageTopic: "gen", datapack: { displayName: "en-US", version: "4.5.0", }, notes: "This is a great build", createTime: "2020-08-18T20:03:04Z", dataSources: [ "nuance_custom_data", ], },
  csvOutput: // Do not indent the following multiline string literal
`BuildId,BuildLabel,Version,BuildType,Status,LanguageTopic,DataPack,ModelType,CreateTime,DataSources,Notes
3234,ASR_1922_1,1,ASR,BST_COMPLETED,gen,en-US@4.7.0,n/a,2021-08-29T17:58:01Z,nuance_custom_data,
3235,ASR_1922_2,2,ASR,BST_COMPLETED,gen,en-US@4.7.0,n/a,2021-08-30T07:05:46Z,nuance_custom_data,`,
  csvOutputLatest:
`BuildType,Locale,BuildLabel,BuildVersion
asr,en-US,ASR_1922_13,13
asr,en-GB,ASR_1922_13,13
nlu,en-US,NLU_1922_16,16
nlu,en-GB,NLU_1922_16,16
dialog,n/a,DIALOG_1922_8,8`
}