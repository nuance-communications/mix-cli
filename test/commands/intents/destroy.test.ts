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
const sinon = require('sinon')
const sinonChai = require('sinon-chai')

chai.should()
chai.use(sinonChai)

const td = require('./intents-test-data')

const testEnvData = require('../../test-data')
const serverURL = `https://${testEnvData.server}`

describe('intents:destroy', () => {
  const promptStub = sinon.stub()

  test
    .env(testEnvData.env)
    .nock(serverURL, api => api
      .delete(`/v4/projects/${td.request.project}/intents/${td.request.intent}`)
      .reply(200)
    )
    .stdout()
    .command(['intents:destroy',
      '--confirm', td.request.intent,
      '--project', td.request.project,
      '--intent', td.request.intent
    ])
    .it('destroys an intent', ctx => {
      expect(ctx.stdout).to.contain(`Intent ${td.request.intent} was deleted`)
    })

  test
    .env(testEnvData.env)
    .stderr()
    .command(['intents:destroy'])
    .catch(ctx => {
      expect(ctx.message).to.contain('Missing required flag')
    })
    .it('errors out when no parameters supplied')

  test
    .env(testEnvData.env)
    .nock(serverURL, api => api
      .delete(`/v4/projects/${td.request.project}/intents/${td.request.unknownIntent}`)
      .reply(404, td.intentNotFoundResponse)
    )
    .stdout()
    .command(['intents:destroy',
      '--confirm', td.request.unknownIntent,
      '--project', td.request.project,
      '--intent', td.request.unknownIntent,
    ])
    .catch(ctx => {
      expect(ctx.message).to.contain('No intent found')
    })
    .it('errors out when given unknown intent name')

  test
    .env(testEnvData.env)
    .nock(serverURL, api => api
      .delete(`/v4/projects/${td.request.unknownProject}/intents/${td.request.intent}`)
      .reply(400, td.projectInvalidResponse)
    )
    .stdout()
    .command(['intents:destroy',
      '--confirm', td.request.intent,
      '--project', td.request.unknownProject,
      '--intent', td.request.intent,
    ])
    .catch(ctx => {
      expect(ctx.message).to.contain(`Project ${td.request.unknownProject} is not available`)
    })
    .it('errors out when given an invalid project ID')

  test
    .env(testEnvData.env)
    .do(() => {
        promptStub.onFirstCall().resolves('no')
      })
    .stub(cli, 'prompt', () => promptStub)
    .stdout()
    .stderr()
    .command(['intents:destroy',
      '--project', td.request.project,
      '--intent', td.request.intent
    ])
    .it('aborts an intent deletion when not confirmed by user', ctx => {
      expect(ctx.stdout).to.contain("Operation was not confirmed. Aborting...")
    })
})
