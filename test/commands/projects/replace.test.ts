/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {CliUx} from '@oclif/core'
import {PrettyPrintableError} from '@oclif/core/lib/errors'
import {expect, test} from '@oclif/test'

import * as CreateFormModule from '../../../src/mix/api/utils/create-form'

const chai = require("chai")
const sinon = require("sinon")
const sinonChai = require("sinon-chai")
const strip = require("strip-ansi")

chai.should()
chai.use(sinonChai)

const td = require('./projects-test-data')
const testEnvData = require('../../test-data')
const serverURL = `https://${testEnvData.server}`

const getHeaders = () => ({
  'Content-Type': 'multipart/form-data; boundary=--------------------------461709635804907982362641'
})

describe('projects:replace', () => {
  const promptStub = sinon.stub()
  const createFormStub = sinon.stub().returns({getHeaders})

  afterEach(() => {
    promptStub.reset()
  })

  after(() => {createFormStub.reset()})

  test
    .env(testEnvData.env)
    .do(() => {
      promptStub.onFirstCall().resolves(td.replace.flags.confirm)
    })
    .stub(CliUx.ux, 'prompt', () => promptStub)
    .nock(serverURL, api => api
      .post(`/v4/projects/${td.replace.flags.project}/.replace`)
      .reply(200, td.replace.response.data)
    )
    .stub(CreateFormModule, 'createForm', createFormStub)
    .stdout()
    .stderr()
    .command(['projects:replace',
      `-P=${td.replace.flags.project}`,
      `-f=${td.replace.flags.filepath}`,
    ])
    .it('replaces a project after confirmation', ctx => {
      const promptMessages = promptStub.args.map(([msg]: any) => strip(msg))
      expect(promptMessages[0]).to.contain(`Confirm replace action by typing ${td.replace.flags.project} ('no' to abort)`)
      expect(ctx.stdout).to.contain(' successfully queued')
    })

  test
    .env(testEnvData.env)
    .do(() => {
      promptStub.onFirstCall().resolves('no')
    })
    .stub(CliUx.ux, 'prompt', () => promptStub)
    .stdout()
    .stderr()
    .command(['projects:replace',
      `-P=${td.replace.flags.project}`,
      `-f=${td.replace.flags.filepath}`,
    ])
    .it('aborts a project replacement when not confirmed by user', ctx => {
      expect(ctx.stdout).to.contain("Operation was not confirmed. Aborting...")
    })

  test
    .env(testEnvData.env)
    .nock(serverURL, api => api
      .post(`/v4/projects/${td.replace.flags.project}/.replace`)
      .reply(200, td.replace.response.data)
    )
    .stub(CreateFormModule, 'createForm', createFormStub)
    .stdout()
    .command(['projects:replace',
      `-P=${td.replace.flags.project}`,
      `-c=${td.replace.flags.project}`,
      `-f=${td.replace.flags.filepath}`,
    ])
    .it('proceeds with project replacement without warning when pre-confirmed by user', ctx => {
      expect(ctx.stdout).to.not.contain(`Consider capturing a backup before proceeding with this replace operation.`)
      expect(ctx.stdout).to.contain(' successfully queued')
      promptStub.should.not.have.been.called
    })

  test
    .env(testEnvData.env)
    .stderr()
    .command(['projects:replace',
      `-P=${td.replace.flags.project}`
    ])
    .catch(ctx => {
      const err = ctx as PrettyPrintableError
      expect(err.message).to.contain(`Missing required flag filepath`)
    })
    .it('errors out when no parameters are supplied')

  test
    .env(testEnvData.env)
    .stderr()
    .command(['projects:replace',
      `-f=${td.replace.flags.filepath}`
    ])
    .catch(ctx => {
      const err = ctx as PrettyPrintableError
      expect(err.message).to.contain(`Missing required flag project`)
    })
    .it('errors out when project ID is not supplied')
})
