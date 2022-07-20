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

describe('intents:rename', () => {
  test
    .env(testEnvData.env)
    .nock(serverURL, api => api
      .put(`/v4/projects/${td.request.project}/intents/${td.request.intent}/.rename`)
      .reply(200, td.renameIntentResponse)
    )
    .stdout()
    .command(['intents:rename',
      '--intent', td.request.intent,
      '--name', td.request.newName,
      '--project', td.request.project,
    ])
    .it('renames an intent', ctx => {
      const {intent} = td.renameIntentResponse
      expect(ctx.stdout).to.contain(`Intent ${td.request.intent} successfully renamed to ${intent.name}`)
    })

  test
    .env(testEnvData.env)
    .stderr()
    .command(['intents:rename'])
    .catch(ctx => {
      expect(ctx.message).to.contain('Missing required flag')
    })
    .it('errors out when no parameters supplied')

  // TODO: The backend currently returns 500 for an intent that does not exist
  // test
  //   .env(testEnvData.env)
  //   .nock(serverURL, api => api
  //     .put(`/v4/projects/${td.request.project}/intents/${td.request.unknownIntent}/.rename`)
  //     .reply(404, td.intentNotFoundResponse)
  //   )
  //   .stdout()
  //   .command(['intents:get', '--project', td.request.project, '--intent', td.request.unknownIntent])
  //   .catch(ctx => {
  //     expect(ctx.message).to.contain('No intent found')
  //   })
  //   .it('errors out when given unknown intent name')

  test
    .env(testEnvData.env)
    .nock(serverURL, api => api
      .put(`/v4/projects/${td.request.unknownProject}/intents/${td.request.intent}/.rename`)
      .reply(400, td.projectInvalidResponse)
    )
    .stdout()
    .command(['intents:rename',
      '--intent', td.request.intent,
      '--name', td.request.newName,
      '--project', td.request.unknownProject,
    ])
    .catch(ctx => {
      expect(ctx.message).to.contain(`Project ${td.request.unknownProject} is not available`)
    })
    .it('errors out when given an invalid project ID')
})
