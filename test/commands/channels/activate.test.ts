/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {expect, test} from '@oclif/test'
import strip from 'strip-ansi'

 const chai = require('chai')
 const sinon = require ('sinon')
 const sinonChai = require('sinon-chai')

 chai.should()
 chai.use(sinonChai)

 const td = require('./channels-test-data')
 const testEnvData = require('../../test-data')
 const serverURL = `https://${testEnvData.server}`

describe('channels:activate', () => {
  test
    .env(testEnvData.env)
    .nock(serverURL, api => api
        .put(`/v4/projects/${td.request.projectId}/channels/${td.request.channel}/.activate`, {})
        .reply(200)
      )
    .stdout()
    .command(['channels:activate', 
      '--project', td.request.projectId,
      '--channel', td.request.channel,
  ])
  .it('activates a channel', ctx => {
    expect(strip(ctx.stdout)).to.contain(`Channel with ID ${td.request.channel} activated successfully`)
  })
})