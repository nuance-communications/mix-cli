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

describe('entities:configure', () => {
  test
    .env(testEnvData.env)
    .nock(serverURL, api => api
      .put(`/v4/projects/${td.request.project}/entities/${td.request.entity}`, td.configureListEntityBody)
      .reply(200, td.getEntityResponse)
    )
    .stdout()
    .command(['entities:configure',
      '--data-type', 'not-set',
      '--entity', td.request.entity,
      '--entity-type', td.request.entityType,
      '--project', td.request.project,
    ])
    .it('configures a list entity', ctx => {
      expect(ctx.stdout).to.contain(`Entity ${td.request.entity} with ID ${td.getEntityResponse.entity.listEntity.id} was updated`)
    })

  test
    .env(testEnvData.env)
    .stderr()
    .command(['entities:configure'])
    .catch(ctx => {
      expect(ctx.message).to.contain('Missing required flag')
    })
    .it('errors out when no parameters supplied')

  test
    .env(testEnvData.env)
    .stderr()
    .command(['entities:configure',
      '--entity', td.request.entity,
      '--entity-type', 'regex',
      '--project', td.request.project,
    ])
    .catch(ctx => {
      expect(ctx.message).to.contain('Regex entities require a pattern and a locale')
    })
    .it('errors out when mandatory parameters are missing to create a regex entity')

  test
    .env(testEnvData.env)
    .nock(serverURL, api => api
      .put(`/v4/projects/${td.request.project}/entities/${td.request.entity}`, td.configureRelationalEntityBody)
      .reply(200, td.getEntityResponse)
    )
    .stdout()
    .command(['entities:configure',
      '--data-type', 'not-set',
      '--entity', td.request.entity,
      '--entity-type', 'relational',
      '--project', td.request.project,
    ])
    .it('configures a relational entity', ctx => {
      expect(ctx.stdout).to.contain(`Entity ${td.request.entity} with ID ${td.getEntityResponse.entity.listEntity.id} was updated`)
    })

  test
    .env(testEnvData.env)
    .nock(serverURL, api => api
      .put(`/v4/projects/${td.request.project}/entities/${td.request.invalidEntity}`, td.configureListEntityBody)
      .reply(400, td.invalidEntityResponse)
    )
    .stdout()
    .command(['entities:configure',
      '--data-type', 'not-set',
      '--entity', td.request.invalidEntity,
      '--entity-type', td.request.entityType,
      '--project', td.request.project,
    ])
    .catch(ctx => {
      expect(ctx.message).to.contain('400 Bad Request')
    })
    .it('errors out when given unknown entity name to configure')

  test
    .env(testEnvData.env)
    .nock(serverURL, api => api
      .put(`/v4/projects/${td.request.unknownProject}/entities/${td.request.entity}`, td.configureListEntityBody)
      .reply(400, td.projectInvalidResponse)
    )
    .stdout()
    .command(['entities:configure',
      '--data-type', 'not-set',
      '--entity', td.request.entity,
      '--entity-type', td.request.entityType,
      '--project', td.request.unknownProject,
    ])
    .catch(ctx => {
      expect(ctx.message).to.contain(`Project ${td.request.unknownProject} is not available`)
    })
    .it('errors out when given an invalid project ID')
})
