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

const td = require('./literals-test-data')
const testData = require ('../../test-data')
const serverURL = `https://${testData.server}`

const endpoints = {
  append: `/v4/projects/1922/entities/DrinkSize/literals/.append`,
  replace: `/v4/projects/1922/entities/DrinkSize/literals/.replace`,
}

const getHeaders = () => ({
  'Content-Type': 'multipart/form-data; boundary=--------------------------461709635804907982362641'
})

describe('literals:import command', () => {
  const promptStub = sinon.stub()
  const createFormStub = sinon.stub().returns({getHeaders})

  afterEach(() => {
    promptStub.reset()
  })

  after(() => {
    createFormStub.reset()
  })

  test
    .env(testData.env)
    .do(() => {
      promptStub.onFirstCall().resolves(td.append.flags.entity)
    })
    .stub(CliUx.ux, 'prompt', () => promptStub)
    .stderr()
    .stdout()
    .nock(serverURL, api => api
      .put(endpoints.append)
      .query({
        locale: td.append.flags.locale,
      })
      .reply(200, td.append.response.data)
    )
    .stub(CreateFormModule, 'createForm', createFormStub)
    .command(['literals:import',
      `-c=${td.append.flags.confirm}`,
      `-E=${td.append.flags['entity-name']}`,
      `-f=${td.append.flags.filepath}`,
      `-L=${td.append.flags.locale}`,
      `-P=${td.append.flags.project}`,
    ])
    .it('imports literals by appending them to a project', ctx => {
      const [firstLine] = ctx.stdout.split('\n').map(ln => ln.trim())
      expect(firstLine).to.contain('successfully queued')
    })

  test
    .env(testData.env)
    .do(() => {
      promptStub.onFirstCall().resolves(td.append.flags.entity)
    })
    .stub(CliUx.ux, 'prompt', () => promptStub)
    .stderr()
    .stdout()
    .nock(serverURL, api => api
      .post(endpoints.replace)
      .query({
        locale: td.replace.flags.locale,
      })
      .reply(200, td.replace.response.data)
    )
    .stub(CreateFormModule, 'createForm', createFormStub)
    .command(['literals:import',
      `-c=${td.replace.flags.confirm}`,
      `-E=${td.replace.flags['entity-name']}`,
      `-f=${td.replace.flags.filepath}`,
      `-L=${td.replace.flags.locale}`,
      `-P=${td.replace.flags.project}`,
      `--replace`,
    ])
    .it('imports literals by replacing them in a project', ctx => {
      const [firstLine] = ctx.stdout.split('\n').map(ln => ln.trim())
      expect(firstLine).to.contain('successfully queued')
    })
})
