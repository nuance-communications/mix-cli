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

describe('entities:rename', () => {
  test
    .env(testEnvData.env)
    .nock(serverURL, api => api
      .put(`/v4/projects/${td.request.project}/entities/${td.request.entity}/.rename`)
      .reply(200, td.renameEntityResponse)
    )
    .stdout()
    .command(['entities:rename',
      '--entity', td.request.entity,
      '--new-name', td.request.newName,
      '--project', td.request.project,
    ])
    .it('renames an entity', ctx => {
      const {entity} = td.renameEntityResponse
      expect(ctx.stdout).to.contain(`Entity ${td.request.entity} successfully renamed to ${entity.listEntity.name}`)
    })

  test
    .env(testEnvData.env)
    .stderr()
    .command(['entities:rename'])
    .catch(ctx => {
      expect(ctx.message).to.contain('Missing required flag')
    })
    .it('errors out when no parameters supplied')

  // TODO: The backend currently returns 500 for an entity that does not exist
  // test
  //   .env(testEnvData.env)
  //   .nock(serverURL, api => api
  //     .put(`/v4/projects/${td.request.project}/entities/${td.request.unknownEntity}/.rename`)
  //     .reply(404, td.entityNotFoundResponse)
  //   )
  //   .stdout()
  //   .command(['entities:get', '--project', td.request.project, '--entity', td.request.unknownEntity])
  //   .catch(ctx => {
  //     expect(ctx.message).to.contain('No entity found')
  //   })
  //   .it('errors out when given unknown entity name')

  test
    .env(testEnvData.env)
    .nock(serverURL, api => api
      .put(`/v4/projects/${td.request.unknownProject}/entities/${td.request.entity}/.rename`)
      .reply(400, td.projectInvalidResponse)
    )
    .stdout()
    .command(['entities:rename',
      '--entity', td.request.entity,
      '--new-name', td.request.newName,
      '--project', td.request.unknownProject,
    ])
    .catch(ctx => {
      expect(ctx.message).to.contain(`Project ${td.request.unknownProject} is not available`)
    })
    .it('errors out when given an invalid project ID')
})
