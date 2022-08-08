/*
  * Copyright 2022, Nuance, Inc. and its contributors.
  * All rights reserved.
  *
  * This source code is licensed under the Apache-2.0 license found in
  * the LICENSE file in the root directory of this source tree.
  */

import {expect, test} from '@oclif/test'
import cli from 'cli-ux'

const chai = require('chai')
const sinon = require ('sinon')
const sinonChai = require('sinon-chai')

chai.should()
chai.use(sinonChai)

const td = require('./channels-test-data')
const testEnvData = require('../../test-data')
const serverURL = `https://${testEnvData.server}`

describe('channels:deactivate', () => {
  const promptStub = sinon.stub()

  test
    .env(testEnvData.env)
    .nock(serverURL, api => api
        .put(`/v4/projects/${td.request.projectId}/channels/${td.request.channel}/.deactivate`,
          {}
        )
        .reply(200)
      )
    .do(() => {
      promptStub.onFirstCall().resolves(td.request.channel)
    })
    .stub(cli, 'prompt', () => promptStub)
    .stdout()
    .stderr()
    .command(['channels:deactivate',
      '--project', td.request.projectId,
      '--channel', td.request.channel,
  ])
  .it('deactivates a channel with interactive confirmation', ctx => {
    expect(ctx.stdout).to.contain("Channel deactivated successfully.")
  })

  test
    .env(testEnvData.env)
    .do(() => {
      promptStub.onFirstCall().resolves('no')
    })
    .stub(cli, 'prompt', () => promptStub)
    .stdout()
    .stderr()
    .command(['channels:deactivate',
      '--project', td.request.projectId,
      '--channel', td.request.channel,
  ])
  .it('aborts deactivating channel when confirmation fails', ctx => {
    expect(ctx.stdout).to.contain("Operation was not confirmed. Aborting...")
  })
})