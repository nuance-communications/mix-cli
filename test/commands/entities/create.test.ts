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

describe('entities:create', () => {
  test
    .env(testEnvData.env)
    .nock(serverURL, api => api
      .post(`/v4/projects/${td.request.project}/entities`)
      .reply(200, td.getEntityResponse)
    )
    .stdout()
    .command(['entities:create',
      '--entity-type', td.request.entityType,
      '--name', td.request.entity,
      '--project', td.request.project,
    ])
    .it('creates a new list entity', ctx => {
      expect(ctx.stdout).to.contain(`Entity ${td.request.entity} with ID ${td.getEntityResponse.entity.listEntity.id} created`)
    })

  test
    .env(testEnvData.env)
    .stderr()
    .command(['entities:create'])
    .catch(ctx => {
      expect(ctx.message).to.contain('Missing required flag')
    })
    .it('errors out when no parameters supplied')

  test
    .env(testEnvData.env)
    .stderr()
    .command(['entities:create',
      '--entity-type', 'regex',
      '--name', td.request.entity,
      '--project', td.request.project,
    ])
    .catch(ctx => {
      expect(ctx.message).to.contain('Regex entities require a pattern and a locale')
    })
    .it('errors out when mandatory parameters are missing to create a regex entity')

  test
    .env(testEnvData.env)
    .stderr()
    .command(['entities:create',
      '--entity-type', 'relational',
      '--name', td.request.entity,
      '--project', td.request.project,
    ])
    .catch(ctx => {
      expect(ctx.message).to.contain('Relational entities require has-a and/or is-a relation')
    })
    .it('errors out when mandatory parameters are missing to create a relational entity')

  test
    .env(testEnvData.env)
    .nock(serverURL, api => api
      .post(`/v4/projects/${td.request.project}/entities`, td.createListEntityBody)
      .reply(400, td.invalidEntityResponse)
    )
    .stdout()
    .command(['entities:create',
      '--entity-type', td.request.entityType,
      '--name', td.request.invalidEntity,
      '--project', td.request.project,
    ])
    .catch(ctx => {
      expect(ctx.message).to.contain('400 Bad Request')
    })
    .it('errors out when given unknown entity name to create')

  test
    .env(testEnvData.env)
    .nock(serverURL, api => api
      .post(`/v4/projects/${td.request.unknownProject}/entities`)
      .reply(400, td.projectInvalidResponse)
    )
    .stdout()
    .command(['entities:create',
      '--entity-type', td.request.entityType,
      '--name', td.request.entity,
      '--project', td.request.unknownProject,
    ])
    .catch(ctx => {
      expect(ctx.message).to.contain(`Project ${td.request.unknownProject} is not available`)
    })
    .it('errors out when given an invalid project ID')
})
