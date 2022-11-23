/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {expect, test} from '@oclif/test'
import {PrettyPrintableError} from "@oclif/errors"

const td = require('./error-handling-test-data')

const orgId = '10'
const endpoint = `/v4/organizations/${orgId}/apps`

const testEnvData = require('./test-data')
const serverURL = `https://${testEnvData.server}`

describe('error handling with applications:list command', () => {
  test
    .env(testEnvData.env)
    .nock(serverURL, (api) =>
      api
        .get(endpoint)
        .query({
          view: "AV_VIEW_UNSPECIFIED",
        })
        .reply(400, td.response.invalidValuesResponse)
    )
    .stdout()
    .command(["applications:list", "-O", orgId])
    .catch(ctx => {
      const err: PrettyPrintableError = ctx
      expect(err.code).to.contain('EINVALIDVALUE')
    })
    .it('One or more flags have invalid values.')

    test
    .env(testEnvData.env)
    .nock(serverURL, (api) =>
      api
        .get(endpoint)
        .query({
          view: "AV_VIEW_UNSPECIFIED",
        })
        .reply(401, td.response.unauthorizedResponse)
    )
    .stdout()
    .command(["applications:list", "-O", orgId])
    .catch(ctx => {
      const err: PrettyPrintableError = ctx
      expect(err.code).to.contain('EUNAUTHORIZED')
    })
    .it('Unauthorized request.')

    test
    .env(testEnvData.env)
    .nock(serverURL, (api) =>
      api
        .get(endpoint)
        .query({
          view: "AV_VIEW_UNSPECIFIED",
        })
        .reply(404, td.response.notFoundResponse)
    )
    .stdout()
    .command(["applications:list", "-O", orgId])
    .catch(ctx => {
      const err: PrettyPrintableError = ctx
      expect(err.code).to.contain('ENOTFOUND')
    })
    .it('The data you requested could not be found.')

    test
    .env(testEnvData.env)
    .nock(serverURL, (api) =>
      api
        .get(endpoint)
        .query({
          view: "AV_VIEW_UNSPECIFIED",
          appId: "app_123"
        })
        .reply(409, td.response.conflictResponse)
    )
    .stdout()
    .command(["applications:list", "-O", orgId, "--with-runtime-app", "app_123"])
    .catch(ctx => {
      const err: PrettyPrintableError = ctx
      expect(err.code).to.contain('ECONFLICTERROR')
    })
    .it('The request conflicts with your project or application configuration.')
})
