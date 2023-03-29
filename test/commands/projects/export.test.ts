/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {expect, test} from '@oclif/test'
import {PrettyPrintableError} from '@oclif/core/lib/errors'

import * as DownloadFileModule from '../../../src/utils/download-file'

const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')

chai.should()
chai.use(sinonChai)

const td = require('./projects-test-data')
const testData = require ('../../test-data')
const serverURL = `https://${testData.server}`

const endpoint = {
  export: '/v4/projects/1922/.export',
  exportMetadata: '/v4/projects/1922/metadata/.export',
}

describe('projects:export command', () => {
  const downloadFileStub = sinon.stub().resolves(true)

  after(() => {
    downloadFileStub.reset()
  })

  test
    .env(testData.env)
    .stdout()
    .nock(serverURL, api => api
      .get(endpoint.export)
      .reply(200, td.export.response.data)
    )
    .stub(DownloadFileModule, 'downloadFile', () => downloadFileStub)
    .command(['projects:export',
      '-P', td.export.flags.project.toString()]
    )
    .it('exports a project to file', ctx => {
      const [firstLine] = ctx.stdout.split('\n').map(ln => ln.trim())
      expect(firstLine).to.equal(`Project package exported to file project-${td.export.flags.project}.zip`)
    })

  test
    .env(testData.env)
    .stdout()
    .nock(serverURL, api => api
      .get(endpoint.exportMetadata)
      .reply(200, td.export.response.data)
    )
    .stub(DownloadFileModule, 'downloadFile', () => downloadFileStub)
    .command(['projects:export',
      '-P', td.export.flags.project.toString(),
      '--metadata-only',
    ])
    .it('exports a project metadata to file', ctx => {
      const [firstLine] = ctx.stdout.split('\n').map(ln => ln.trim())
      expect(firstLine).to.equal(`Project metadata exported to file project-metadata-${td.export.flags.project.toString()}.json`)
    })

  test
    .env(testData.env)
    .stderr()
    .command(['projects:export',
      `-f=${td.export.flags.filepath}`]
    )
    .catch(ctx => {
      const err = ctx as PrettyPrintableError
      expect(err.message).to.contain('Missing required flag project')
    })
    .it('errors out when project ID is not specified')
 })
