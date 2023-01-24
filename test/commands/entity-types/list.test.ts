/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {expect, test} from '@oclif/test'
import {mixAPIServerURL} from '../../mocks'
import testData from './entity-types-test-data'

const {
  entityTypesListResponse,
  noEntityTypesResponse,
} = testData

describe('entity-types:list command', () => {
  describe('entity-types:list command with data', () => {
    const endpoint = '/v4/ontology/entity-types'
  
    test
      .nock(mixAPIServerURL, (api) =>
        api
          .get(endpoint)
          .query({
            includeCompatibleDataTypes: true,
          })
          .reply(200, entityTypesListResponse)
      )
      .stdout()
      .command(['entity-types:list'])
    .it('entity-types:list provides human-readable output', (ctx) => {
      const lines = ctx.stdout.split('\n').map(ln => ln.trim())
      const headers = lines[0].split(/\s+/)
      const firstRow = lines[2].split(/\s+/)
      expect(headers).to.deep.equal(['EntityName', 'Description', 'CompatibleDataTypes'])
      expect(firstRow).to.deep.equal('BASE Predefined Entity SET'.split(/\s+/))
    })

    test
      .nock(mixAPIServerURL, (api) =>
        api
          .get(endpoint)
          .query({
            includeCompatibleDataTypes: true,
          })
          .reply(200, entityTypesListResponse)
      )
      .stdout()
      .command(['entity-types:list', '--json'])
    .it('entity-types:list provides JSON output', (ctx) => {
      const result = JSON.parse(ctx.stdout)
      expect(result).to.deep.equal(entityTypesListResponse)
    })
  }),

  describe('entity-types:list handling of empty data', () => {
    const endpoint = '/v4/ontology/entity-types'

    test
      .nock(mixAPIServerURL, (api) =>
        api
          .get(endpoint)
          .query({
            includeCompatibleDataTypes: true,
          })
          .reply(200, noEntityTypesResponse)
      )
      .stdout()
      .command(['entity-types:list'])
    .it('entity-types:list shows error message with no entity types', (ctx) => {
      expect(ctx.stdout).to.contain('No entity types')
    })
  })  
})
