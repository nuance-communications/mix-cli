/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {expect, test} from '@oclif/test'
import {PrettyPrintableError} from '@oclif/errors'

const td = require('./projects-test-data')
const testData = require ('../../test-data')
const serverURL = `https://${testData.server}`

const endpoint = `/v4/projects/1922/.datapack`

describe('projects:configure command', () => {
  test
    .env(testData.env)
    .stdout()
    .nock(serverURL, api => api
      .put(endpoint)
      .reply(200, td.configure.response.data)
    )
    .command(['projects:configure',
      `--data-pack=${td.configure.flags['data-pack']}`,
      `-P=${td.configure.flags.project}`,
    ])
    .it('configures a new data pack for a project', ctx => {
      const [firstLine] = ctx.stdout.split('\n').map(ln => ln.trim())
      expect(firstLine).to.equal(`Configuration job ${td.configure.response.data.id} successfully queued.`)
    })

  test
    .env(testData.env)
    .stderr()
    .command(['projects:configure'])
    .catch(ctx => {
      const err = ctx as PrettyPrintableError
        expect(err.message).to.contain('Missing required flag:\n --data-pack DATA-PACK')
    })
    .it('errors out when no parameters supplied')
})
