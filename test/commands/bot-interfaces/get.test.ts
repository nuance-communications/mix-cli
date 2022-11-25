/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {expect, test} from '@oclif/test'
import {mixAPIServer} from '../../mocks'
import testData from './bot-interfaces-test-data'

const {
  botInterfacesGetResponse,
} = testData

const serverURL = `https://${mixAPIServer}`

describe('bot-interfaces:get command', () => {
  describe('bot-interfaces:get command with valid botId and Configuration Id', () => {
    const botId = '456'
    const configId = '321'
    const endpoint = `/v4/bots/${botId}/configs/${configId}/interface`
  
    test
    .nock(serverURL, (api) =>
      api
        .get(endpoint)
        .reply(200, botInterfacesGetResponse)
    )
    .stdout()
    .command(["bot-interfaces:get", "-B", botId, "-C", configId])
    .it("bot-interfaces:get provides human-readable output for given bot and configuration", (ctx) => {
        expect(ctx.stdout).to.contain('52')
        expect(ctx.stdout).to.contains(['en-US'])
    })
  
    test
      .nock(serverURL, (api) =>
        api
          .get(endpoint)
          .reply(200, botInterfacesGetResponse)
      )
      .stdout()
      .command(["bot-interfaces:get", "-B", botId, "-C", configId, "--json"])
      .it("bot-interfaces:get provides JSON output for given bot and configuration", (ctx) => {
        const result = JSON.parse(ctx.stdout)
        expect(result).to.deep.equal(botInterfacesGetResponse)
      })
  }),

  describe('bot-interfaces:get handling of missing flags', () => {
      const botId = '456'
      const configId = '321'
    
      test
      .stderr()
      .command(["bot-interfaces:get"])
      .catch(ctx => {
        expect(ctx.message).to.contain('Missing required flag')
      })
      .it('bot-interfaces:get errors out when no parameters supplied')

      test
      .stderr()
      .command(["bot-interfaces:get", "-B", botId])
      .catch(ctx => {
        expect(ctx.message).to.contain('Missing required flag')
      })
      .it('bot-interfaces:get errors out when configuration Id not supplied')

      test
      .stderr()
      .command(["bot-interfaces:get", "-C", configId])
      .catch(ctx => {
        expect(ctx.message).to.contain('Missing required flag')
      })
      .it('bot-interfaces:get errors out when bot Id not supplied')
  })
})