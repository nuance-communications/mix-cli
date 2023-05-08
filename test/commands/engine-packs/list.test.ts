/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {expect, test} from '@oclif/test'
import {PrettyPrintableError} from '@oclif/core/lib/errors'

const strip = require("strip-ansi")

const td = require('./engine-packs-test-data')

const testEnvData = require('../../test-data')
const serverURL = `https://${testEnvData.server}`

describe('engine-packs:list', () => {
  test
    .env(testEnvData.env)
    .nock(serverURL, api => api
      .get(`/v4/organizations/${td.request.oraganization}/engine-packs`)
      .reply(200, {enginePacks: td.response.empty})
    )
    .stdout()
    .command(['engine-packs:list','-O', td.request.oraganization])
    .it('reports no engine packs', ctx => {
      expect(ctx.stdout).to.contain(`No engine packs found in organization ${td.request.oraganization}`)
    })

  test
    .env(testEnvData.env)
    .nock(serverURL, api => api
      .get(`/v4/organizations/${td.request.oraganization}/engine-packs`)
      .reply(200, {enginePacks: td.response.list})
    )
    .stdout()
    .command(['engine-packs:list','-O', td.request.oraganization])
    .it('lists engine packs', ctx => {
      const lines = ctx.stdout.split('\n').map(ln => ln.trim())
      const release = lines[0]
      expect(release).to.contain(`Engine Pack Release: 4.2.0`)
      expect(lines[1]).to.contain(`Engine Pack ID: e8166c40-26ab-4d5f-a73f-a092041f4603`)
      expect(lines[2].split(/\t+/)).to.deep.equal([`ASR version: 4.0.0`,`NLU version: 4`])
      expect(lines[3].split(/\t+/)).to.deep.equal([`Dialog version: 6.0.0`,`TTS version: 4.0.0`])
      
      const headers = lines[5].split(/\s+/)
      const firstLine = lines[7].split(/\s+/)
      expect(headers).to.deep.equal(['Topic','Locale', 'Versions'])
      expect(firstLine).to.deep.equal(['gen','ar-WW', '4.2.0'])
    })

  test
    .env(testEnvData.env)
    .stderr()
    .nock(serverURL, api => api
      .get(`/v4/organizations/${td.request.unknownOrgID}/engine-packs`)
      .reply(400, td.response.errorOrgId)
    )
    .command(['engine-packs:list','-O', td.request.unknownOrgID])
    .catch(ctx => {
      const err = ctx as PrettyPrintableError
      expect(strip(err.message)).to.contain(`Organization ${td.request.unknownOrgID} is not available.`)
      expect(strip(err.suggestions)).to.contain(`verify the values passed to the command flags.`)
    })
    .it('reports invalid organization id')

  test
    .env(testEnvData.env)
    .nock(serverURL, api => api
      .get(`/v4/organizations/${td.request.oraganization}/engine-packs`)
      .reply(200, {enginePacks: td.response.emptyTopics})
    )
    .stdout()
    .command(['engine-packs:list','-O', td.request.oraganization])
    .it('lists engine packs with no topics', ctx => {
      expect(ctx.stdout).to.contain(`No topics available for engine pack`)
    })
})
