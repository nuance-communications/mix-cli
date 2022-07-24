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

describe('entities:convert', () => {
  test
    .env(testEnvData.env)
    .nock(serverURL, api => api
      .put(`/v4/projects/${td.request.project}/entities/${td.request.entity}/.type`, {newType: 'FREEFORM'})
      .reply(200, td.convertEntityResponse)
    )
    .stdout()
    .command(['entities:convert',
      '--entity', td.request.entity,
      '--project', td.request.project,
      '--to-entity-type', td.request.newEntityType,
    ])
    .it('converts a list entity to a freeform entity', ctx => {
      expect(ctx.stdout).to.contain(`Entity ${td.request.entity} with ID ${td.convertEntityResponse.entity.freeformEntity.id} was converted`)
    })
  
  test
    .env(testEnvData.env)
    .nock(serverURL, api => api
      .put(`/v4/projects/${td.request.project}/entities/${td.request.entity}/.type`, {
        newType: 'REGEX',
        pattern: '\d{10}',
      })
      .reply(200, td.convertEntityToRegexResponse)
    )
    .stdout()
    .command(['entities:convert',
      '--entity', td.request.entity,
      '--pattern', '\d{10}',
      '--project', td.request.project,
      '--to-entity-type', 'regex',
    ])
    .it('converts a list entity to a regex entity', ctx => {
      expect(ctx.stdout).to.contain(`Entity ${td.request.entity} with ID ${td.convertEntityToRegexResponse.entity.regexEntity.id} was converted`)
    })

  test
    .env(testEnvData.env)
    .stderr()
    .command(['entities:convert'])
    .catch(ctx => {
      expect(ctx.message).to.contain('Missing required flag')
    })
    .it('errors out when no parameters supplied to convert the entity')

  test
    .env(testEnvData.env)
    .stderr()
    .command(['entities:convert',
      '--entity', td.request.entity,
      '--project', td.request.project,
      '--to-entity-type', 'regex',
    ])
    .catch(ctx => {
      expect(ctx.message).to.contain('Converting to a Regex entity requires a pattern.')
    })
    .it('errors out when mandatory parameters are missing to convert to a regex entity')

  test
    .env(testEnvData.env)
    .stderr()
    .command(['entities:convert',
      '--entity', td.request.entity,
      '--project', td.request.project,
      '--to-entity-type', 'relational',
    ])
    .catch(ctx => {
      expect(ctx.message).to.contain('Relational entities require has-a and/or is-a relation')
    })
    .it('errors out when mandatory parameters are missing to convert to a relational entity')

  test
    .env(testEnvData.env)
    .nock(serverURL, api => api
      .put(`/v4/projects/${td.request.project}/entities/${td.request.invalidEntity}/.type`, {newType: 'FREEFORM'})
      .reply(400, td.invalidEntityResponse)
    )
    .stdout()
    .command(['entities:convert',
      '--entity', td.request.invalidEntity,
      '--project', td.request.project,
      '--to-entity-type', 'freeform',
    ])
    .catch(ctx => {
      expect(ctx.message).to.contain('400 Bad Request')
    })
    .it('errors out when given unknown entity name to convert')

  test
    .env(testEnvData.env)
    .nock(serverURL, api => api
      .put(`/v4/projects/${td.request.unknownProject}/entities/${td.request.entity}/.type`, {newType: 'FREEFORM'})
      .reply(400, td.projectInvalidResponse)
    )
    .stdout()
    .command(['entities:convert',
      '--entity', td.request.entity,
      '--project', td.request.unknownProject,
      '--to-entity-type', 'freeform',
    ])
    .catch(ctx => {
      expect(ctx.message).to.contain(`Project ${td.request.unknownProject} is not available`)
    })
    .it('errors out when given an invalid project ID')
})
