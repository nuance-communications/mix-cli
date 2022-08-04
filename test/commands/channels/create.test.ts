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
const endpoint = `/v4/projects/${td.request.projectId}/channels`

describe('channels:create', () => {
  // suppress "color not supplied" warnings
  before(() => {sinon.stub(console, 'error')})
  test
    .env(testEnvData.env)
    .stdout()
    .command(['channels:create',
    '--project', td.request.projectId,
    '--name', td.request.displayName,
    '--mode', 'BROKEN_MODE'
  ])
  .catch(ctx => {
    expect(ctx.message).to.contain('Unknown channel mode supplied to command')
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
    expect(ctx.message).to.contain('Mode dtmf was supplied more than once')
  })
  .it('errors out when a channel mode is supplied twice')


  test
    .env(testEnvData.env)
    .stdout()
    .nock(serverURL, api =>
      api
        .post(endpoint, {
          displayName: td.request.displayName,
          modes: ['DTMF'],
          color: 'LIGHT_PINK',
        })
        .reply(200, td.response)
      )
    .command(['channels:create',
    '--project', td.request.projectId,
    '--name', td.request.displayName,
    '--mode', 'dtmf',
    '--color', 'LIGHT_PINK',
    '--json'
  ])
  .it('successfully creates a channel and outputs JSON', ctx => {
    expect(JSON.parse(ctx.stdout).channel).to.deep.equal(td.response.channel)
  })
})
