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

const td = require('./samples-test-data').export
const testData = require ('../../test-data')
const serverURL = `https://${testData.server}`

const endpoint = `/v4/projects/1922/intents/ORDER_DRINK/samples/.export`

describe('samples:export command', () => {
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
        locales: td.request.params.locales,
      })
      .reply(200, td.response)
    )
    .stub(df, 'downloadFile', () => downloadFileStub)
    .command(['samples:export',
      `-P=${td.flags.project}`,
      `-L=${td.flags.locale}`,
      `-I=${td.flags['intent-name']}`,
      `-f=${td.flags.filepath}`])
    .it('exports samples for a single-locale to file', ctx => {
      const [firstLine] = ctx.stdout.split('\n').map(ln => ln.trim())
      expect(firstLine).to.equal(`Sample sentences exported to file ${td.flags.filepath}`)
    })
})
