/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {expect, test} from '@oclif/test'

const td = require('./channels-test-data')
// for endpoint construction
const {project: projectId, channel: channelId} = td.rename.flags

const testEnvData = require('../../test-data')
const serverURL = `https://${testEnvData.server}`
const endpoint = `/v4/projects/${projectId}/channels/${channelId}/.rename`


describe('channels:rename', () => {
    const {project, channel, 'new-name': newName} = td.rename.flags

    test
      .env(testEnvData.env)
      .nock(serverURL, (api) => 
          api
            .put(endpoint, {
                displayName: newName
            })
            .reply(200, td.rename.response.data)
      )
      .stdout()
      .command(['channels:rename',
       '--project=' + project,
       '--channel=' + channel,
       '--new-name=' + newName, 
       '--json'])
      .it('receives JSON confirmation of renamed channel', ctx => {
          const response = JSON.parse(ctx.stdout)
          expect(response).to.deep.equal({displayName: newName})
      })
})
