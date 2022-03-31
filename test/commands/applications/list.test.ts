/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {expect, test} from '@oclif/test'

const td = require('./applications-test-data')
const {orgId, view} = td.request

const endpoint = `/v4/organizations/${orgId}/apps`

const testEnvData = require('../../test-data')
const serverURL = `https://${testEnvData.server}`

describe('applications:list command', () => {
  test
    .env(testEnvData.env)
    .nock(serverURL, (api) =>
      api
        .get(endpoint)
        .query({
          view,
        })
        .reply(200, td.response.json)
    )
    .stdout()
    .command(["applications:list", "-O", orgId, "--full", "--json"])
    .it("shows all app data appropriately in JSON view", (ctx) => {
      const result = JSON.parse(ctx.stdout)
      expect(result).to.deep.equal(td.response.json)
    })

  test
    .env(testEnvData.env)
    .nock(serverURL, (api) =>
      api
        .get(endpoint)
        .query({
          view,
        })
        .reply(200, td.response.json)
    )
    .stdout()
    .stderr()
    .command(["applications:list", "-O", orgId, "--full", "--csv"])
    .it("reformats and hides data appropriately in tabular mode", (ctx) => {
      const [headers, ...results] = ctx.stdout.trim().split('\n')
      expect(headers.split(',')).to.deep.equal(['ApplicationId', 'Name', 'AppConfigs', 'CreateTime'])
      // first row has result with comma, so it needs to be formatted differently
      expect(results[0].slice(1,-1).split('","')).to.deep.equal(['456', 'Mix Sample App', 'config_a,config_b', 'now'])
      expect(results[1].split(',')).to.deep.equal(['789', 'Mix Sample App 2', 'config_x', 'later'])
    })
})