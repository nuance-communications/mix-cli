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

describe('intents:get', () => {
  test
    .env(testEnvData.env)
    .nock(serverURL, api => api
      .get(`/v4/projects/${td.request.project}/intents/${td.request.intent}`)
      .reply(200, td.getIntentResponse)
    )
    .stdout()
    .command(['intents:get',
      '--project', td.request.project,
      '--intent', td.request.intent,
    ])
    .it('gets intent details', ctx => {
      expect(ctx.stdout).to.contain('IntentId: some-long-uuid')
      expect(ctx.stdout).to.contain('Name: ORDER_DRINK')
      expect(ctx.stdout).to.contain('IsInBaseOntology: false')
      expect(ctx.stdout).to.contain('EntityLinks: CoffeeType,DrinkSize')
    })

  test
    .env(testEnvData.env)
    .stderr()
    .command(['intents:get'])
    .catch(ctx => {
      expect(ctx.message).to.contain('Missing required flag')
    })
    .it('errors out when no parameters supplied')

  test
    .env(testEnvData.env)
    .nock(serverURL, api => api
      .get(`/v4/projects/${td.request.project}/intents/${td.request.unknownIntent}`)
      .reply(404, td.intentNotFoundResponse)
    )
    .stdout()
    .command(['intents:get',
      '--project', td.request.project,
      '--intent', td.request.unknownIntent
    ])
    .catch(ctx => {
      expect(ctx.message).to.contain('No intent found')
    })
    .it('errors out when given unknown intent name')

  test
    .env(testEnvData.env)
    .nock(serverURL, api => api
      .get(`/v4/projects/${td.request.unknownProject}/intents/${td.request.intent}`)
      .reply(400, td.projectInvalidResponse)
    )
    .stdout()
    .command(['intents:get',
      '--project', td.request.unknownProject,
      '--intent', td.request.intent
    ])
    .catch(ctx => {
      expect(ctx.message).to.contain(`Project ${td.request.unknownProject} is not available`)
    })
    .it('errors out when given an invalid project ID')
})
