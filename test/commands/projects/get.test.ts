/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {expect, test} from "@oclif/test"
import {PrettyPrintableError} from "@oclif/core/lib/errors"

const testData = require("../../test-data")
const serverURL = `https://${testData.server}`

const td = require("./projects-test-data")

describe("projects:get command", () => {
  test
    .env(testData.env)
    .nock(serverURL, (api) =>
      api.get("/v4/projects/8681").reply(200, {project: td.response.projects[0]})
    )
    .stdout()
    .command(["projects:get", "-P", "8681", "--json"])
    .it("gets data for a single project as JSON", (ctx) => {
      // this test is mostly a sanity check that the test setup itself
      // is working: data is correctly parsed from the test dataset
      // and formatted in a way the command can read.
      const result = JSON.parse(ctx.stdout)
      expect(result).to.deep.equal({project: td.response.projects[0]})
    })

  test
    .env(testData.env)
    .nock(serverURL, api => api
    .get('/v4/projects/999999')
    .reply(404)
    )
    .command(['projects:get', '-P', '999999'])
    .exit(1)
    .it('exits with 1 when given an unkown project')

  test
    .env(testData.env)
    .nock(serverURL, api => api
    .get('/v4/projects/999999')
    .reply(404)
    )
    .command(['projects:get', '-P', '999999'])
    .catch(ctx => {
      const err: PrettyPrintableError = ctx
      expect(err.code).to.contain('ENOTFOUND')
    })
    .it('provides an error message when given an unknown project')

  test
    .env(testData.env)
    .command(['projects:get'])
    .catch(ctx => {
      const err: PrettyPrintableError = ctx
      expect(err.message).to.contain('Missing required flag project')
    })
    .it('provides an error message when no project ID supplied')

    test
    .env(testData.env)
    .command(['projects:get','-P','1234','--table','channels'])
    .catch(ctx => {
      const err: PrettyPrintableError = ctx
      expect(err.message).to.contain('--csv')
    })
    .it('provides an error message when table flag is supplied without csv')

    test
    .env(testData.env)
    .command(['projects:get','-P','1234','--csv'])
    .catch(ctx => {
      const err: PrettyPrintableError = ctx
      expect(err.message).to.contain('--table')
    })
    .it('provides an error message when csv flag is supplied without table')
})
