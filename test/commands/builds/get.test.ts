/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {expect, test} from '@oclif/test'
import {PrettyPrintableError} from '@oclif/errors';

const td = require('./builds-test-data')

const testEnvData = require('../../test-data')
const serverURL = `https://${testEnvData.server}`

describe('builds:get', () => {
  test
    .env(testEnvData.env)
    .nock(serverURL, api => api
      .persist()
      .get(`/v4/builds/${td.request.buildLabel}`)
      .reply(200, td.getBuildResponse)
    )
    .stdout()
    .command(['builds:get', '--build-label', td.request.buildLabel])
    .it('gets build details', ctx => {
      expect(ctx.stdout).to.contain('ProjectId: 1922')
      expect(ctx.stdout).to.contain('BuildId: 1617')
      expect(ctx.stdout).to.contain('BuildLabel: BST_COMPLETED')
      expect(ctx.stdout).to.contain('BuildType: ASR')
      expect(ctx.stdout).to.contain('BuildVersion: 1')
      expect(ctx.stdout).to.contain('LanguageTopic: gen')
      expect(ctx.stdout).to.contain('DataPack: en-US@4.5.0')
      expect(ctx.stdout).to.contain('ModelType: n/a')
      expect(ctx.stdout).to.contain('Notes: This is a great build')
    })

  test
    .env(testEnvData.env)
    .stderr()
    .command(['builds:get'])
    .catch(ctx => {
      const err = ctx as PrettyPrintableError
      expect(ctx.message).to.contain('Required flag(s) missing.')
      expect(ctx.message).to.contain('A build is uniquely identified by its build label or')
      expect(ctx.message).to.contain('by the combination of its build type, project ID and build version.')
    })
    .it('errors out when no parameters supplied')
})
