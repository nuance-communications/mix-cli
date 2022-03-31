/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {expect, test} from "@oclif/test"

const td = require("./language-topics-test-data")
const testData = require("../../test-data")
const serverURL = `https://${testData.server}`

const endpoint = `/v4/organizations/${td.params.orgId}/language-topics`

describe("language-topics:list command", () => {
  test
    .env(testData.env)
    .nock(serverURL, (api) => api
    .get(endpoint)
    .reply(200, td.response.json)
    )
    .stdout()
    .command(["language-topics:list", "-O", td.params.orgId.toString(), "--json"])
    .it("fetches and outputs JSON data correctly", (ctx) => {
      const {languageTopics} = JSON.parse(ctx.stdout)

      expect(languageTopics[0].name).to.equal("gen")
      expect(languageTopics[1].locales.length).to.equal(1)
    })


  test
    .env(testData.env)
    .nock(serverURL, (api) => api
    .get(endpoint)
    .reply(200, td.response.json)
    )
    .stdout()
    .command([ "language-topics:list", "-O", td.params.orgId.toString(), "--sort=name"])
    .it("sorts data appropriately based on sort flag value", (ctx) => {
      const lines = ctx.stdout.split("\n").map((ln) => ln.trim())
      expect(lines[2]).to.contain("flo")
    })
})
