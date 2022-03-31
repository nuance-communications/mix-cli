/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {expect, test} from '@oclif/test'
import cli from "cli-ux"

const chai = require("chai")
const sinon = require("sinon")
const sinonChai = require("sinon-chai")
const strip = require("strip-ansi")

const td = require('./builds-test-data')

chai.should()
chai.use(sinonChai)

const testEnvData = require('../../test-data')
const serverURL = `https://${testEnvData.server}`

describe('builds:destroy', () => {
  const promptStub = sinon.stub()

  afterEach(() => {
    promptStub.reset()
  })

  test
    .env(testEnvData.env)
    .do(() => {
      promptStub.onFirstCall().resolves(td.request.buildLabel)
    })
    .stub(cli, 'prompt', () => promptStub)
    .nock(serverURL, api => api
      .delete(`/v4/builds/${td.request.buildLabel}`)
      .reply(200, td.getBuildResponse)
    )
    .stdout()
    .stderr()
    .command(['builds:destroy',
      `--build-label=${td.request.buildLabel}`])
    .it('deletes a build when passed a build label', ctx => {
      const promptMessages = promptStub.args.map(([msg]: any) => strip(msg))
      expect(promptMessages[0]).to.contain(`Confirm destroy action by typing`)
      expect(ctx.stdout).to.contain(`Build ${td.request.buildLabel} destroyed`)
    })

  test
    .env(testEnvData.env)
    .do(() => {
      promptStub.onFirstCall().resolves('no')
    })
    .stub(cli, 'prompt', () => promptStub)
    .stdout()
    .stderr()
    .command(['builds:destroy',
      `--build-label=${td.request.buildLabel}`])
    .it('aborts a build deletion when not confirmed by user', ctx => {
      expect(ctx.stdout).to.contain("Operation was not confirmed. Aborting...")
    })

  test
    .env(testEnvData.env)
    .nock(serverURL, api => api
      .delete(`/v4/builds/${td.request.buildLabel}`)
      .reply(200, td.getBuildResponse)
    )
    .stdout()
    .command(['builds:destroy',
      `--build-label=${td.request.buildLabel}`,
      `-c=${td.request.buildLabel}`])
    .it('proceeds with build deletion without warning when pre-confirmed by user', ctx => {
      expect(ctx.stdout).to.not.contain(`Consider making a backup of your project first.`)
      expect(ctx.stdout).to.contain(`Build ${td.request.buildLabel} destroyed`)
      promptStub.should.not.have.been.called
    })

  test
    .env(testEnvData.env)
    .do(() => {
      promptStub.onFirstCall().resolves(td.request.buildLabel)
    })
    .stub(cli, 'prompt', () => promptStub)
    .nock(serverURL, api => api
      .delete(`/v4/builds/${td.request.buildLabel}`)
      .reply(200, td.getBuildResponse)
    )
    .stdout()
    .stderr()
    .command(['builds:destroy',
      `--build-type=${td.flags.buildType}`,
      '--build-version=1',
      `-P=${td.request.projectId}`,
      `-c=${td.request.buildLabel}`])
    .it('deletes a build when passed individual parameters', ctx => {
      expect(ctx.stdout).to.contain(`Build ${td.request.buildLabel} destroyed`)
    })
})
