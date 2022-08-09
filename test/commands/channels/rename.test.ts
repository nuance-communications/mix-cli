/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import { expect, test } from '@oclif/test'

const td = require('./channels-test-data')
// for endpoint construction
const { projectId, channel: channelId } = td.request

const testEnvData = require('../../test-data')
const serverURL = `https://${testEnvData.server}`
const endpoint = `/v4/projects/${projectId}/channels/${channelId}/.rename`


describe('channels:rename', () => {
  const { projectId, channel, displayName} = td.request

  test
    .env(testEnvData.env)
    .nock(serverURL, (api) =>
      api
        .put(endpoint, {
          displayName
        })
        .reply(200, { displayName })
    )
    .stdout()
    .command(['channels:rename',
      '--project',  projectId,
      '--channel', channel,
      '--new-name', displayName,
      '--json'])
    .it('receives JSON confirmation of renamed channel', ctx => {
      const response = JSON.parse(ctx.stdout)
      expect(response).to.deep.equal({ displayName })
    })
})
