/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {expect, test} from '@oclif/test'
import {mixAPIServerURL} from '../../mocks'
import testData from './bot-interfaces-test-data'

const {
  botInterfacesGetResponse,
  noBotInterfacesResponse
} = testData

describe('bot-interfaces:get command', () => {
  describe('bot-interfaces:get command with valid botId and configurationId', () => {
    const botId = '456'
    const configId = '321'
    const endpoint = `/v4/bots/${botId}/configs/${configId}/interface`
  
    test
      .nock(mixAPIServerURL, (api) =>
        api
          .get(endpoint)
          .reply(200, botInterfacesGetResponse)
      )
      .stdout()
      .command(['bot-interfaces:get', '-B', botId, '-C', configId])
    .it('bot-interfaces:get provides human-readable output for given bot and configuration', (ctx) => {
      expect(ctx.stdout).to.contain('52')
      expect(ctx.stdout).to.contain(['en-US'])
    })
  
    test
      .nock(mixAPIServerURL, (api) =>
        api
          .get(endpoint)
          .reply(200, botInterfacesGetResponse)
      )
      .stdout()
      .command(['bot-interfaces:get', '-B', botId, '-C', configId, '--json'])
    .it('bot-interfaces:get provides JSON output for given bot and configuration', (ctx) => {
      const result = JSON.parse(ctx.stdout)
      expect(result).to.deep.equal(botInterfacesGetResponse)
    })
  }),

  describe('bot-interfaces:get handling of missing flags', () => {
    const botId = '456'
    const configId = '321'
    
    test
      .stderr()
      .command(['bot-interfaces:get'])
      .catch(ctx => {
        expect(ctx.message).to.contain('Missing required flag')
      })
    .it('bot-interfaces:get errors out when no parameters supplied')

    test
      .stderr()
      .command(['bot-interfaces:get', '-B', botId])
      .catch(ctx => {
        expect(ctx.message).to.contain('Missing required flag')
      })
    .it('bot-interfaces:get errors out when configurationId not supplied')

    test
      .stderr()
      .command(['bot-interfaces:get', '-C', configId])
      .catch(ctx => {
        expect(ctx.message).to.contain('Missing required flag')
      })
    .it('bot-interfaces:get errors out when botId not supplied')
  })

  describe('bot-interfaces:get handling of empty data', () => {
    const botId = '457'
    const configId = '561'
    const endpoint = `/v4/bots/${botId}/configs/${configId}/interface`
  
    test
      .nock(mixAPIServerURL, (api) =>
        api
          .get(endpoint)
          .reply(200, noBotInterfacesResponse.interface)
      )
      .stdout()
      .command(['bot-interfaces:get', '-B', botId, '-C', configId])
    .it('bot-interfaces:get shows error message for no interface for a bot', (ctx) => {
      expect(ctx.stdout).to.contain('No interface')
    })
  })  
})
