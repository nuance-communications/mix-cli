/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {expect, test} from '@oclif/test'

const td = require('./app-configs-test-data')
const {
  applicationId,
  buildTypes,
  useProjectDefault,
  useLatestFromProject,
} = td.create.flags

const testEnvData = require('../../test-data')
const serverURL = `https://${testEnvData.server}`
const endpoint = `/v4/apps/${applicationId}/app-configs`


describe('app-configs:create', () => {
  test
    .env(testEnvData.env)
    .nock(serverURL, (api) =>
      api
        .post(endpoint,{
          dataHosts: [],
          deploymentFlowId: '66',
          tag: 'TAG_22',
          builds: {}
        })
        .query({
          buildTypes,
          useProjectDefault,
          useLatestFromProject,
        })
        .reply(200, td.create.response.data)
      )
    .stdout()
    .command(['app-configs:create',
      '-M=62',
      '-D=66',
      '-T=TAG_22',
      '-P=1922',
      '--with-build-type=asr',
    ])
    .it('creates an application configuration', ctx => {
      const {id, tag} = td.create.response.data.config
      const [firstLine] = ctx.stdout.split('\n')
      expect(firstLine).to.contain(`Application configuration with tag "${tag}" and ID ${id} created.`)
    })
})
