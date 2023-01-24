/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {expect, test} from '@oclif/test'
import {mixAPIServerURL} from '../../mocks'
import testData from './bots-test-data'

const {
  botsListResponse,
  fullBotsDetailsResponse,
  noBotsReponse,
} = testData

describe('bots:list command', () => {
  describe('bots:list command with valid organizationId', () => {
    const orgId = '24'
    const endpoint = `/v4/organizations/${orgId}/bots`
  
    test
      .nock(mixAPIServerURL, (api) =>
        api
          .get(endpoint)
          .query({
            view: 'BV_VIEW_UNSPECIFIED',
          })
          .reply(200, botsListResponse)
      )
      .stdout()
      .command(['bots:list', '-O', orgId])
    .it('bots:list provides human-readable output for given organization', (ctx) => {
      const lines = ctx.stdout.split('\n').map(ln => ln.trim())
      const headers = lines[0].split(/\s+/)
      const firstRow = lines[2].split(/\s+/)
      expect(headers).to.deep.equal(['BotId', 'Name'])
      expect(firstRow).to.deep.equal('456 Mix Sample App'.split(/\s+/))
    })
  
    test
      .nock(mixAPIServerURL, (api) =>
        api
          .get(endpoint)
          .query({
            view: 'BV_VIEW_UNSPECIFIED',
          })
          .reply(200, botsListResponse)
      )
      .stdout()
      .command(['bots:list', '-O', orgId, '--json'])
    .it('bots:list provides JSON output for given organization', (ctx) => {
      const result = JSON.parse(ctx.stdout)
      expect(result).to.deep.equal(botsListResponse)
    })
  
    test
      .nock(mixAPIServerURL, (api) =>
        api
          .get(endpoint)
          .query({
            view: 'BV_VIEW_UNSPECIFIED',
          })
          .reply(200, botsListResponse)
      )
      .stdout()
      .command(['bots:list', '-O', orgId, '--csv'])
    .it('bots:list provides CSV output for given organization', (ctx) => {
      const [headers, ...results] = ctx.stdout.trim().split('\n')
      expect(headers.split(',')).to.deep.equal(['BotId', 'Name'])
      expect(results[0].split(',')).to.deep.equal(['456',  'Mix Sample App'])
    })

    test
      .nock(mixAPIServerURL, (api) =>
        api
          .get(endpoint)
          .query({
            view: 'BV_FULL',
          })
          .reply(200, fullBotsDetailsResponse)
      )
      .stdout()
      .stderr()
      .command(['bots:list', '-O', orgId, '--full'])
    .it('bots:list provides full details for given organization', (ctx) => {
      const lines = ctx.stdout.split('\n').map(ln => ln.trim())
      const headers = lines[0].split(/\s+/)
      const firstRow = lines[2].split(/\s+/)
      expect(headers).to.deep.equal(['BotId', 'Name', 'BotConfigs', 'CreateTime'])
      expect(firstRow).to.deep.equal('456 Mix Sample App 514 2022-09-12T16:14:53Z'.split(/\s+/))
    })

    test
      .nock(mixAPIServerURL, (api) =>
        api
          .get(endpoint)
          .query({
            view: 'BV_FULL_AVAILABLE_CONFIGS',
          })
          .reply(200, fullBotsDetailsResponse)
      )
      .stdout()
      .stderr()
      .command(['bots:list',
        `-O=${orgId}`,
        '--full',
        '--omit-overridden'
      ])
    .it('bots:list omits overriden app configs in list for given organization')
    // test fails if wrong view is passed

    test
      .nock(mixAPIServerURL, (api) =>
        api
          .get(endpoint)
          .query({
            view: 'BV_FULL_LIVE_CONFIGS',
          })
          .reply(200, fullBotsDetailsResponse)
      )
      .stdout()
      .stderr()
      .command(['bots:list',
        `-O=${orgId}`,
        '--full',
        '--live-only'
      ])
    .it('bots:list provides currently deployed app configs in list for given organization')
    // test fails if wrong view is passed
  }),

  describe('bots:list handling of missing flags', () => {
    test
      .stderr()
      .command(['bots:list'])
      .catch(ctx => {
        expect(ctx.message).to.contain('Missing required flag')
      })
    .it('bots:list errors out when no parameters supplied')

    test
      .stderr()
      .command(['bots:list', '-O', '24', '--live-only'])
      .catch(ctx => {
        expect(ctx.message).to.contain('--full')
      })
    .it('bots:list errors out when --live-only is used without --full')

    test
      .stderr()
      .command(['bots:list', '-O', '24', '--omit-overridden'])
      .catch(ctx => {
        expect(ctx.message).to.contain('--full')
      })
    .it('bots:list errors out when --omit-overriden is used without --full')
  }),

  describe('bots:list handling of conflict flags', () => {
    test
      .stderr()
      .command(['bots:list', '-O', '24', '--full', '--live-only', '--omit-overridden'])
      .catch(ctx => {
        expect(ctx.message).to.contain('cannot also be provided')
      })
    .it('bots:list errors out when --live-only and --omit-overridden supplied together')
  }),

  describe('bots:list handling of empty data', () => {
    const orgId = '221'
    const endpoint = `/v4/organizations/${orgId}/bots`
  
    test
      .nock(mixAPIServerURL, (api) =>
        api
          .get(endpoint)
          .query({
            view: 'BV_VIEW_UNSPECIFIED',
          })
          .reply(200, noBotsReponse)
      )
      .stdout()
      .command(['bots:list', '-O', orgId])
    .it('bots:list shows relevant message if organization has no bots', (ctx) => {
      expect(ctx.stdout).to.contain('No bots')
    })
  })
})
