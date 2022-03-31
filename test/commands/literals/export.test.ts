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

const td = require('./literals-test-data')
const testData = require ('../../test-data')
const serverURL = `https://${testData.server}`

const endpoint = `/v4/projects/1922/entities/DrinkSize/literals/.export`

describe('literals:export command', () => {
  const downloadFileStub = sinon.stub().resolves(true)

  after(() => {
    downloadFileStub.reset()
  })

  test
    .env(testData.env)
    .stdout()
    .nock(serverURL, api => api
      .get(endpoint)
      .query({
        locales: td.export.flags.locale,
      })
      .reply(200, td.export.response)
    )
    .stub(df, 'downloadFile', () => downloadFileStub)
    .command(['literals:export',
      `-P=${td.export.flags.project.toString()}`,
      `-L=${td.export.flags.locale}`,
      `-E=${td.export.flags['entity-name']}`,
      `-f=${td.export.flags.filepath}`])
    .it('exports literals for a single-locale entity to file', ctx => {
      const [firstLine] = ctx.stdout.split('\n').map(ln => ln.trim())
      expect(firstLine).to.equal(`Entity literals exported to file ${td.export.flags.filepath}`)
    })
})
