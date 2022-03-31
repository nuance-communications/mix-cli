/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {expect, test} from '@oclif/test'

const td = require('./app-configs-test-data')
const {configId} = td.upgrade.flags
const testEnvData = require('../../test-data')
const serverURL = `https://${testEnvData.server}`
const endpoint = `/v4/app-configs/${configId}/.override`


describe('app-configs:upgrade', () => {
  test
    .env(testEnvData.env)
    .nock(serverURL, (api) =>
      api
        .post(endpoint)
        .query({
          latest: true,
          useProjectDefault: false,
        })
        .reply(200, td.upgrade.response.data)
      )
    .stdout()
    .command(['app-configs:upgrade','-C', configId])
    .it('upgrades an application configuration', ctx => {
      const {id, tag} = td.upgrade.response.data.config
      const [firstLine] = ctx.stdout.split('\n')
      expect(firstLine).to.contain(`Application configuration with tag "${tag}" and ID ${id} is upgraded.`)
    })
})
