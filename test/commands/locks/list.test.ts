/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {expect, test} from '@oclif/test'
import {mixAPIServerURL} from '../../mocks'
import testData from './locks-test-data'

const {
  locksListResponse,
  noLocksReponse,
} = testData

describe('locks:list command', () => {
  describe('locks:list command with projectId, userId and organizationId', () => {
    const projectId = '457'
    const userId = '2'
    const organizationId = '5'
    const endpoint = '/v4/projects/.locks'
  
    test
      .nock(mixAPIServerURL, (api) =>
        api
          .get(endpoint)
          .query({
            limit: 25,
          })
          .reply(200, locksListResponse)
      )
      .stdout()
      .command(['locks:list'])
    .it('locks:list provides human-readable output', (ctx) => {
      const lines = ctx.stdout.split('\n').map(ln => ln.trim())
      const headers = lines[0].split(/\s+/)
      const firstRow = lines[2].split(/\s+/)
      expect(headers).to.deep.equal([
        'LockId',
        'ProjectId',
        'LockOwnerName',
        'LockOwnerEmail',
        'LockUserId',
        'CreateTime',
        'Notes'
      ])
      expect(firstRow).to.deep.equal(['15', '457', 'Alice', 'example@gmail.com', '2', 'now', 'string'])
    })

    test
      .nock(mixAPIServerURL, (api) =>
        api
          .get(endpoint)
          .query({
            orgId: organizationId,
            limit: 25,
          })
          .reply(200, locksListResponse)
      )
      .stdout()
      .command(['locks:list', '-O', organizationId])
    .it('locks:list provides human-readable output for the given organizationId')
    // test fails if no organizationId supplied 

    test
    .nock(mixAPIServerURL, (api) =>
      api
        .get(endpoint)
        .query({
          orgId: organizationId,
          projectId: projectId,
          userId: userId,
          limit: 25
        })
        .reply(200, locksListResponse)
    )
    .stdout()
    .command(['locks:list', '-O', organizationId, '-P', projectId, '-U', userId])
  .it('locks:list provides human-readable output for the given organizationId, projectId and userId')
  // test fails if no organizationId, projectID and userId supplied 

  test
    .nock(mixAPIServerURL, (api) =>
      api
        .get(endpoint)
        .query({
          limit: 10,
          sortBy: 'LockId'
        })
        .reply(200, locksListResponse)
    )
    .stdout()
    .command(['locks:list', '--limit', '10', '--sort', 'LockId'])
  .it('locks:list provides human-readable output with 10 result which are sorted by LockId')
  // test fails if no limit and sortBy supplied 

    test
      .nock(mixAPIServerURL, (api) =>
        api
          .get(endpoint)
          .query({
            limit: 25,
          })
          .reply(200, locksListResponse)
      )
      .stdout()
      .command(['locks:list', '--json'])
    .it('locks:list provides JSON output', (ctx) => {
      const result = JSON.parse(ctx.stdout)
      expect(result).to.deep.equal(locksListResponse)
    })

    test
      .nock(mixAPIServerURL, (api) =>
        api
          .get(endpoint)
          .query({
            limit: 25,
          })
          .reply(200, locksListResponse)
      )
      .stdout()
      .command(['locks:list', '--csv'])
    .it('locks:list provides human-readable output', (ctx) => {
      const lines = ctx.stdout.split('\n').map(ln => ln.trim())
      const headers = lines[0].split(',')
      const firstRow = lines[1].split(',')
      expect(headers).to.deep.equal([
        'LockId',
        'ProjectId',
        'LockOwnerName',
        'LockOwnerEmail',
        'LockUserId',
        'CreateTime',
        'Notes'
      ])
      expect(firstRow).to.deep.equal(['15', '457', 'Alice', 'example@gmail.com', '2', 'now', 'string'])
    })
  }),

  describe('locks:list handling of empty data', () => {
    const endpoint = '/v4/projects/.locks'

    test
      .nock(mixAPIServerURL, (api) =>
        api
          .get(endpoint)
          .query({
            limit: 25,
          })
          .reply(200, noLocksReponse)
      )
      .stdout()
      .command(['locks:list'])
    .it('locks:list shows error message with no locks', (ctx) => {
      expect(ctx.stdout).to.contain('No locks')
    })
  })  
})
