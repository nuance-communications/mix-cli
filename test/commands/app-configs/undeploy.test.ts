/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {expect, test} from '@oclif/test'

const td = require('./app-configs-test-data')
const {config, "env-geo": envId} = td.undeploy.flags
const testEnvData = require('../../test-data')
const serverURL = `https://${testEnvData.server}`
const endpoint = `/v4/app-configs/${config}/.undeploy`

describe('app-configs:undeploy', () => {
  test
    .env(testEnvData.env)
    .nock(serverURL, (api) =>
      api
        .put(endpoint)
        .query({
          environmentGeographyIds:envId,
        })
        .reply(200, td.undeploy.response.data)
      )
    .stdout()
    .command(['app-configs:undeploy','-C', config, '--env-geo', envId])
    .it('undeploys to one specified env-geo', ctx => {
      const lines = ctx.stdout.split('\n').map(ln => ln.trim())
      const headers = lines[0].split(/\s+/)
      expect(headers).to.deep.equal(['ConfigId', 'ConfigDeploymentId', 'EnvironmentGeographyId', 'Message'])
    })

  test
    .env(testEnvData.env)
    .nock(serverURL, (api) =>
      api
        .put(endpoint)
        .reply(200, td.undeploy.response.data)
      )
    .stdout()
    .command(['app-configs:undeploy','-C', config])
    .it('undeploys without an env-geo', ctx => {
      const lines = ctx.stdout.split('\n').map(ln => ln.trim())
      const headers = lines[0].split(/\s+/)
      expect(headers).to.deep.equal(['ConfigId', 'ConfigDeploymentId', 'EnvironmentGeographyId', 'Message'])
    })

  test
    .env(testEnvData.env)
    .nock(serverURL, (api) =>
      api
        .put(endpoint)
        .reply(400, td.undeploy.response400)
      )
    .stdout()
    .command(['app-configs:undeploy','-C', config])
    .catch(ctx => {
      expect(ctx.message).to.contain('Cannot undeploy application config')
      })
    .it('fails if app config is already undeployed', ctx => {
    })
})
