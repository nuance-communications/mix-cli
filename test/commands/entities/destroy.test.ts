/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {expect, test} from '@oclif/test'
import {CliUx} from '@oclif/core'

const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')

chai.should()
chai.use(sinonChai)

const td = require('./entities-test-data')

const testEnvData = require('../../test-data')
const serverURL = `https://${testEnvData.server}`

describe('entities:destroy', () => {
  const promptStub = sinon.stub()

  test
    .env(testEnvData.env)
    .nock(serverURL, api => api
      .delete(`/v4/projects/${td.request.project}/entities/${td.request.entity}`)
      .reply(200)
    )
    .stdout()
    .command(['entities:destroy',
      '--confirm', td.request.entity,
      '--project', td.request.project,
      '--entity', td.request.entity
    ])
    .it('destroys an entity', ctx => {
      expect(ctx.stdout).to.contain(`Entity ${td.request.entity} was deleted`)
    })

  test
    .env(testEnvData.env)
    .stderr()
    .command(['entities:destroy'])
    .catch(ctx => {
      expect(ctx.message).to.contain('Missing required flag')
    })
    .it('errors out when no parameters supplied')

  test
    .env(testEnvData.env)
    .nock(serverURL, api => api
      .delete(`/v4/projects/${td.request.project}/entities/${td.request.unknownEntity}`)
      .reply(404, td.entityNotFoundResponse)
    )
    .stdout()
    .command(['entities:destroy',
      '--confirm', td.request.unknownEntity,
      '--project', td.request.project,
      '--entity', td.request.unknownEntity])
    .catch(ctx => {
      expect(ctx.message).to.contain('No entity found')
    })
    .it('errors out when given unknown entity name')

  test
    .env(testEnvData.env)
    .nock(serverURL, api => api
      .delete(`/v4/projects/${td.request.unknownProject}/entities/${td.request.entity}`)
      .reply(400, td.projectInvalidResponse)
    )
    .stdout()
    .command(['entities:destroy',
      '--confirm', td.request.entity,
      '--project', td.request.unknownProject,
      '--entity', td.request.entity,
    ])
    .catch(ctx => {
      expect(ctx.message).to.contain(`Project ${td.request.unknownProject} is not available`)
    })
    .it('errors out when given an invalid project ID')

  test
    .env(testEnvData.env)
    .do(() => {
        promptStub.onFirstCall().resolves('no')
      })
    .stub(CliUx.ux, 'prompt', () => promptStub)
    .stdout()
    .stderr()
    .command(['entities:destroy',
      '--project', td.request.project,
      '--entity', td.request.entity,
    ])
    .it('aborts an entity deletion when not confirmed by user', ctx => {
      expect(ctx.stdout).to.contain("Operation was not confirmed. Aborting...")
    })
})
