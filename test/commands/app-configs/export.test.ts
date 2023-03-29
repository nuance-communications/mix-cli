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
const {config, "runtime-app": appId} = td.export.flags
const testEnvData = require('../../test-data')
const serverURL = `https://${testEnvData.server}`
const endpoint = `/v4/app-configs/${config}/.download`

describe('app-configs:export', () => {
  const downloadFileStub = sinon.stub().resolves(true)

  after(() => {
    downloadFileStub.reset()
  })

  test
    .env(testEnvData.env)
    .nock(serverURL, (api) => 
    api
      .get(endpoint)
      .query({
        appId: appId,
      })
      .reply(200, td.export.response)
    )
    .stub(df, 'downloadFile', () => downloadFileStub)
    .stdout()
    .command(['app-configs:export',
      '--config', config,
      '--runtime-app', appId,
    ])
    .it('downloads application configuration to a zip file', ctx => {
      const [firstLine] = ctx.stdout.split('\n').map(ln => ln.trim())
      expect(firstLine).to.equal(`Application configuration exported to file app-config-${config}.zip`)
    })

  test
    .env(testEnvData.env)
    .nock(serverURL, api => api
      .get(`/v4/app-configs/123/.download`)
      .query({appId: td.export.flags['runtime-app']})
      .reply(200, td.exportResponse)
    )
    .stub(df, 'downloadFile', () => downloadFileStub)
    .stdout()
    .command(['app-configs:export',
      '--config', '123',
      '--runtime-app', td.export.flags['runtime-app'],
      '--overwrite',
    ])
    .it('downloads application configuration ond overwrites zip file', ctx => {
      const [firstLine] = ctx.stdout.split('\n').map(ln => ln.trim())
      expect(firstLine).to.equal(`Application configuration exported to file app-config-123.zip`)
    })
})
