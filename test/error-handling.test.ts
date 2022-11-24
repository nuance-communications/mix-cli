/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {expect, test} from '@oclif/test'
import {PrettyPrintableError} from "@oclif/errors"
import {mixAPIServer} from './mocks'
import testData from './error-handling-test-data'

const {
  conflictResponse,
  invalidValuesResponse,
  notFoundResponse,
  unauthorizedResponse,
  unexpectedStatusResponse,
} = testData

const serverURL = `https://${mixAPIServer}`

const orgId = '10'
const endpoint = `/v4/organizations/${orgId}/apps`

describe('Centralized HTTP error code handling', () => {
  test
    .nock(serverURL, (api) =>
      api
        .get(endpoint)
        .query({
          view: "AV_VIEW_UNSPECIFIED",
        })
        .reply(400, invalidValuesResponse)
    )
    .stdout()
    .command(["applications:list", "-O", orgId])
    .catch(ctx => {
      const err: PrettyPrintableError = ctx
      expect(err.code).to.contain('EINVALIDVALUE')
    })
    .it('HTTP code 400 generates EINVALIDVALUE exception')

    test
    .nock(serverURL, (api) =>
      api
        .get(endpoint)
        .query({
          view: "AV_VIEW_UNSPECIFIED",
        })
        .reply(401, unauthorizedResponse)
    )
    .stdout()
    .command(["applications:list", "-O", orgId])
    .catch(ctx => {
      const err: PrettyPrintableError = ctx
      expect(err.code).to.contain('EUNAUTHORIZED')
    })
    .it('HTTP code 401 generates EUNAUTHORIZED exception')

    test
    .nock(serverURL, (api) =>
      api
        .get(endpoint)
        .query({
          view: "AV_VIEW_UNSPECIFIED",
        })
        .reply(404, notFoundResponse)
    )
    .stdout()
    .command(["applications:list", "-O", orgId])
    .catch(ctx => {
      const err: PrettyPrintableError = ctx
      expect(err.code).to.contain('ENOTFOUND')
    })
    .it('HTTP code 404 generates ENOTFOUND exception')

    test
    .nock(serverURL, (api) =>
      api
        .get(endpoint)
        .query({
          view: "AV_VIEW_UNSPECIFIED",
          appId: "app_123"
        })
        .reply(409, conflictResponse)
    )
    .stdout()
    .command(["applications:list", "-O", orgId, "--with-runtime-app", "app_123"])
    .catch(ctx => {
      const err: PrettyPrintableError = ctx
      expect(err.code).to.contain('ECONFLICTERROR')
    })
    .it('HTTP code 409 generates ECONFLICTERROR exception')

    test
    .nock(serverURL, (api) =>
      api
        .get(endpoint)
        .query({
          view: "AV_VIEW_UNSPECIFIED",
        })
        .reply(500, unexpectedStatusResponse)
    )
    .stdout()
    .command(["applications:list", "-O", orgId])
    .catch(ctx => {
      const err: PrettyPrintableError = ctx
      expect(err.code).to.contain('EUNEXPECTEDSTATUS')
    })
    .it('HTTP code 500 generates EUNEXPECTEDSTATUS exception')
})
