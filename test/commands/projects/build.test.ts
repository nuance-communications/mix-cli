/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {expect, test} from '@oclif/test'

const td = require('./projects-test-data')

const testEnvData = require('../../test-data')
const serverURL = `https://${testEnvData.server}`

describe('projects:build', () => {
  test
    .env(testEnvData.env)
    .nock(serverURL, api => api
      .post(`/v4/projects/${td.request.projectId}/.build`)
      .reply(200, td.buildResponse)
    )
    .stdout()
    .command(['projects:build',
      `-P=${td.request.projectId}`,
      `-L=${td.request.locale}`])
    .it('starts a build job for a project', ctx => {
      expect(ctx.stdout).to.contain(`Build job e01669b9-d572-45d4-9fcc-270947494556 successfully queued.`)
      expect(ctx.stdout).to.contain(`Use 'mix jobs:get -P 1922 -J e01669b9-d572-45d4-9fcc-270947494556 --watch' to monitor progress.`)
    })
})
