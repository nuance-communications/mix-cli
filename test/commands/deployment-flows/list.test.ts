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
const td = require('./deployment-flows-test-data')

const endpoint = `/v4/organizations/${td.request.params.orgId}/deployment-flows`

describe('deployment-flows:list', () => {
  test
    .env(testData.env)
    .stdout()
    .nock(serverURL, api => 
        api.get(endpoint)
        .query({limit: defaultLimit})
        .reply(200, td.response.json)
      )
    .command(['deployment-flows:list', '-O', td.request.params.orgId])
    .it('lists deployment flows for an organization', ctx => {
      const lines = ctx.stdout.split('\n').map(ln => ln.trim())
      const headers = lines[1].split(/\s+/)
      const firstLine = lines[3].split(/\s+/)
      expect(headers).to.deep.equal(['StepOrder', 'StepId', 'RequiresApproval','EnvironmentGeographies'])
      expect(firstLine).to.deep.equal(['1', '338', 'false','Sandbox@Azure', 'East', 'US'])
    })
})
