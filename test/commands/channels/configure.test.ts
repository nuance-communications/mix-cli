/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import { expect, test } from '@oclif/test'
const strip = require("strip-ansi")

const td = require('./channels-test-data')

const testEnvData = require('../../test-data')
const serverURL = `https://${testEnvData.server}`

describe('channels:configure', () => {
  test
    .env(testEnvData.env)
    .nock(serverURL, api => api
      .put(`/v4/projects/${td.configure.flags.project}/.channel`, td.configure.expectedBody)
      .reply(200, td.configure.expectedResult)
    )
    .stdout()
    .command(['channels:configure',
      '--project', td.configure.flags.project,
      '--channel', td.configure.flags.channel,
      '--color', td.configure.flags.color,
      ...td.configure.flags.modes.map((mode: string) => `--mode=${mode}`),
    ])
    .it('configures a project channel', ctx => {
      expect(ctx.stdout).to.contain(`Channel ${td.configure.expectedResult.channel.displayName} with ID ${td.configure.expectedResult.channel.id} was updated successfully.`)
    })

  test
    .env(testEnvData.env)
    .stderr()
    .command(['channels:configure',
      '--project', td.configure.flags.project,
      '--channel', td.configure.flags.channel,
      '--color', td.configure.flags.color,
      '--mode', 'INVALID_MODE',
    ])
    .catch(ctx => {
      expect(strip(ctx.message)).to.contain('Unknown channel mode INVALID_MODE supplied to command')
    })
    .it('errors out when given an unknown mode')

    test
    .env(testEnvData.env)
    .stderr()
    .command(['channels:configure',
      '--project', td.configure.flags.project,
      '--channel', td.configure.flags.channel,
      '--color', td.configure.flags.color,
      '--mode', 'dtmf',
      '--mode', 'dtmf',
    ])
    .catch(ctx => {
      expect(strip(ctx.message)).to.contain('Mode dtmf was supplied more than once')
    })
    .it('errors out when a mode is supplied twice')

    test
    .env(testEnvData.env)
    .stderr()
    .command(['channels:configure',
      '--project', td.configure.flags.project,
      '--channel', td.configure.flags.channel,
      '--mode', td.configure.flags.modes[0],
      '--color', 'INVALID_COLOR'
    ])
    .catch(ctx => {
      expect(strip(ctx.message)).to.contain('Unknown channel color supplied to command')
    })
    .it('errors out when given an unknown color')
})

