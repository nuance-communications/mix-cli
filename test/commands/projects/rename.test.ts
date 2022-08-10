/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {expect, test} from '@oclif/test'

const td = require('./projects-test-data')
const testData = require ('../../test-data')
const serverURL = `https://${testData.server}`

const endpoint = `/v4/projects/1922/.rename`

describe('projects:rename command', () => {
  test
    .env(testData.env)
    .stdout()
    .nock(serverURL, api => api
      .put(endpoint)
      .reply(200, td.rename.response.data)
    )
    .command(['projects:rename',
      `-P=${td.rename.flags.project}`,
      `--new-name=${td.rename.flags.name}`]
    )
    .it('renames a project', ctx => {
      const [firstLine] = ctx.stdout.split('\n').map(ln => ln.trim())
      expect(firstLine).to.equal(`Project renamed to ${td.rename.flags.name}.`)
    })
})
