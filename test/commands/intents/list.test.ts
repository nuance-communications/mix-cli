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

describe('intents:list', () => {
  test
    .env(testEnvData.env)
    .nock(serverURL, api => api
      .get(`/v4/projects/${td.request.project}/intents`)
      .reply(200, td.listIntentsResponse)
    )
    .stdout()
    .command(['intents:list', '--project', td.request.project])
    .it('lists intents', ctx => {
      const stdout = ctx.stdout.replace(/\s\s+/g, ' ')
      expect(stdout).to.contain('some-long-uuid-1 NO_INTENT true n/a')
    })

  test
    .env(testEnvData.env)
    .stderr()
    .command(['intents:list'])
    .catch(ctx => {
      expect(ctx.message).to.contain('Missing required flag')
    })
    .it('errors out when no parameters supplied')

  test
    .env(testEnvData.env)
    .nock(serverURL, api => api
      .get(`/v4/projects/${td.request.unknownProject}/intents`)
      .reply(400, td.projectInvalidResponse)
    )
    .stdout()
    .command(['intents:list', '--project', td.request.unknownProject])
    .catch(ctx => {
      expect(ctx.message).to.contain(`Project ${td.request.unknownProject} is not available`)
    })
    .it('errors out when given an invalid project ID')
})
