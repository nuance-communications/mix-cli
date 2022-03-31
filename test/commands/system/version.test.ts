/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {expect, test} from '@oclif/test'

const testData = require('../../test-data')
const serverURL = `https://${testData.server}`

describe('system:version command', () => {
  test
    .env(testData.env)
    .nock(serverURL, api => api
    .get('/v4/version')
    .reply(200, testData.version)
    )
    .stdout()
    .command(['system:version'])
    .it('returns mix api server version information', ctx => {
      const {mixAPIServer, apiVersion, mixEnvironment, mixVersion} = testData.version
      expect(ctx.stdout).to.contain(`Mix API server ${mixAPIServer}`)
      expect(ctx.stdout).to.contain(`running API version ${apiVersion}`)
      expect(ctx.stdout).to.contain(`in environment ${mixEnvironment}`)
      expect(ctx.stdout).to.contain(`on Mix version ${mixVersion}`)
    })

  test
    .env(testData.env)
    .nock(serverURL, api => api
    .get('/v4/version')
    .reply(200, testData.version)
    )
    .stdout()
    .command(['system:version', '--json'])
    .it('formats mix API version into json appropriately', ctx => {
      expect(JSON.parse(ctx.stdout)).to.deep.equal(testData.version)
    })

  test
    .env(testData.env)
    .nock(serverURL, api => api
    .get('/v4/version')
    .reply(200, testData.version)
    )
    .stdout()
    .command(['system:version', '--yaml'])
    .it('formats mix API version into yaml appropriately', ctx => {
      const {mixAPIServer, apiVersion, mixEnvironment, mixVersion} = testData.version
      expect(ctx.stdout).to.contain(`mixEnvironment: ${mixEnvironment}`)
      expect(ctx.stdout).to.contain(`mixVersion: ${mixVersion}`)
      expect(ctx.stdout).to.contain(`mixAPIServer: ${mixAPIServer}`)
      expect(ctx.stdout).to.contain(`apiVersion: ${apiVersion}`)
    })
})
