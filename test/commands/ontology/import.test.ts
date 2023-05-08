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

const td = require('./ontology-test-data')
const testData = require ('../../test-data')
const serverURL = `https://${testData.server}`

const endpoint = `/v4/projects/1922/ontology/.append`

const getHeaders = () => ({
  'Content-Type': 'multipart/form-data; boundary=--------------------------461709635804907982362641'
})

describe('ontology:import command', () => {
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
      promptStub.onFirstCall().resolves(td.import.flags.project.toString())
    })
    .stub(CliUx.ux, 'prompt', () => promptStub)
    .stderr()
    .stdout()
    .nock(serverURL, api => api
      .put(endpoint)
      .reply(200, td.import.response.data)
    )
    .stub(CreateFormModule, 'createForm', createFormStub)
    .command(['ontology:import', '-P', td.import.flags.project.toString(),
      `-f=${td.import.flags.filepath}`])
    .it('imports an ontology into a project', ctx => {
      expect(ctx.stdout).to.contain('successfully queued')
    })
})
