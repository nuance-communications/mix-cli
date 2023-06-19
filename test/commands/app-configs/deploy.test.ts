/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {expect, test} from '@oclif/test'

const td = require('./app-configs-test-data')
const {config, "env-geo": envId} = td.deploy.flags
const testEnvData = require('../../test-data')
const serverURL = `https://${testEnvData.server}`
const endpoint = `/v4/app-configs/${config}/.deploy`

describe('app-configs:deploy', () => {
  test
    .env(testEnvData.env)
      .nock(serverURL, (api) =>
        api
          .put(endpoint)
          .query({
            environmentGeographyIds:envId,
          })
          .reply(200, td.deploy.response.data)
        )
    .stdout()
    .command(['app-configs:deploy','-C', config, '--env-geo', envId])
    .it('does deploy to one specified env-geo', ctx => {
      const lines = ctx.stdout.split('\n').map(ln => ln.trim())
      const headers = lines[0].split(/\s+/)
      expect(headers).to.deep.equal(['Id', 'ConfigId', 'Approved', 'PromotionFlowStepId', 'Code', 'Message'])
    })

  test
    .env(testEnvData.env)
      .nock(serverURL, (api) =>
        api
          .put(endpoint)
          .reply(200, td.deploy.response.data)
        )
    .stdout()
    .command(['app-configs:deploy','-C', config])
    .it('deploys without an env-geo', ctx => {
      const lines = ctx.stdout.split('\n').map(ln => ln.trim())
      const headers = lines[0].split(/\s+/)
      expect(headers).to.deep.equal(['Id', 'ConfigId', 'Approved', 'PromotionFlowStepId', 'Code', 'Message'])
    })

  test
    .env(testEnvData.env)
      .nock(serverURL, (api) =>
        api
          .put(endpoint)
          .reply(400, td.deploy.response400)
        )
    .stderr()
    .command(['app-configs:deploy','-C', config])
    .it('fails if app config is already deployed and shows warning', ctx => {
      const [firstLine] = ctx.stderr.split('\n')
      expect(firstLine).to.contain('configuration was already deployed')
    })
})
