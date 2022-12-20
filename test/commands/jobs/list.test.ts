/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {expect, test} from '@oclif/test'
import {PrettyPrintableError} from '@oclif/errors'

import {defaultLimit} from '../../../src/utils/constants'

const td = require('./jobs-test-data')

const testEnvData = require('../../test-data')
const serverURL = `https://${testEnvData.server}`


describe('jobs:list command', () => {
  test
    .env(testEnvData.env)
    .nock(serverURL, api => api
      .persist()
      .get(`/v4/projects/${td.request.projectId}/jobs`)
      .query({limit: defaultLimit})
      .reply(200, td.response)
    )
    .stdout()
    .command(['jobs:list',
      `-P=${td.request.projectId}`])
    .it('lists jobs for a project', ctx => {
      const lines = ctx.stdout.split('\n').map(ln => ln.trim())
      const headers = lines[0].split(/\s+/)

    expect(headers).to.deep.equal(['JobId', 'Type', 'Status', 'CreateTime', 'UpdateTime', 'Duration'])
  })

  test
    .env(testEnvData.env)
    .nock(serverURL, api => api
      .persist()
      .get(`/v4/projects/${td.request.projectId}/jobs`)
      .query({limit: defaultLimit})
      .reply(200, td.moreJobsResponse)
    )
    .stdout()
    .command(['jobs:list',
      `-P=${td.request.projectId}`])
    .it('indicates there are more samples to see ', ctx => {
      expect(ctx.stdout).to.contain("Use the 'limit' and 'offset' flags to view other parts of the list")
      expect(ctx.stdout).to.contain(`Items 1-2 of 5 shown.`)
      expect(ctx.stdout).to.contain("Use the 'limit' and 'offset' flags to view other parts of the list.")
  })

  test
    .env(testEnvData.env)
    .nock(serverURL, api => api
      .persist()
      .get(`/v4/projects/${td.request.projectId}/jobs`)
      .query({limit: defaultLimit})
      .reply(200, td.noJobsResponse)
    )
    .stdout()
    .command(['jobs:list',
      `-P=${td.request.projectId}`])
    .it('provides a relevant message when there are no jobs ', ctx => {
      expect(ctx.stdout).to.contain('No jobs found')
  })

  test
    .env(testEnvData.env)
    .nock(serverURL, api => api
      .persist()
      .get(`/v4/projects/${td.request.unknownProjectId}/jobs`)
      .query({limit: defaultLimit})
      .reply(404, td.noJobsResponse)
    )
    .stdout()
    .command(['jobs:list',
      `-P=${td.request.unknownProjectId}`])
    .catch(ctx => {
      const err: PrettyPrintableError = ctx
      expect(err.code).to.contain('ENOTFOUND')
    })
    .it('reports 404 for an unknown project ID')

  test
    .env(testEnvData.env)
    .nock(serverURL, api => api
      .persist()
      .get(`/v4/projects/${td.request.projectId}/jobs`)
      .query({limit: defaultLimit})
      .reply(200, td.response)
    )
    .stdout()
    .command(['jobs:list',
      `-P=${td.request.projectId}`,
      '--json'])
    .it('does not show the footer message for json', ctx => {
      expect(JSON.parse(ctx.stdout)).to.deep.equal(td.jsonOutput)
  })

  test
    .env(testEnvData.env)
    .command(['jobs:list'])
    .catch(ctx => {
      expect(ctx.message).to.contain('Missing required flag')
      expect(ctx.message).to.contain('-P, --project PROJECT')
    })
    .it('gives an error when project is missing')
})
