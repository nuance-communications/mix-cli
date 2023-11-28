/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {CliUx} from '@oclif/core'
import {expect, test} from '@oclif/test'

import * as CreateFormModule from '../../../src/mix/api/utils/create-form'

const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')

chai.should()
chai.use(sinonChai)

const td = require('./samples-test-data')
const testData = require ('../../test-data')
const serverURL = `https://${testData.server}`

const endpoints = {
  append: `/v4/projects/1922/intents/ORDER_DRINK/samples/.append`,
  replace: `/v4/projects/1922/intents/ORDER_DRINK/samples/.replace`,
}

const form = new FormData() as any
form.append('file', Buffer.alloc(10))
form.getHeaders = () => {}

describe('samples:import command', () => {
  const promptStub = sinon.stub()
  const createFormStub = sinon.stub().returns(form)

  afterEach(() => {
    promptStub.reset()
  })

  test
    .env(testData.env)
    .do(() => {
      promptStub.onFirstCall().resolves(td.append.flags.intent)
    })
    .stub(CliUx.ux, 'prompt', () => promptStub)
    .stdout()
    .nock(serverURL, api => api
      .put(endpoints.append)
      .query({
        locale: td.append.flags.locale,
      })
      .reply(200, td.append.response.data)
    )
    .stub(CreateFormModule, 'createForm', createFormStub)
    .command(['samples:import',
      `-c=${td.replace.flags.confirm}`,
      `-f=${td.append.flags.filepath}`,
      `-I=${td.append.flags['intent-name']}`,
      `-L=${td.append.flags.locale}`,
      `-P=${td.append.flags.project}`,
    ])
    .it('imports samples by appending them to a project', ctx => {
      const [firstLine] = ctx.stdout.split('\n').map(ln => ln.trim())
      expect(firstLine).to.contain('successfully queued')
    })

  test
    .env(testData.env)
    .do(() => {
      promptStub.onFirstCall().resolves(td.append.flags.intent)
    })
    .stub(CliUx.ux, 'prompt', () => promptStub)
    .stdout()
    .nock(serverURL, api => api
      .post(endpoints.replace)
      .query({
        locale: td.replace.flags.locale,
      })
      .reply(200, td.replace.response.data)
    )
    .stub(CreateFormModule, 'createForm', createFormStub)
    .command(['samples:import',
      `-c=${td.replace.flags.confirm}`,
      `-f=${td.replace.flags.filepath}`,
      `-I=${td.replace.flags['intent-name']}`,
      `-L=${td.replace.flags.locale}`,
      `-P=${td.replace.flags.project}`,
      `--replace`,
    ])
    .it('imports samples by replacing them in a project', ctx => {
      const [firstLine] = ctx.stdout.split('\n').map(ln => ln.trim())
      expect(firstLine).to.contain('successfully queued')
    })
})
