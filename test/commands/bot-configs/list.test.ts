/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {expect, test} from '@oclif/test'

const td = require('./bot-configs-test-data')

const testEnvData = require('../../test-data')
const serverURL = `https://${testEnvData.server}`

describe('bot-configs:list command', () => {

  describe('bot-configs:list command with valid botId', () => {
    const botId = '456'
    const endpoint = `/v4/bots/${botId}/configs`
  
    test
    .env(testEnvData.env)
    .nock(serverURL, (api) =>
      api
        .get(endpoint)
        .query({
          liveOnly: false,
          excludeOverrides: false,
        })
        .reply(200, td.response.json)
    )
    .stdout()
    .command(["bot-configs:list", "-B", botId])
    .it("list application configurations for a bot", (ctx) => {
      const lines = ctx.stdout.split('\n').map(ln => ln.trim())
      const headers = lines[0].split(/\s+/)
      const firstRow = lines[2].split(/\s+/)
      expect(headers).to.deep.equal(['ConfigId', 'ContextTag', 'ParentId',  'HasInterface', 'CreateTime'])
      expect(firstRow).to.deep.equal(['456', 'A3_C1', '92', 'true', 'now'])
    })
  
    test
      .env(testEnvData.env)
      .nock(serverURL, (api) =>
        api
          .get(endpoint)
          .query({
            liveOnly: false,
            excludeOverrides: false,
          })
          .reply(200, td.response.json)
      )
      .stdout()
      .command(["bot-configs:list", "-B", botId, "--json"])
      .it("shows all application configuration data appropriately in JSON view", (ctx) => {
        const result = JSON.parse(ctx.stdout)
        expect(result).to.deep.equal(td.response.json)
      })
  
    test
      .env(testEnvData.env)
      .nock(serverURL, (api) =>
        api
          .get(endpoint)
          .query({
            liveOnly: false,
            excludeOverrides: false,
          })
          .reply(200, td.response.json)
      )
      .stdout()
      .stderr()
      .command(["bot-configs:list", "-B", botId, "--csv"])
      .it("reformats and hides data appropriately in tabular mode", (ctx) => {
        const [headers, ...results] = ctx.stdout.trim().split('\n')
        expect(headers.split(',')).to.deep.equal(['ConfigId', 'ContextTag', 'ParentId',  'HasInterface', 'CreateTime'])
        expect(results[0].split(',')).to.deep.equal(['456', 'A3_C1', '92', 'true', 'now'])
      })
  }),

  describe('bot-configs:list command with missing flags', () => {

      test
      .env(testEnvData.env)
      .stderr()
      .command(["bot-configs:list"])
      .catch(ctx => {
        expect(ctx.message).to.contain('Missing required flag')
      })
      .it('errors out when no parameters supplied')
  }),

  describe('bot-configs:list command with empty data', () => {

      const botId = '457'
      const endpoint = `/v4/bots/${botId}/configs`
  
      test
      .env(testEnvData.env)
      .nock(serverURL, (api) =>
        api
          .get(endpoint)
          .query({
            liveOnly: false,
            excludeOverrides: false,
          })
          .reply(200, td.response.emptyBotConfigs)
      )
      .stdout()
      .command(["bot-configs:list", "-B", botId])
      .it("shows error message for no application configuration data for a bot", (ctx) => {
        expect(ctx.stdout).to.contain('No configurations')
      })
  }),
  
  describe('bot-configs:list command with invalid value', () => {
      
      const botId = '1'
      const endpoint = `/v4/bots/${botId}/configs`
  
      test
      .env(testEnvData.env)
      .nock(serverURL, (api) =>
        api
          .get(endpoint)
          .query({
            liveOnly: false,
            excludeOverrides: false,
          })
          .reply(400, td.response.invalidBot)
      )
      .command(["bot-configs:list", "-B", botId])
      .exit(1)
      .it("exits with status 1 when value is invalid")
  })  
})