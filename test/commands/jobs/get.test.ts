/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {expect, test} from '@oclif/test'
import {PrettyPrintableError} from '@oclif/core/lib/errors'

const td = require('./jobs-test-data')

const testEnvData = require('../../test-data')
const serverURL = `https://${testEnvData.server}`

describe('jobs:get command', () => {
  test
    .env(testEnvData.env)
    .nock(serverURL, api => api
      .get(`/v4/projects/${td.request.projectId}/jobs/${td.request.jobId}`)
      .reply(200, td.getResponse)
    )
    .stdout()
    .command(['jobs:get',
      `-P=${td.request.projectId}`,
      `-J=${td.request.jobId}`])
    .it('outputs job details in human-readable format', ctx => {
      const lines = ctx.stdout.split('\n').map(ln => ln.trim())
      const project = lines[0].split(/:/).map(x => x.trim())
      const job = lines[1].split(/:/).map(x => x.trim())
      const jobType = lines[2].split(/:/).map(x => x.trim())
      const duration = lines[5].split(/:/).map(x => x.trim())

      expect(project).to.deep.equal(['ProjectId', td.request.projectId.toString()])
      expect(job).to.deep.equal(['JobId', td.request.jobId])
      expect(jobType).to.deep.equal(['JobType', 'BUILD_MODELS'])
      expect(duration).to.deep.equal(['Duration', '52s'])
    })

  test
    .env(testEnvData.env)
    .nock(serverURL, api => api
      .get(`/v4/projects/${td.request.projectId}/jobs/${td.request.jobId}`)
      .reply(200, td.getResponse)
    )
    .stdout()
    .command(['jobs:get',
      `-P=${td.request.projectId}`,
      `-J=${td.request.jobId}`,
      '--json'])
    .it('outputs job details in json', ctx => {
      expect(JSON.parse(ctx.stdout)).to.deep.equal(td.getResponse)
    })

  test
    .env(testEnvData.env)
    .command(['jobs:get',
      `-P=${td.request.projectId}`])
    .catch(ctx => {
      expect(ctx.message).to.contain('Missing required flag')
      expect(ctx.message).to.contain('job')
    })
    .it('gives an error when only project ID is given')

  test
    .env(testEnvData.env)
    .nock(serverURL, api => api
      .get(`/v4/projects/${td.request.projectId}/jobs/${td.request.unknownJobId}`)
      .reply(404, {message: 'No job found'})
    )
    .stdout()
    .command(['jobs:get',
      `-P=${td.request.projectId}`,
      `-J=${td.request.unknownJobId}`])
    .catch(ctx => {
      const err: PrettyPrintableError = ctx
      expect(err.message).to.contain('No job found')
    })
    .it("reports a 'not found error' when given a non-existing job ID")
})
