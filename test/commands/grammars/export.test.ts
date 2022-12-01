/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {expect, test} from '@oclif/test'
import {mixAPIServerURL} from '../../mocks'
import testData from './grammars-test-data'

import * as df from '../../../src/utils/download-file'

const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')

chai.should()
chai.use(sinonChai)

const {
  grammarsExportResponse,
} = testData

describe('grammars:export command', () => {
  const projectId = '254'
  const entityName = 'DrinkEntity'
  const endpoint = `/v4/projects/${projectId}/entities/${entityName}/grammars/.export`
  const downloadFileStub = sinon.stub().resolves(true)

  after(() => {
    downloadFileStub.reset()
  })

  describe('grammars:export command with valid projectId, entityName and default filepath', () => {
    const defaultFilepath = `grammars-${projectId}-${entityName}.zip`
    const overwrite = false
    const downloadArgs = {
      response: grammarsExportResponse,
      filepath: defaultFilepath,
      overwrite: overwrite
    }

    test
      .nock(mixAPIServerURL, (api) =>
        api
          .get(endpoint)
          .reply(200, grammarsExportResponse)
      )
      .stub(df, 'downloadFile', () => downloadFileStub(downloadArgs))
      .stdout()
      .command(['grammars:export', '-P', projectId, '-E', entityName])
    .it('grammars:export provides human-readable output for given project and entity with default filepath', (ctx) => {
      expect(downloadFileStub.calledWith(downloadArgs)).to.be.true
      expect(ctx.stdout).to.contain(`exported to file ${defaultFilepath}`)
    })

    const error = new Error('file already exist')
    const failedDownloadFileStub = sinon.stub().rejects(true).throws(error)

    after(() => {
      failedDownloadFileStub.reset()
    })
    
    test
      .nock(mixAPIServerURL, (api) =>
        api
          .get(endpoint)
          .reply(200, grammarsExportResponse)
      )
      .stub(df, 'downloadFile', failedDownloadFileStub)
      .stdout()
      .command(['grammars:export', '-P', projectId, '-E', entityName])
      .catch(ctx => {
        expect(ctx.message).to.contain('file already exist')
      })
    .it('grammars:export errors out when file already exist')
  }),

  describe('grammars:export command with valid projectId, entityName and given filepath', () => {
    const filepath = `grammars-${entityName}.json`
    const overwrite = true
    const downloadArgs = {
      response: grammarsExportResponse,
      filepath: filepath,
      overwrite: overwrite
    }
  
    test
      .nock(mixAPIServerURL, (api) =>
        api
          .get(endpoint)
          .reply(200, grammarsExportResponse)
      )
      .stub(df, 'downloadFile', () => downloadFileStub)
      .stdout()
      .command(['grammars:export', '-P', projectId, '-E', entityName, '-f', filepath])
    .it('grammars:export provides human-readable output for given project and entity with filepath', (ctx) => {
      expect(ctx.stdout).to.contain(`exported to file ${filepath}`)
    })

    test
      .nock(mixAPIServerURL, (api) =>
        api
          .get(endpoint)
          .reply(200, grammarsExportResponse)
      )
      .stub(df, 'downloadFile', () => downloadFileStub(downloadArgs))
      .stdout()
      .command(['grammars:export', '-P', projectId, '-E', entityName, '-f', filepath, '--overwrite'])
    .it('grammars:export provides human-readable output for given project and entity with overwriting filepath', (ctx) => {
      expect(downloadFileStub.calledWith(downloadArgs)).to.be.true
      const [firstLine] = ctx.stdout.split('\n').map(ln => ln.trim())
      expect(firstLine).to.contain(`exported to file ${filepath}`)
    })    
  }),
  
  describe('grammars:export handling of missing flags', () => {
    const projectId = '254'
    const entityName = 'entityName'
    
    test
      .stderr()
      .command(['grammars:export'])
      .catch(ctx => {
        expect(ctx.message).to.contain('Missing required flag')
      })
    .it('grammars:export errors out when no parameters supplied')

    test
      .stderr()
      .command(['grammars:export', '-P', projectId])
      .catch(ctx => {
        expect(ctx.message).to.contain('Missing required flag')
      })
    .it('grammars:export errors out when entityName not supplied')

    test
      .stderr()
      .command(['grammars:export', '-E', entityName])
      .catch(ctx => {
        expect(ctx.message).to.contain('Missing required flag')
      })
    .it('grammars:export errors out when projectId not supplied')
  })
})
