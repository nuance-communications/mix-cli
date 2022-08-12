/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {expect, test} from '@oclif/test'

const td = require('./entities-test-data')

const testEnvData = require('../../test-data')
const serverURL = `https://${testEnvData.server}`

describe('entities:list', () => {
  test
    .env(testEnvData.env)
    .nock(serverURL, api => api
      .get(`/v4/projects/${td.request.project}/entities`)
      .query({type: 'UNSPECIFIED'})
      .reply(200, td.listEntityResponse)
    )
    .stdout()
    .command(['entities:list',
      '--project', td.request.project,
    ])
    .it('gets a list of entities', ctx => {
      expect(ctx.stdout).to.match(/AND.*baseEntity.*385a68f5-b2e9-48f2-abe6-a5cfbe4456ea/)
    })

  test
    .env(testEnvData.env)
    .stderr()
    .command(['entities:list'])
    .catch(ctx => {
      expect(ctx.message).to.contain('Missing required flag')
    })
    .it('errors out when no parameters supplied')

  test
    .env(testEnvData.env)
    .nock(serverURL, api => api
      .get(`/v4/projects/${td.request.unknownProject}/entities`)
      .query({type: 'UNSPECIFIED'})
      .reply(400, td.projectInvalidResponse)
    )
    .stdout()
    .command(['entities:list',
      '--project', td.request.unknownProject,
    ])
    .catch(ctx => {
      expect(ctx.message).to.contain(`Project ${td.request.unknownProject} is not available`)
    })
    .it('errors out when given an invalid project ID')
})
