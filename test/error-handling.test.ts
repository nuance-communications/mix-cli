/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {expect, test} from '@oclif/test'
import {PrettyPrintableError} from '@oclif/core/lib/errors'
import {mixAPIServerURL} from './mocks'
import testData from './error-handling-test-data'

const {
  conflictResponse,
  forbiddenAccessResponse,
  invalidValuesResponse,
  notFoundResponse,
  unauthorizedResponse,
  unexpectedStatusResponse,
} = testData

const applicationId = '10'
const endpoint = `/v4/apps/${applicationId}/credentials`

describe('Centralized HTTP error code handling', () => {
  test
    .nock(mixAPIServerURL, (api) =>
      api
        .get(endpoint)
        .query({
          view: 'ACV_VIEW_UNSPECIFIED',
        })
        .reply(400, invalidValuesResponse)
    )
    .stdout()
    .command(['app-credentials:list', '-M', applicationId])
    .catch(ctx => {
      const err: PrettyPrintableError = ctx
      expect(err.code).to.contain('EINVALIDVALUE')
    })
  .it('HTTP code 400 generates EINVALIDVALUE exception')

  test
    .nock(mixAPIServerURL, (api) =>
      api
        .get(endpoint)
        .query({
          view: 'ACV_VIEW_UNSPECIFIED',
        })
        .reply(401, unauthorizedResponse)
    )
    .stdout()
    .command(['app-credentials:list', '-M', applicationId])
    .catch(ctx => {
      const err: PrettyPrintableError = ctx
      expect(err.code).to.contain('EUNAUTHORIZED')
    })
  .it('HTTP code 401 generates EUNAUTHORIZED exception')

  test
    .nock(mixAPIServerURL, (api) =>
      api
        .get(endpoint)
        .query({
          view: 'ACV_VIEW_UNSPECIFIED',
        })
        .reply(403, forbiddenAccessResponse)
    )
    .stdout()
    .command(['app-credentials:list', '-M', applicationId])
    .catch(ctx => {
      const err: PrettyPrintableError = ctx
      expect(err.code).to.contain('EFORBIDDEN')
    })
  .it('HTTP code 403 generates EFORBIDDEN exception')

  test
    .nock(mixAPIServerURL, (api) =>
      api
        .get(endpoint)
        .query({
          view: 'ACV_VIEW_UNSPECIFIED',
        })
        .reply(404, notFoundResponse)
    )
    .stdout()
    .command(['app-credentials:list', '-M', applicationId])
    .catch(ctx => {
      const err: PrettyPrintableError = ctx
      expect(err.code).to.contain('ENOTFOUND')
    })
  .it('HTTP code 404 generates ENOTFOUND exception')

  test
    .nock(mixAPIServerURL, (api) =>
      api
        .get(endpoint)
        .query({
          view: 'ACV_VIEW_UNSPECIFIED',
          envGeographyName: 'geo',
        })
        .reply(409, conflictResponse)
    )
    .stdout()
    .command(['app-credentials:list', '-M', applicationId, '--with-geo-name', 'geo'])
    .catch(ctx => {
      const err: PrettyPrintableError = ctx
      expect(err.code).to.contain('ECONFLICTERROR')
    })
  .it('HTTP code 409 generates ECONFLICTERROR exception')

  test
    .nock(mixAPIServerURL, (api) =>
      api
        .get(endpoint)
        .query({
          view: 'ACV_VIEW_UNSPECIFIED',
        })
        .reply(500, unexpectedStatusResponse)
    )
    .stdout()
    .command(['app-credentials:list', '-M', applicationId])
    .catch(ctx => {
      const err: PrettyPrintableError = ctx
      expect(err.code).to.contain('EUNEXPECTEDSTATUS')
    })
  .it('HTTP code 500 generates EUNEXPECTEDSTATUS exception')
})
