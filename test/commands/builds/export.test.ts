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

const td = require('./builds-test-data')
const testEnvData = require('../../test-data')
const serverURL = `https://${testEnvData.server}`

describe('builds:export', () => {
  const downloadFileStub = sinon.stub().resolves(true)

  after(() => {
    downloadFileStub.reset()
  })

  test
    .env(testEnvData.env)
    .nock(serverURL, api => api
      .get(`/v4/builds/${td.request.buildLabel}/.download`)
      .reply(200, td.exportResponse)
    )
    .stub(df, 'downloadFile', () => downloadFileStub)
    .stdout()
    .command(['builds:export', '--build-label', td.request.buildLabel, '-f', td.request.filepath])
    .it('downloads a build to zip file', ctx => {
      const [firstLine] = ctx.stdout.split('\n').map(ln => ln.trim())
      expect(firstLine).to.equal(`Build exported to file ${td.request.filepath}`)
    })

  test
    .env(testEnvData.env)
    .nock(serverURL, api => api
      .get(`/v4/builds/${td.request.buildLabel}/.download`)
      .reply(200, td.exportResponse)
    )
    .stub(df, 'downloadFile', () => downloadFileStub)
    .stdout()
    .command(['builds:export', '--build-label', td.request.buildLabel, '--overwrite'])
    .it('downloads a build and overwrites the zip file', ctx => {
      const [firstLine] = ctx.stdout.split('\n').map(ln => ln.trim())
      expect(firstLine).to.equal(`Build exported to file build-${td.request.buildLabel}.zip`)
    })

})
