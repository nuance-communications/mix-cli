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
      ...td.configure.flags.modes.map((mode: string) => `--mode=${mode}`),
      '--color', td.configure.flags.color,
    ])
    .it('configures a project channel', ctx => {
      expect(ctx.stdout).to.contain(`Channel ${td.configure.expectedResult.channel.displayName} (id: ${td.configure.expectedResult.channel.id}) updated successfully.`)
    })

  test
    .env(testEnvData.env)
    .stderr()
    .command(['channels:configure',
      '--project', td.configure.flags.project,
      '--channel', td.configure.flags.channel,
      '--mode', 'GARBAGE',
    ])
    .catch(ctx => {
      expect(strip(ctx.message)).to.contain('Unknown mode GARBAGE')
    })
    .it('errors out when given an unknown mode')

    test
    .env(testEnvData.env)
    .stderr()
    .command(['channels:configure',
      '--project', td.configure.flags.project,
      '--channel', td.configure.flags.channel,
    ])
    .catch(ctx => {
      expect(strip(ctx.message)).to.contain('At least one of --mode and --color must be set')
    })
    .it('errors out when not given anything to configure')

    test
    .env(testEnvData.env)
    .stderr()
    .command(['channels:configure',
      '--project', td.configure.flags.project,
      '--channel', td.configure.flags.channel,
      '--mode', 'dtmf',
      '--mode', 'dtmf',
    ])
    .catch(ctx => {
      expect(strip(ctx.message)).to.contain('Duplicate mode DTMF appears twice')
    })
    .it('errors out when a mode is supplied twice')

    test
    .env(testEnvData.env)
    .stderr()
    .command(['channels:configure',
      '--project', td.configure.flags.project,
      '--channel', td.configure.flags.channel,
      '--mode', td.configure.flags.modes[0],
      '--color', 'GARBAGE'
    ])
    .catch(ctx => {
      expect(strip(ctx.message)).to.contain('Unknown color GARBAGE')
    })
    .it('errors out when given an unknown color')
})

