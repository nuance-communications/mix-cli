/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {expect, test} from '@oclif/test'
import {mixAPIServerURL} from '../../mocks'
import testData from './bot-configs-test-data'

const {
  botConfigsListResponse,
  noBotConfigsResponse,
} = testData

describe('bot-configs:list command', () => {
  describe('bot-configs:list command with valid botId', () => {
    const botId = '456'
    const endpoint = `/v4/bots/${botId}/configs`
  
    test
      .nock(mixAPIServerURL, (api) =>
        api
          .get(endpoint)
          .query({
            liveOnly: false,
            excludeOverrides: false,
          })
          .reply(200, botConfigsListResponse)
      )
      .stdout()
      .command(['bot-configs:list', '-B', botId])
    .it('bot-configs:list provides human-readable output for given bot', (ctx) => {
      const lines = ctx.stdout.split('\n').map(ln => ln.trim())
      const headers = lines[0].split(/\s+/)
      const firstRow = lines[2].split(/\s+/)
      expect(headers).to.deep.equal([
        'ConfigId',
        'ContextTag',
        'ParentId',
        'HasInterface',
        'CreateTime'
      ])
      expect(firstRow).to.deep.equal(['456', 'A3_C1', '92', 'true', 'now'])
    })
  
    test
      .nock(mixAPIServerURL, (api) =>
        api
          .get(endpoint)
          .query({
            liveOnly: false,
            excludeOverrides: false,
          })
          .reply(200, botConfigsListResponse)
      )
      .stdout()
      .command(['bot-configs:list', '-B', botId, '--json'])
    .it('bot-configs:list provides JSON output for given bot', (ctx) => {
      const result = JSON.parse(ctx.stdout)
      expect(result).to.deep.equal(botConfigsListResponse)
    })
  
    test
      .nock(mixAPIServerURL, (api) =>
        api
          .get(endpoint)
          .query({
            liveOnly: false,
            excludeOverrides: false,
          })
          .reply(200, botConfigsListResponse)
      )
      .stdout()
      .stderr()
      .command(['bot-configs:list', '-B', botId, '--csv'])
    .it('bot-configs:list provides CSV output for given bot', (ctx) => {
      const [headers, ...results] = ctx.stdout.trim().split('\n')
      expect(headers.split(',')).to.deep.equal([
        'ConfigId',
        'ContextTag',
        'ParentId',
        'HasInterface',
        'CreateTime'
      ])
      expect(results[0].split(',')).to.deep.equal(['456', 'A3_C1', '92', 'true', 'now'])
    })

    test
      .nock(mixAPIServerURL, (api) =>
        api
          .get(endpoint)
          .query({
            liveOnly: false,
            excludeOverrides: false,
            appId: 'app_123'
          })
          .reply(200, botConfigsListResponse)
      )
      .stdout()
      .command(['bot-configs:list', '-B', botId, '--with-runtime-app', 'app_123'])
    .it('bot-configs:list provides human-readable output for given bot and runtime application')
    // test fails if no runtime application supplied

    test
      .nock(mixAPIServerURL, (api) =>
        api
          .get(endpoint)
          .query({
            liveOnly: false,
            excludeOverrides: false,
            tag: 'A35_C'
          })
          .reply(200, botConfigsListResponse)
      )
      .stdout()
      .command(['bot-configs:list', '-B', botId, '--with-tag', 'A35_C'])
    .it('bot-configs:list provides human-readable output for given bot and context tag')
    // test fails if no context tag supplied

    test
      .nock(mixAPIServerURL, (api) =>
        api
          .get(endpoint)
          .query({
            liveOnly: true,
            excludeOverrides: false,
          })
          .reply(200, botConfigsListResponse)
      )
      .stdout()
      .command(['bot-configs:list', '-B', botId, '--live-only'])
    .it('bot-configs:list provides human-readable output of currently deployed bot configurations for given bot')
    // test fails if liveOnly is set to false
  }),

  describe('bot-configs:list handling of missing flags', () => {
    test
      .stderr()
      .command(['bot-configs:list'])
      .catch(ctx => {
        expect(ctx.message).to.contain('Missing required flag')
      })
    .it('bot-configs:list errors out when no parameters supplied')
  }),

  describe('bot-configs:list handling of empty data', () => {
    const botId = '457'
    const endpoint = `/v4/bots/${botId}/configs`

    test
      .nock(mixAPIServerURL, (api) =>
        api
          .get(endpoint)
          .query({
            liveOnly: false,
            excludeOverrides: false,
          })
          .reply(200, noBotConfigsResponse)
      )
      .stdout()
      .command(['bot-configs:list', '-B', botId])
    .it('bot-configs:list shows error message for bot with no application configuration', (ctx) => {
      expect(ctx.stdout).to.contain('No configurations')
    })
  })  
})
