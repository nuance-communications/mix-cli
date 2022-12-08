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
  locksGetResponse,
  noLocksGetReponse,
} = testData

describe('locks:get command', () => {
  describe('locks:get command with projectId', () => {
    const projectId = '457'
    const endpoint = `/v4/projects/${projectId}/.lock`
  
    test
      .nock(mixAPIServerURL, (api) =>
        api
          .get(endpoint)
          .reply(200, locksGetResponse)
      )
      .stdout()
      .command(['locks:get', '-P', projectId])
    .it('locks:get provides human-readable output', (ctx) => {
      expect(ctx.stdout).to.contain('LockId: 15')
      expect(ctx.stdout).to.contain('ProjectId: 457')
      expect(ctx.stdout).to.contain('LockOwnerName: Alice')
      expect(ctx.stdout).to.contain('LockOwnerEmail: alice@company.com')
      expect(ctx.stdout).to.contain('LockUserId: 2')
      expect(ctx.stdout).to.contain('CreateTime: now')
      expect(ctx.stdout).to.contain('Notes: string')
    })

    test
      .nock(mixAPIServerURL, (api) =>
        api
          .get(endpoint)
          .reply(200, locksGetResponse)
      )
      .stdout()
      .command(['locks:get', '-P', projectId, '--json'])
    .it('locks:get provides JSON output', (ctx) => {
      const result = JSON.parse(ctx.stdout)
      expect(result).to.deep.equal(locksGetResponse)
    })
  }),

  describe('locks:get handling of missing flags', () => {
    test
      .stderr()
      .command(['locks:get'])
      .catch(ctx => {
        expect(ctx.message).to.contain('Missing required flag')
      })
    .it('locks:get errors out when no parameters supplied')
  }),

  describe('locks:get handling of empty data', () => {
    const projectId = '458'
    const endpoint = `/v4/projects/${projectId}/.lock`

    test
      .nock(mixAPIServerURL, (api) =>
        api
          .get(endpoint)
          .reply(200, noLocksGetReponse)
      )
      .stdout()
      .command(['locks:get', '-P', projectId])
    .it('locks:get shows relevant message if no locks are returned', (ctx) => {
      expect(ctx.stdout).to.contain('No lock')
    })
  })
})

