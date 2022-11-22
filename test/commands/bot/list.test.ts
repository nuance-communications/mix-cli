/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {expect, test} from '@oclif/test'
import { debug } from 'console'

const td = require('./bots-test-data')

const testEnvData = require('../../test-data')
const serverURL = `https://${testEnvData.server}`

describe('bots:list command', () => {

  describe('bots:list command with valid organization Id', () => {

    const orgId = '24'
    const endpoint = `/v4/organizations/${orgId}/bots`
  
    test
    .env(testEnvData.env)
    .nock(serverURL, (api) =>
      api
        .get(endpoint)
        .query({
          view: "BV_VIEW_UNSPECIFIED",
        })
        .reply(200, td.response.json)
    )
    .stdout()
    .command(["bots:list", "-O", orgId])
    .it("list bots for organization", (ctx) => {
      const lines = ctx.stdout.split('\n').map(ln => ln.trim())
      const headers = lines[0].split(/\s+/)
      const firstRow = lines[2].split(/\s+/)
      expect(headers).to.deep.equal(['BotId', 'Name'])
      expect(firstRow).to.deep.equal('456 Mix Sample App'.split(/\s+/))
    })
  
    test
      .env(testEnvData.env)
      .nock(serverURL, (api) =>
        api
          .get(endpoint)
          .query({
            view: "BV_VIEW_UNSPECIFIED",
          })
          .reply(200, td.response.json)
      )
      .stdout()
      .command(["bots:list", "-O", orgId, "--json"])
      .it("shows all bots data appropriately in JSON view", (ctx) => {
        const result = JSON.parse(ctx.stdout)
        expect(result).to.deep.equal(td.response.json)
      })
  
    test
      .env(testEnvData.env)
      .nock(serverURL, (api) =>
        api
          .get(endpoint)
          .query({
            view: "BV_VIEW_UNSPECIFIED",
          })
          .reply(200, td.response.json)
      )
      .stdout()
      .command(["bots:list", "-O", orgId, "--csv"])
      .it("reformats and hides data appropriately in tabular mode", (ctx) => {
        const [headers, ...results] = ctx.stdout.trim().split('\n')
        expect(headers.split(',')).to.deep.equal(['BotId', 'Name'])
        expect(results[0].split(',')).to.deep.equal(['456',  'Mix Sample App'])
      })

    test
      .env(testEnvData.env)
      .nock(serverURL, (api) =>
        api
          .get(endpoint)
          .query({
            view: "BV_FULL",
          })
          .reply(200, td.response.fullBotsDetails)
      )
      .stdout()
      .stderr()
      .command(["bots:list", "-O", orgId, "--full"])
      .it("shows all bot details, including the list of application configurations", (ctx) => {
        const lines = ctx.stdout.split('\n').map(ln => ln.trim())
        const headers = lines[0].split(/\s+/)
        const firstRow = lines[2].split(/\s+/)
        expect(headers).to.deep.equal(['BotId', 'Name', 'BotConfigs', 'CreateTime'])
        expect(firstRow).to.deep.equal('456 Mix Sample App 514 2022-09-12T16:14:53Z'.split(/\s+/))
      })

      test
      .env(testEnvData.env)
      .nock(serverURL, (api) =>
        api
          .get(endpoint)
          .query({
            view: "BV_FULL_AVAILABLE_CONFIGS",
          })
          .reply(200, td.response.fullBotsDetails)
      )
      .stdout()
      .stderr()
      .command(["bots:list", "-O", orgId, "--full" ,"--omit-overridden"])
      .it("show all bot details, omitting configs that are overridden")
  }),

  describe('bots:list command with missing flags', () => {

      test
      .env(testEnvData.env)
      .stderr()
      .command(["bots:list"])
      .catch(ctx => {
        expect(ctx.message).to.contain('Missing required flag')
      })
      .it('errors out when no parameters supplied')

      test
      .env(testEnvData.env)
      .stderr()
      .command(["bots:list", "-O", "24", "--omit-overridden"])
      .catch(ctx => {
        expect(ctx.message).to.contain('--full')
      })
      .it('errors out when no dependent parameters supplied')
  }),

  describe('bots:list command with empty data', () => {

    const orgId = '221'
    const endpoint = `/v4/organizations/${orgId}/bots`
  
      test
      .env(testEnvData.env)
      .nock(serverURL, (api) =>
        api
          .get(endpoint)
          .query({
            view: "BV_VIEW_UNSPECIFIED",
          })
          .reply(200, td.response.emptyBots)
      )
      .stdout()
      .command(["bots:list", "-O", orgId])
      .it("shows error message for no bots for organization", (ctx) => {
        expect(ctx.stdout).to.contain('No bots')
      })
  })
})
