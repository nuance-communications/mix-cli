/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {expect, test} from '@oclif/test'
import {mixAPIServerURL} from '../../mocks'
import testData from './data-types-test-data'

const {
  dataTypesListResponse,
  noDataTypesResponse,
} = testData

describe('data-types:list command', () => {
  describe('data-types:list command with data', () => {
    const endpoint = '/v4/data-types'
  
    test
      .nock(mixAPIServerURL, (api) =>
        api
          .get(endpoint)
          .query({
            includeCompatibleEntityTypes: true,
          })
          .reply(200, dataTypesListResponse)
      )
      .stdout()
      .command(['data-types:list'])
    .it('data-types:list provides human-readable output', (ctx) => {
      const lines = ctx.stdout.split('\n').map(ln => ln.trim())
      const headers = lines[0].split(/\s+/)
      const firstRow = lines[2].split(/\s+/)
      expect(headers).to.deep.equal(['DataTypeName', 'Description', 'CompatibleEntityTypes'])
      expect(firstRow).to.deep.equal('SET Nothing set. Default. FREEFORM,LIST'.split(/\s+/))
    })

    test
      .nock(mixAPIServerURL, (api) =>
        api
          .get(endpoint)
          .query({
            includeCompatibleEntityTypes: true,
          })
          .reply(200, dataTypesListResponse)
      )
      .stdout()
      .command(['data-types:list', '--json'])
    .it('data-types:list provides JSON output', (ctx) => {
      const result = JSON.parse(ctx.stdout)
      expect(result).to.deep.equal(dataTypesListResponse)
    })
  }),

  describe('data-types:list handling of empty data', () => {
    const endpoint = '/v4/data-types'

    test
      .nock(mixAPIServerURL, (api) =>
        api
          .get(endpoint)
          .query({
            includeCompatibleEntityTypes: true,
          })
          .reply(200, noDataTypesResponse)
      )
      .stdout()
      .command(['data-types:list'])
    .it('data-types:list shows error message with no data types', (ctx) => {
      expect(ctx.stdout).to.contain('No data types')
    })
  })  
})
