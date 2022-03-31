/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {expect, test} from '@oclif/test'

const td = require('./app-credentials-test-data')
const {applicationId, view, envGeographyName} = td.request

const endpoint = `/v4/apps/${applicationId}/credentials`
const testData = require ('../../test-data')
const serverURL = `https://${testData.server}`

describe('app-credentials:list', () => {
  test
    .env(testData.env)
    .nock(serverURL, (api) =>
      api
        .get(endpoint)
        .query({
          view,
        })
        .reply(200, td.response.json)
      )
    .stdout()
    .command([
      'app-credentials:list',
      `-M=${td.request.applicationId}`,
      '--full',
    ])
    .it("shows all app credentials data with mix application id", (ctx) => {
      expect(ctx.stdout).to.contain('Runtime Application ID (AppID): ACME-PROD')
      expect(ctx.stdout).to.contain('Environment: PRODUCTION - Geography: Production US')
      expect(ctx.stdout).to.contain('Client Name: default')
      expect(ctx.stdout).to.contain('Client ID: appID:ACME-PROD:geo:dev:clientName:default')
      expect(ctx.stdout).to.contain('OAuth Scopes: asr asr.wordset dlg log nlu nlu.wordset tts')
      expect(ctx.stdout).to.contain('Create Time: 2020-12-02T17:37:05Z')
      expect(ctx.stdout).not.to.contain('Update Time: 2020-12-02T17:37:05Z')
    })

  test
    .env(testData.env)
    .nock(serverURL, (api) =>
      api
        .get(endpoint)
        .query({
          view,
        })
        .reply(200, td.response.json)
      )
    .stdout()
    .command([
      'app-credentials:list',
       `-M=${td.request.applicationId}`,
       '--full',
       '--json'])
    .it("shows all app credentials data in json format", (ctx) => {
      const result = JSON.parse(ctx.stdout)
      expect(result).to.deep.equal(td.response.json)
    })

  test
    .env(testData.env)
    .nock(serverURL, (api) =>
      api
        .get(endpoint)
        .query({
          view,
        })
        .reply(200, td.response.multiClientsGeo)
      )
    .stdout()
    .command([
      'app-credentials:list',
      `-M=${td.request.applicationId}`,
      '--full',
    ])
    .it("shows all app credentials data with multiple clients and geographies", (ctx) => {
      expect(ctx.stdout).to.contain('Runtime Application ID (AppID): ACME-PROD')
      expect(ctx.stdout).to.contain('Environment: PRODUCTION - Geography: Production US')
      expect(ctx.stdout).to.contain('Environment: PRODUCTION - Geography: Production UK')
      expect(ctx.stdout).to.contain('Client Name: default')
      expect(ctx.stdout).to.contain('Client Name: NVP')
      expect(ctx.stdout).to.contain('Runtime Application ID (AppID): ACME-STAGE')
      expect(ctx.stdout).to.contain('Environment: PRODUCTION - Geography: Production US')
    })

  test
    .env(testData.env)
    .nock(serverURL, (api) =>
      api
        .get(endpoint)
        .query({
          view,
        })
        .reply(200, td.response.emptyClient)
      )
    .stdout()
    .command([
      'app-credentials:list',
      `-M=${td.request.applicationId}`,
      '--full',
    ])
    .it("shows error messages if no client data is present", (ctx) => {
      expect(ctx.stdout).to.contain('Runtime Application ID (AppID): ACME-PROD')
      expect(ctx.stdout).to.contain('No clients found for this runtime application')
    })
  
  test
    .env(testData.env)
    .nock(serverURL, (api) =>
      api
        .get(endpoint)
        .query({
          view,
          envGeographyName,
        })
        .reply(200, td.response.envGeo)
      )
    .stdout()
    .command([
      'app-credentials:list',
      `-M=${td.request.applicationId}`,
      `--with-geo-name=${td.request.envGeographyName}`,
      '--full',
    ])
    .it("shows app credentials data with geography parameter", (ctx) => {
      expect(ctx.stdout).to.contain('Runtime Application ID (AppID): ACME-PROD')
    })

  test
    .env(testData.env)
    .nock(serverURL, (api) =>
      api
        .get(endpoint)
        .query({
          view,
          envGeographyName,
        })
        .reply(200, td.response.emptyCredentials)
      )
    .stdout()
    .command([
      'app-credentials:list',
      `-M=${td.request.applicationId}`,
      `--with-geo-name=${td.request.envGeographyName}`,
      '--full',
    ])
    .it("shows error message for no app credentials data with geography parameter", (ctx) => {
      expect(ctx.stdout).to.contain(`No credentials found for Mix application ID ${td.request.applicationId} and geography ${td.request.envGeographyName}.`)
    })

  test
    .env(testData.env)
    .nock(serverURL, (api) =>
      api
        .get(endpoint)
        .query({
          view,
        })
        .reply(200, td.response.emptyCredentials)
      )
    .stdout()
    .command([
      'app-credentials:list',
      `-M=${td.request.applicationId}`,
      '--full',
    ])
    .it("shows error message for no app credentials data without geography parameter", (ctx) => {
      expect(ctx.stdout).to.contain(`No credentials found for Mix application ID ${td.request.applicationId}.`)
    })
})
