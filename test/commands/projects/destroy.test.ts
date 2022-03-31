/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {expect, test} from '@oclif/test'
import cli from 'cli-ux'

import {PrettyPrintableError} from "@oclif/errors"

const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')

chai.should()
chai.use(sinonChai)

const td = require('./projects-test-data')
const testData = require ('../../test-data')
const serverURL = `https://${testData.server}`

const endpoint = `/v4/projects/1922`

describe('projects:destroy command', () => {
  const promptStub = sinon.stub()

  test
    .env(testData.env)
    .stdout()
    .nock(serverURL, api => api
      .delete(endpoint)
      .reply(200, td.destroy.response.data)
    )
    .command(['projects:destroy',
      `-c=${td.destroy.flags.project}`,
      `-P=${td.destroy.flags.project}`,
    ])
    .it('destroys a project with pre-confirmation', ctx => {
      const [firstLine, secondLine] = ctx.stdout.split('\n').map(ln => ln.trim())
      expect(firstLine).to.equal(`Project ${td.destroy.flags.project} was deleted.`)
    })

  test
    .env(testData.env)
    .stderr()
    .command(['projects:destroy'])
    .catch(ctx => {
      const err = ctx as PrettyPrintableError
      expect(err.message).to.contain('Missing required flag:\n -P, --project PROJECT')
    })
    .it('errors out when no parameters supplied')

  test
    .env(testData.env)
    .do(() => {
        promptStub.onFirstCall().resolves('no')
      })
    .stub(cli, 'prompt', () => promptStub)
    .stdout()
    .stderr()
    .command(['projects:destroy',
      `-P=${td.destroy.flags.project}`
    ])
    .it('aborts a project deletion when not confirmed by user', ctx => {
      expect(ctx.stdout).to.contain("Operation was not confirmed. Aborting...")
    })
})
