/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {expect, test} from '@oclif/test'

const td = require('./bot-credentials-test-data')

const testEnvData = require('../../test-data')
const serverURL = `https://${testEnvData.server}`

describe('bot-credentials:list command', () => {

  describe('bot-credentials:list command with valid botId', () => {

    const botId = '456'
    const endpoint = `/v4/bots/${botId}/credentials`
  
    test
    .env(testEnvData.env)
    .nock(serverURL, (api) =>
      api
        .get(endpoint)
        .query({
          view: "BCV_VIEW_UNSPECIFIED",
        })
        .reply(200, td.response.json)
    )
    .stdout()
    .command(["bot-credentials:list", "-B", botId])
    .it("list bot credentials", (ctx) => {
      const lines = ctx.stdout.split('\n').map(ln => ln.trim())
      const headers = lines[0].split(/\s+/)
      const [appId, environment, ..._geographies] = lines[2].split(/\s+/)
      const geographies = _geographies.join(' ').split(',')
      expect(headers).to.deep.equal('Runtime Bot ID (BotID) Environment Geography'.split(/\s+/))
      expect(appId).to.equal('app_123')
      expect(environment).to.equal('SANDBOX')
      expect(geographies).to.contain('Azure US')
    })
  
    test
      .env(testEnvData.env)
      .nock(serverURL, (api) =>
        api
          .get(endpoint)
          .query({
            view: "BCV_VIEW_UNSPECIFIED",
          })
          .reply(200, td.response.json)
      )
      .stdout()
      .command(["bot-credentials:list", "-B", botId, "--json"])
      .it("shows all bot credentials appropriately in JSON view", (ctx) => {
        const result = JSON.parse(ctx.stdout)
        expect(result).to.deep.equal(td.response.json)
      })
  
    test
      .env(testEnvData.env)
      .nock(serverURL, (api) =>
        api
          .get(endpoint)
          .query({
            view: "BCV_FULL",
          })
          .reply(200, td.response.fullBotCredentialsJson)
      )
      .stdout()
      .stderr()
      .command(["bot-credentials:list", "-B", botId, "--full"])
      .it("shows all bot credentials along with client details", (ctx) => {
        expect(ctx.stdout).to.contain('app_123')
        expect(ctx.stdout).to.contain('client_123')
      })

      const geoName = "Azure US"
      test
      .env(testEnvData.env)
      .nock(serverURL, (api) =>
        api
          .get(endpoint)
          .query({
            view: "BCV_VIEW_UNSPECIFIED",
            envGeographyName: geoName,
          })
          .reply(200, td.response.json)
      )
      .stdout()
      .stderr()
      .command(["bot-credentials:list", "-B", botId, "--with-geo-name", geoName])
      .it("show bot credentials for given geo name", (ctx) => {
        expect(ctx.stdout).to.contain('app_123')
        expect(ctx.stdout).to.contain(geoName)
      })
  }),

  describe('bot-credentials:list command with missing flags', () => {

      test
      .env(testEnvData.env)
      .stderr()
      .command(["bot-credentials:list"])
      .catch(ctx => {
        expect(ctx.message).to.contain('Missing required flag')
      })
      .it('errors out when no parameters supplied')
  }),

  describe('bot-credentials:list command with empty data', () => {

      const botId = '457'
      const endpoint = `/v4/bots/${botId}/credentials`
      const geoName = "Azure US"
  
      test
      .env(testEnvData.env)
      .nock(serverURL, (api) =>
        api
          .get(endpoint)
          .query({
            view: "BCV_VIEW_UNSPECIFIED",
          })
          .reply(200, td.response.emptyBotCredentials)
      )
      .stdout()
      .command(["bot-credentials:list", "-B", botId])
      .it("shows error message for no credentials for a bot", (ctx) => {
        expect(ctx.stdout).to.contain('No credentials')
      })

      test
      .env(testEnvData.env)
      .nock(serverURL, (api) =>
        api
          .get(endpoint)
          .query({
            envGeographyName: geoName,
            view: "BCV_VIEW_UNSPECIFIED",
          })
          .reply(200, td.response.emptyBotCredentials)
      )
      .stdout()
      .command(["bot-credentials:list", "-B", botId,"--with-geo-name",geoName])
      .it("shows error message for no credentials for a bot", (ctx) => {
        expect(ctx.stdout).to.contain('No credentials')
      })
  }),
  
  describe('bot-configs:list command with invalid value', () => {
      
      const botId = '1'
      const endpoint = `/v4/bots/${botId}/credentials`
  
      test
      .env(testEnvData.env)
      .nock(serverURL, (api) =>
        api
          .get(endpoint)
          .query({
            view: "BCV_VIEW_UNSPECIFIED",
          })
          .reply(400, td.response.invalidBot)
      )
      .command(["bot-credentials:list", "-B", botId])
      .exit(1)
      .it("exits with status 1 when value is invalid")
  })  
})