/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {expect, test} from '@oclif/test'
import {PrettyPrintableError} from '@oclif/core/lib/errors'

const td = require('./builds-test-data')

const testEnvData = require('../../test-data')
const serverURL = `https://${testEnvData.server}`

describe('builds:latest', () => {
  let originalOAuth2: any

  test
  .env(testEnvData.env)
  .nock(serverURL, api => api
    .get(`/v4/projects/${td.request.projectId}/builds/.latest`)
    .reply(200, td.latestBuildsResponse)
  )
  .stdout()
  .command(['builds:latest', '-P', `${td.request.projectId}`])
  .it('lists latest builds', ctx => {
    const lines = ctx.stdout.split('\n').map(ln => ln.trim())
    const headers = lines[0].split(/\s+/)
    const firstRow = lines[2].split(/\s+/)
    expect(headers).to.deep.equal(['BuildType', 'Locale', 'BuildLabel', 'BuildVersion'])
    expect(firstRow).to.deep.equal(['asr', 'en-US', 'ASR_1922_13', '13'])
  })

  test
  .env(testEnvData.env)
  .nock(serverURL, api => api
    .get(`/v4/projects/${td.request.projectId}/builds/.latest`)
    .reply(200, td.noLatestBuildResponse)
  )
  .stdout()
  .command(['builds:latest', '-P', `${td.request.projectId}`])
  .it('reports no builds when no builds are found', ctx => {
    expect(ctx.stdout).to.contain('No builds found.')
  })

  test
  .nock(serverURL, api => api
    .persist()
    .get(`/v4/projects/${td.request.unknownProjectID}/builds/.latest`)
    .reply(404, td.projectNotFoundResponse)
  )
  .env(testEnvData.env)
  .command(['builds:latest',
    `-P=${td.request.unknownProjectID}`])
  .catch(ctx => {
    const err: PrettyPrintableError = ctx
    expect(err.message).to.contain(td.projectNotFoundResponse.message)
    expect(err.suggestions).to.have.lengthOf(1)
    expect(err.suggestions).to.deep.equal(['verify the values passed to the command flags.'])
  })
  .it('gives an error when project does not exist')

  test
  .env(testEnvData.env)
  .nock(serverURL, api => api
    .get(`/v4/projects/${td.request.projectId}/builds/.latest`)
    .reply(200, td.latestMultipleLocalesResponse)
  )
  .stdout()
  .command(['builds:latest', '-P', `${td.request.projectId}`,'--csv'])
  .it('lists builds to csv with a limit', ctx => {
    expect(ctx.stdout).to.contain(td.csvOutputLatest)
  })
})
