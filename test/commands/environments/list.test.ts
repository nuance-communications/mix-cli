/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {expect, test} from '@oclif/test'

const testData = require ('../../test-data')
const serverURL = 'https://' + testData.server
const td = require('./environments-test-data')

const endpoint = `/v4/organizations/${td.request.params.orgId}/environments`

describe('environments:list command', () => {
  test
    .env(testData.env)
    .stdout()
    .nock(serverURL, api => 
        api.get(endpoint)
        .query({
          limit: td.request.params.limit,
        })
        .reply(200, td.response.json)
      )
    .command(['environments:list', '-O', td.request.params.orgId.toString()])
    .it('outputs environments data in human-readable mode with correct geographies', ctx => {
      const lines = ctx.stdout.split('\n').map(ln => ln.trim())
      const [_id, name, ..._geographies] = lines[2].split(/\s+/)
      const geographies = _geographies.join(' ').split(',')
      expect(name).to.equal('Sandbox')
      expect(geographies).to.contain('Azure US')
      expect(geographies).to.contain('Extra Geo')
    })

  const shortResult = {environments: [td.response.json.environments[1]]}

  test
    .env(testData.env)
    .stdout()
    .nock(serverURL, api => 
        api.get(endpoint)
        .query({
          offset: 1,
          limit: 1,
        })
        .reply(200, shortResult)
      )
    .command(['environments:list', '-O', td.request.params.orgId.toString(), '--json', '--offset=1', '--limit=1'])
    .it('lists environments data with an offset', ctx => {
      const result = JSON.parse(ctx.stdout)
      expect(result).to.deep.equal(shortResult)
    })
})
