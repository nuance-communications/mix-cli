/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {expect, test} from '@oclif/test'
import {mixAPIServerURL} from '../../mocks'
import testData from './bot-credentials-test-data'

const {
  botCredentialsListResponse,
  fullBotCredentialsListResponse,
  noBotCredentialsResponse,
} = testData

describe('bot-credentials:list command', () => {
  describe('bot-credentials:list command with valid botId', () => {
    const botId = '456'
    const endpoint = `/v4/bots/${botId}/credentials`
  
    test
      .nock(mixAPIServerURL, (api) =>
        api
          .get(endpoint)
          .query({
            view: 'BCV_VIEW_UNSPECIFIED',
          })
          .reply(200, botCredentialsListResponse)
      )
      .stdout()
      .command(['bot-credentials:list', '-B', botId])
    .it('bot-credentials:list provides human-readable output for given bot', (ctx) => {
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
      .nock(mixAPIServerURL, (api) =>
        api
          .get(endpoint)
          .query({
            view: 'BCV_VIEW_UNSPECIFIED',
          })
          .reply(200, botCredentialsListResponse)
      )
      .stdout()
      .command(['bot-credentials:list', '-B', botId, '--json'])
    .it('bot-credentials:list provides JSON output for given bot', (ctx) => {
      const result = JSON.parse(ctx.stdout)
      expect(result).to.deep.equal(botCredentialsListResponse)
    })
  
    test
      .nock(mixAPIServerURL, (api) =>
        api
          .get(endpoint)
          .query({
            view: 'BCV_FULL',
          })
          .reply(200, fullBotCredentialsListResponse)
      )
      .stdout()
      .stderr()
      .command(['bot-credentials:list', '-B', botId, '--full'])
    .it('bot-credentials:list provides full details for given bot', (ctx) => {
      expect(ctx.stdout).to.contain('app_123')
      expect(ctx.stdout).to.contain('client_123')
    })

    const geoName = 'Azure US'

    test
      .nock(mixAPIServerURL, (api) =>
        api
          .get(endpoint)
          .query({
            view: 'BCV_VIEW_UNSPECIFIED',
            envGeographyName: geoName,
          })
          .reply(200, botCredentialsListResponse)
      )
      .stdout()
      .stderr()
      .command(['bot-credentials:list', '-B', botId, '--with-geo-name', geoName])
    .it('bot-credentials:list provides human-readable output for given bot and geography', (ctx) => {
      // test fails if no geography name supplied
    })
  }),

  describe('bot-credentials:list handling of missing flags', () => {
    test
      .stderr()
      .command(['bot-credentials:list'])
      .catch(ctx => {
        expect(ctx.message).to.contain('Missing required flag')
      })
    .it('bot-credentials:list errors out when no parameters supplied')
  }),

  describe('bot-credentials:list handling of empty data', () => {
    const botId = '457'
    const endpoint = `/v4/bots/${botId}/credentials`
  
    test
      .nock(mixAPIServerURL, (api) =>
        api
          .get(endpoint)
          .query({
            view: 'BCV_VIEW_UNSPECIFIED',
          })
          .reply(200, noBotCredentialsResponse)
      )
      .stdout()
      .command(['bot-credentials:list', '-B', botId])
    .it('bot-credentials:list shows error message for no credentials for a bot', (ctx) => {
      expect(ctx.stdout).to.contain('No credentials')
    })
  })  
})
