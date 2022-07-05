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

describe('entities:get', () => {
  test
    .env(testEnvData.env)
    .nock(serverURL, api => api
      .get(`/v4/projects/${td.request.project}/entities/${td.request.entity}`)
      .reply(200, td.getEntityResponse)
    )
    .stdout()
    .command(['entities:get',
      '--entity', td.request.entity,
      '--project', td.request.project,
    ])
    .it('gets entity details', ctx => {
      expect(ctx.stdout).to.contain('EntityId: some-long-uuid')
      expect(ctx.stdout).to.contain('Name: DrinkSize')
      expect(ctx.stdout).to.contain('IsDynamic: false')
      expect(ctx.stdout).to.contain('NumLiterals: 9')
      expect(ctx.stdout).to.contain('IsSensitive: false')
      expect(ctx.stdout).to.contain('Canonicalize: true')
    })

  test
    .env(testEnvData.env)
    .stderr()
    .command(['entities:get'])
    .catch(ctx => {
      expect(ctx.message).to.contain('Missing required flag')
    })
    .it('errors out when no parameters supplied')

  test
    .env(testEnvData.env)
    .nock(serverURL, api => api
      .get(`/v4/projects/${td.request.project}/entities/${td.request.unknownEntity}`)
      .reply(404, td.entityNotFoundResponse)
    )
    .stdout()
    .command(['entities:get',
      '--entity', td.request.unknownEntity,
      '--project', td.request.project,
    ])
    .catch(ctx => {
      expect(ctx.message).to.contain('Unrecognized node')
    })
    .it('errors out when given unknown entity name')

  test
    .env(testEnvData.env)
    .nock(serverURL, api => api
      .get(`/v4/projects/${td.request.unknownProject}/entities/${td.request.entity}`)
      .reply(400, td.projectInvalidResponse)
    )
    .stdout()
    .command(['entities:get',
      '--entity', td.request.entity,
      '--project', td.request.unknownProject,
    ])
    .catch(ctx => {
      expect(ctx.message).to.contain(`Project ${td.request.unknownProject} is not available`)
    })
    .it('errors out when given an invalid project ID')
})
