/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {expect, test} from '@oclif/test'

import {defaultLimit} from '../../../src/utils/constants'

const testData = require ('../../test-data')
const serverURL = 'https://' + testData.server
const td = require('./geographies-test-data')

const TOTAL_RESPONSES = td.response.json.length
const endpoint = '/v4/geographies'

describe('geographies:list command', () => {
  test
    .env(testData.env)
    .stdout()
    .nock(serverURL, api =>
        api.get(endpoint)
        .query({limit: defaultLimit})
        .reply(200, td.response.json))
    .command(['geographies:list', '--json'])
    .it('outputs all geographies data as JSON', ctx => {
        const result = JSON.parse(ctx.stdout)
        expect(result).to.deep.equal(td.response.json)
        expect(result.length).to.equal(TOTAL_RESPONSES)
    })

  test.env(testData.env)
    .stdout()
    .nock(serverURL, api =>
        api.get(endpoint)
        .query({
            limit: 3,
            offset: 5
        })
        .reply(200, {geographies: td.response.json.geographies.slice(5, 8)})
        )
    .command(['geographies:list', '--json', '--limit=3', '--offset=5'])
    .it('handles results limit and offset correctly', ctx => {
        const {geographies} = JSON.parse(ctx.stdout)
        expect(geographies.length).to.equal(3)
        expect(geographies[0].id).to.equal('7')
    })
})
