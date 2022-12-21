/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {expect, test} from '@oclif/test'
import {mixAPIServerURL} from '../../mocks'
import testData from './applications-test-data'

const {
  applicationsListResponse,
  fullApplicationsListResponse,
  noApplicationsResponse,
} = testData

describe('applications:list command', () => {
  describe('applications:list command with valid options', () => {
    const orgId = '3'
    const endpoint = '/v4/apps'

    test
      .nock(mixAPIServerURL, (api) =>
        api
          .get(endpoint)
          .query({
            limit: '25',
            view: 'AV_VIEW_UNSPECIFIED',
          })
          .reply(200, applicationsListResponse)
      )
      .stdout()
      .command(['applications:list'])
    .it('applications:list provides human-readable output', (ctx) => {
      const lines = ctx.stdout.split('\n').map(ln => ln.trim())
      const headers = lines[0].split(/\s+/)
      const firstRow = lines[2].split(/\s+/)
      expect(headers).to.deep.equal(['ApplicationId', 'Name'])
      expect(firstRow).to.deep.equal('1 Sample App'.split(/\s+/))
    })
  
    test
      .nock(mixAPIServerURL, (api) =>
        api
          .get(endpoint)
          .query({
            limit: '25',
            view: 'AV_VIEW_UNSPECIFIED',
          })
          .reply(200, applicationsListResponse)
      )
      .stdout()
      .command(['applications:list', '--json'])
    .it('applications:list provides JSON output', (ctx) => {
      const result = JSON.parse(ctx.stdout)
      expect(result).to.deep.equal(applicationsListResponse)
    })
  
    test
      .nock(mixAPIServerURL, (api) =>
        api
          .get(endpoint)
          .query({
            limit: '25',
            view: 'AV_VIEW_UNSPECIFIED',
          })
          .reply(200, applicationsListResponse)
      )
      .stdout()
      .command(['applications:list', '--csv'])
    .it('applications:list provides CSV output', (ctx) => {
      const [headers, ...results] = ctx.stdout.trim().split('\n')
      expect(headers.split(',')).to.deep.equal(['ApplicationId', 'Name'])
      expect(results[0].split(',')).to.deep.equal(['1',  'Sample App'])
    })

    test
      .nock(mixAPIServerURL, (api) =>
        api
          .get(endpoint)
          .query({
            limit: '25',
            orgId: orgId,
            view: 'AV_VIEW_UNSPECIFIED',
          })
          .reply(200, applicationsListResponse)
      )
      .stdout()
      .command(['applications:list', '-O', orgId])
    .it('applications:list provides human-readable output for given organization')
    // test fails if no organization Id supplied

    test
      .nock(mixAPIServerURL, (api) =>
        api
          .get(endpoint)
          .query({
            limit: '25',
            appId: 'app_123',
            view: 'AV_VIEW_UNSPECIFIED',
          })
          .reply(200, applicationsListResponse)
      )
      .stdout()
      .command(['applications:list', '--with-runtime-app', 'app_123'])
    .it('applications:list provides human-readable output for given runtime app ID')
    // test fails if no runtime app ID supplied

    test
      .nock(mixAPIServerURL, (api) =>
        api
          .get(endpoint)
          .query({
            limit: '25',
            filter: 'Test',
            view: 'AV_VIEW_UNSPECIFIED',
          })
          .reply(200, applicationsListResponse)
      )
      .stdout()
      .command(['applications:list', '--with-name', 'Test'])
    .it('applications:list provides human-readable output for given application name')
    // test fails if no application name supplied

    test
      .nock(mixAPIServerURL, (api) =>
        api
          .get(endpoint)
          .query({
            limit: '25',
            view: 'AV_FULL',
          })
          .reply(200, fullApplicationsListResponse)
      )
      .stdout()
      .stderr()
      .command(['applications:list', '--full'])
    .it('applications:list provides full details', (ctx) => {
      const lines = ctx.stdout.split('\n').map(ln => ln.trim())
      const headers = lines[0].split(/\s+/)
      const firstRow = lines[2].split(/\s+/)
      expect(headers).to.deep.equal(['ApplicationId', 'Name', 'AppConfigs', 'CreateTime'])
      expect(firstRow).to.deep.equal('1 Sample App 58 later'.split(/\s+/))
    })

    test
      .nock(mixAPIServerURL, (api) =>
        api
          .get(endpoint)
          .query({
            limit: '25',
            view: 'AV_FULL_AVAILABLE_CONFIGS',
          })
          .reply(200, fullApplicationsListResponse)
      )
      .stdout()
      .stderr()
      .command(['applications:list', '--full', '--omit-overridden'])
    .it('applications:list omits overriden app configs in list')
    // test fails if wrong view is passed

    test
      .nock(mixAPIServerURL, (api) =>
        api
          .get(endpoint)
          .query({
            limit: '10',
            view: 'AV_VIEW_UNSPECIFIED',
          })
          .reply(200, applicationsListResponse)
      )
      .stdout()
      .command(['applications:list', '--limit', '10'])
    .it('applications:list provides human-readable output with 10 results')
    // test fails if no limit supplied
  }),

  describe('applications:list handling of missing flags', () => {
    test
      .stderr()
      .command(['applications:list', '--live-only'])
      .catch(ctx => {
        expect(ctx.message).to.contain('--full')
      })
    .it('applications:list errors out when --live-only is used without --full')

    test
      .stderr()
      .command(['applications:list', '--omit-overridden'])
      .catch(ctx => {
        expect(ctx.message).to.contain('--full')
      })
    .it('applications:list errors out when --omit-overriden is used without --full')
  }),

  describe('applications:list handling of conflict flags', () => {
    test
      .stderr()
      .command(['applications:list', '--full', '--live-only', '--omit-overridden'])
      .catch(ctx => {
        expect(ctx.message).to.contain('cannot also be provided')
      })
    .it('applications:list errors out when --live-only and --omit-overridden supplied together')
  }),

  describe('applications:list handling of empty data', () => {
    const endpoint = '/v4/apps'
  
    test
      .nock(mixAPIServerURL, (api) =>
        api
          .get(endpoint)
          .query({
            limit: '25',
            view: 'AV_VIEW_UNSPECIFIED',
          })
          .reply(200, noApplicationsResponse)
      )
      .stdout()
      .command(['applications:list'])
    .it('applications:list shows relevant message if no applications found', (ctx) => {
      expect(ctx.stdout).to.contain('No applications')
    })
  })
})
