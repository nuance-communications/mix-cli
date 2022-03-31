/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {expect, test} from '@oclif/test'

const td = require('./jobs-test-data')

const testEnvData = require('../../test-data')
const serverURL = `https://${testEnvData.server}`

describe('jobs:cancel command', () => {
  test
    .env(testEnvData.env)
    .nock(serverURL, api => api
      .delete(`/v4/projects/${td.request.projectId}/jobs/${td.request.jobId}`)
      .reply(200, td.deleteResponse)
    )
    .stdout()
    .command(['jobs:cancel',
      `-P=${td.request.projectId}`,
      `-J=${td.request.jobId}`,
      `-c=${td.request.projectId}`])
    .it('cancels a job successfully', ctx => {
      expect(ctx.stdout).to.contain(`Cancel request for job ${td.request.jobId} in project ${td.request.projectId} completed successfully.`)
    })
})
