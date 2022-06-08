/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {expect, test} from '@oclif/test'


const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')

chai.should()
chai.use(sinonChai)

const td = require('./channels-test-data')
const testEnvData = require('../../test-data')
const serverURL = `https://${testEnvData.server}`
const endpoint = `/v4/projects/${td.request.projectId}/channels/${td.request.channelId}/.create`

describe('channels:create', () => {

  test
    .env(testEnvData.env)
    .stdout()
    .command(['channels:create',
    '--project', td.request.projectId,
    '--name', td.request.displayName,
    '--mode', 'BROKEN_MODE'
  ])
  .catch(ctx => {
    expect(ctx.message).to.contain('Unknown channel modality')
  })
  .it('errors out when an unknown channel mode is supplied')

  test
    .env(testEnvData.env)
    .stdout()
    .command(['channels:create',
    '--project', td.request.projectId,
    '--name', td.request.displayName,
    '--mode', 'dtmf',
    '--mode', 'rich_text',
    '--mode', 'dtmf'
  ])
  .catch(ctx => {
    expect(ctx.message).to.contain('Duplicate modality')
  })
  .it('errors out when a channel mode is supplied twice')

    // .nock(serverURL, api =>
    //   api
    //     .post(endpoint)
    //     .query({
    //       displayName: td.request.displayName
    //     })
    //     .reply(200, {/* TODO */})
    //   )
})