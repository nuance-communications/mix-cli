/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {expect, test} from '@oclif/test'

const td = require('./bot-configs-test-data')
const {botId, liveOnly, excludeOverrides} = td.request

const endpoint = `/v4/bots/${botId}/configs`

const testEnvData = require('../../test-data')
const serverURL = `https://${testEnvData.server}`

describe('bot-configs:list command', () => {
  test
    .env(testEnvData.env)
    .nock(serverURL, (api) =>
      api
        .get(endpoint)
        .query({
          liveOnly,
          excludeOverrides,
        })
        .reply(200, td.response.json)
    )
    .stdout()
    .command(["bot-configs:list", "-B", botId, "--json"])
    .it("shows all bot configuration data appropriately in JSON view", (ctx) => {
      const result = JSON.parse(ctx.stdout)
      expect(result).to.deep.equal(td.response.json)
    })

  test
    .env(testEnvData.env)
    .nock(serverURL, (api) =>
      api
        .get(endpoint)
        .query({
          liveOnly,
          excludeOverrides,
        })
        .reply(200, td.response.json)
    )
    .stdout()
    .stderr()
    .command(["bot-configs:list", "-B", botId, "--csv"])
    .it("reformats and hides data appropriately in tabular mode", (ctx) => {
      const [headers, ...results] = ctx.stdout.trim().split('\n')
      expect(headers.split(',')).to.deep.equal(['ConfigId', 'ContextTag', 'ParentId',  'HasInterface', 'CreateTime'])
      // first row has result with comma, so it needs to be formatted differently
      expect(results[0].split(',')).to.deep.equal(['456', 'A789_C1', '92', 'true', 'now'])
    })
})