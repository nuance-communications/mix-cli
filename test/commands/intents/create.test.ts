/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {expect, test} from '@oclif/test'

const td = require('./intents-test-data')

const testEnvData = require('../../test-data')
const serverURL = `https://${testEnvData.server}`

const response = td.createIntentResponse

describe('intents:create', () => {
  test
    .env(testEnvData.env)
    .nock(serverURL, api => api
      .post(`/v4/projects/${td.request.project}/intents`)
      .reply(200, response)
    )
    .stdout()
    .command(['intents:create',
      '--project', td.request.project,
      '--name', td.request.intent])
    .it('creates a new intent', ctx => {
      expect(ctx.stdout).to.contain(`Intent ${response.intent.name} with ID ${response.intent.id} created`)
    })

  test
    .env(testEnvData.env)
    .stderr()
    .command(['intents:create'])
    .catch(ctx => {
      expect(ctx.message).to.contain('Missing required flag')
    })
    .it('errors out when no parameters supplied')

  test
    .env(testEnvData.env)
    .nock(serverURL, api => api
      .post(`/v4/projects/${td.request.project}/intents`, {intentName: '1234'})
      .reply(400, td.intentImpossibleNodeResponse)
    )
    .stdout()
    .command(['intents:create',
      '--project', td.request.project,
      '--name', td.request.invalidIntent])
    .catch(ctx => {
      console.error(ctx.message)
      expect(ctx.message).to.contain('One or more flags have invalid values')
    })
    .it('errors out when given an invalid intent name')

  test
    .env(testEnvData.env)
    .nock(serverURL, api => api
      .post(`/v4/projects/${td.request.unknownProject}/intents`)
      .reply(400, td.projectInvalidResponse)
    )
    .stdout()
    .command(['intents:create',
      '--project', td.request.unknownProject,
      '--name', td.request.intent])
    .catch(ctx => {
      expect(ctx.message).to.contain(`Project ${td.request.unknownProject} is not available`)
    })
    .it('errors out when given an invalid project ID')
})
