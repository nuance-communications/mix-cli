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

const td = require('./builds-test-data')

const testEnvData = require('../../test-data')
const serverURL = `https://${testEnvData.server}`

describe('builds:list', () => {
  test
    .env(testEnvData.env)
    .nock(serverURL, api => api
      .persist()
      .get(`/v4/projects/${td.request.projectId}/builds`)
      .query({
        type: td.request.type,
        limit: defaultLimit,
      })
      .reply(200, td.response)
    )
    .stdout()
    .command(['builds:list',
      `-P=${td.request.projectId}`,
      '--build-type=asr'])
    .it('lists builds with table headers', ctx => {
      const lines = ctx.stdout.split('\n').map(ln => ln.trim())
      const headers = lines[0].split(/\s+/)

      expect(headers).to.deep.equal(['BuildId', 'BuildLabel', 'Version', 'BuildType', 'Status','LanguageTopic', 'DataPack', 'ModelType', 'CreateTime', 'DataSources', 'Notes'])  
    })

  test
    .env(testEnvData.env)
    .nock(serverURL, api => api
      .persist()
      .get(`/v4/projects/${td.request.projectId}/builds`)
      .query({
        limit: defaultLimit,
        type: td.request.type,
        offset: 2,
      })
      .reply(200, td.moreBuildsResponse)
    )
    .stdout()
    .command(['builds:list',
      `-P=${td.request.projectId}`,
      '--build-type=asr',
      '--offset=2'])
    .it('lists builds data with an offset', ctx => {
      const lines = ctx.stdout.split('\n').map(ln => ln.trim())
      const firstRow = lines[2].split(/\s+/)

      expect(firstRow).to.deep.equal(['3266', 'ASR_1922_5', '5', 'ASR', 'BST_COMPLETED', 'gen', 'en-US@4.4.0', 'FAST', '2021-09-01T03:29:26Z', 'nuance_custom_data', 'Testing1'])  
      expect(ctx.stdout).to.contain("Items 3-6 of 6 shown.")
      expect(ctx.stdout).to.contain("Use the --limit and --offset flags to view other parts of the list.")
    })

  test
    .env(testEnvData.env)
    .nock(serverURL, api => api
      .persist()
      .get(`/v4/projects/${td.request.projectId}/builds`)
      .query({
        type: td.request.type,
        limit: 2,
      })
      .reply(200, td.limitBuildsResponse)
    )
    .stdout()
    .command(['builds:list',
      `-P=${td.request.projectId}`,
      '--build-type=asr',
      '--limit=2'])
    .it('lists builds data with a limit', ctx => {
      const lines = ctx.stdout.split('\n').map(ln => ln.trim())
      const firstRow = lines[2].split(/\s+/)

      expect(firstRow).to.deep.equal(['3234', 'ASR_1922_1', '1', 'ASR', 'BST_COMPLETED','gen', 'en-US@4.7.0', 'n/a', '2021-08-29T17:58:01Z','nuance_custom_data'])  
      expect(ctx.stdout).to.contain("Items 1-2 of 6 shown.")
    })

  test
    .env(testEnvData.env)
    .nock(serverURL, api => api
      .persist()
      .get(`/v4/projects/${td.request.projectId}/builds`)
      .query({
        type: td.request.type,
        limit: 2,
      })
      .reply(200, td.limitBuildsResponse)
    )
    .stdout()
    .command(['builds:list',
      `-P=${td.request.projectId}`,
      '--build-type=asr',
      '--limit=2',
      '--csv'])
    .it('lists builds to csv with a limit', ctx => {
      expect(ctx.stdout).to.contain(td.csvOutput)
    })

  test
    .nock(serverURL, api => api
      .persist()
      .get(`/v4/projects/${td.request.unknownProjectID}/builds`)
      .query({
        limit: defaultLimit,
        type: td.request.type,
      })
      .reply(404, td.projectNotFoundResponse)
    )
    .env(testEnvData.env)
    .command(['builds:list',
      `-P=${td.request.unknownProjectID}`,
      `--build-type=${td.flags.buildType}`])
    .catch(ctx => {
      const err: PrettyPrintableError = ctx
      expect(err.message).to.contain(td.projectNotFoundResponse.message)
      expect(err.suggestions).to.have.lengthOf(1)
      expect(err.suggestions).to.deep.equal(['verify the values passed to the command flags.'])
    })
    .it('gives an error when project doesn not exist')
  })

  test
  .env(testEnvData.env)
  .nock(serverURL, api => api
    .persist()
    .get(`/v4/projects/${td.request.projectId}/builds`)
    .query({
      type: td.request.type,
      limit: defaultLimit,
    })
    .reply(200, td.response)
  )
  .stdout()
  .command(['builds:list',
    `-P=${td.request.projectId}`,
    '--build-type=asr',
    '--columns=Build'])
  .catch(ctx => {
    const err: PrettyPrintableError = ctx
    expect(err.message).to.contain(' is not valid column name')
    expect(err.suggestions).to.have.lengthOf(1)
    expect(err.suggestions).to.deep.equal(['verify the values passed to the --columns flag.'])
  })
  .it('gives an error when project does not exist')

  test
  .env(testEnvData.env)
  .nock(serverURL, api => api
    .persist()
    .get(`/v4/projects/${td.request.projectId}/builds`)
    .query({
      type: td.request.type,
      limit: defaultLimit,
    })
    .reply(200, td.response)
  )
  .stdout()
  .command(['builds:list',
    `-P=${td.request.projectId}`,
    '--build-type=asr',
    '--columns=Build'])
  .catch(ctx => {
    const err: PrettyPrintableError = ctx
    expect(err.message).to.contain(' is not valid column name')
    expect(err.suggestions).to.have.lengthOf(1)
    expect(err.suggestions).to.deep.equal(['verify the values passed to the --columns flag.'])
  })
  .it('lists builds with invalid column header', ctx => {
  
})
