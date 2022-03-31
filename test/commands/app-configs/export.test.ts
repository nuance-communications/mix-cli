/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {expect, test} from '@oclif/test'

import * as df from '../../../src/utils/download-file'
const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')

chai.should()
chai.use(sinonChai)

const td = require('./app-configs-test-data')
const testEnvData = require('../../test-data')
const serverURL = `https://${testEnvData.server}`

describe('app-configs:export', () => {
  const downloadFileStub = sinon.stub().resolves(true)

  after(() => {
    downloadFileStub.reset()
  })

  test
    .env(testEnvData.env)
    .nock(serverURL, api => api
      .get(`/v4/app-configs/${td.export.flags.config}/.download`)
      .query({appId: td.export.flags['runtime-app']})
      .reply(200, td.export.response)
    )
    .stub(df, 'downloadFile', () => downloadFileStub)
    .stdout()
    .command(['app-configs:export',
      '--config', td.export.flags.config,
      '--runtime-app', td.export.flags['runtime-app'],
      '-f', td.export.flags.filepath,
    ])
    .it('downloads application configuration to a zip file', ctx => {
      const [firstLine] = ctx.stdout.split('\n').map(ln => ln.trim())
      expect(firstLine).to.equal(`Application configuration exported to file ${td.export.flags.filepath}.`)
    })

  test
    .env(testEnvData.env)
    .nock(serverURL, api => api
      .get(`/v4/app-configs/${td.export.flags.config}/.download`)
      .query({appId: td.export.flags['runtime-app']})
      .reply(200, td.exportResponse)
    )
    .stub(df, 'downloadFile', () => downloadFileStub)
    .stdout()
    .command(['app-configs:export',
      '--config', td.export.flags.config,
      '--runtime-app', td.export.flags['runtime-app'],
      '-f', td.export.flags.filepath,
      '--overwrite',
    ])
    .it('downloads application configuration ond overwrites zip file', ctx => {
      const [firstLine] = ctx.stdout.split('\n').map(ln => ln.trim())
      expect(firstLine).to.equal(`Application configuration exported to file ${td.export.flags.filepath}.`)
    })

  test
    .env(testEnvData.env)
    .stdout()
    .command(['app-configs:export',
      '--config', td.export.flags.config,
      '--runtime-app', td.export.flags['runtime-app'],
    ])
    .catch(ctx => {
      expect(ctx.message).to.contain('Missing required flag')
      expect(ctx.message).to.contain('-f, --filepath FILEPATH')
      })
    .it('errors out when application configuration output file path is not provided')

})
