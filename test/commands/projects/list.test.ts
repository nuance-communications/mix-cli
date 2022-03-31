/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {expect, test} from '@oclif/test'

const td = require('./projects-test-data')
const testData = require('../../test-data')
const serverURL = `https://${testData.server}`

const {orgId} = td.request.params

const endpoint = `/v4/organizations/${orgId}/projects`

describe('projects:list command', () => {
  test
    .env(testData.env)
    .nock(serverURL, api => 
        api
        .get(endpoint)
        .reply(200, td.response)
      )
    .stdout()
    .command(['projects:list', '-O', orgId.toString()])
    .it('lists basic data for all projects', ctx => {
      const lines = ctx.stdout.split('\n').map(ln => ln.trim())
      const headers = lines[0].split(/\s+/)

      expect(headers).to.deep.equal(['ProjectId', 'Name', 'LanguageTopic', 'Channels', 'DataPacks', 'CreateTime', 'UpdateTime'])
    })

  test
    .env(testData.env)
    .nock(serverURL, api => 
        api
        .get(endpoint)
        .reply(200, td.response)
      )
    .stdout()
    .command(['projects:list', '-O', orgId.toString(), '--sort=-displayName'])
    .it('responds correctly to tabular formatting flags', ctx => {
      const lines = ctx.stdout.split('\n').map(ln => ln.trim())
      const headers = lines[0].split(/\s+/)

      expect(headers).to.deep.equal(['ProjectId', 'Name', 'LanguageTopic', 'Channels', 'DataPacks', 'CreateTime', 'UpdateTime'])
    })
})
