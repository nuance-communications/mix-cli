/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {expect, test} from '@oclif/test'
import voicesTestData from './voices-test-data'
const testData = require('../../test-data')
const serverURL = `https://${testData.server}`

const {voicesListResponse, emptyVoicesListResponse} = voicesTestData

describe('voices:list command', () => {
  describe('voices:list command with data', () => {
    const orgId = 1
    const endpoint = `/v4/organizations/${orgId}/voices`

    test
      .env(testData.env)
      .nock(serverURL, (api) =>
        api
          .get(endpoint)
          .reply(200, voicesListResponse)
      )
      .stdout()
      .command(['voices:list', `--organization=${orgId}`])
      .it('voices:list provides human-readable output', (ctx) => {
        const lines = ctx.stdout.split('\n').map(ln => ln.trim())
        const headers = lines[0].split(/\s+/)
        const firstRow = lines[2].split(/\s+/)
        const secondRow = lines[3].split(/\s+/)
        expect(headers).to.deep.equal(['Name', 'Restricted', 'Gender', 'Model', 'Locale', 'SampleRateHz', 'ForeignLanguages', 'Styles'])
        expect(firstRow).to.deep.equal(['Maged-Ml', 'false', 'MALE', 'STANDARD', 'arb-001', '22050', 'en-GB', 'n/a'])
        expect(secondRow).to.deep.equal(['Petra-Ml', 'false', 'FEMALE', 'NEURAL', 'de-DE', '8000,22050', 'en-GB,fr-FR,it-IT', 'cheerful,excited,sad'])
      })

    test
      .env(testData.env)
      .nock(serverURL, (api) =>
        api
          .get(endpoint)
          .reply(200, voicesListResponse)
      )
      .stdout()
      .command(['voices:list', `--organization=${orgId}`, '--json'])
      .it('voices:list provides JSON output', (ctx) => {
        const result = JSON.parse(ctx.stdout)
        expect(result).to.deep.equal(voicesListResponse)
      })
  }),
    describe('voices:list handling of empty data', () => {
      const orgId = 1
      test
        .env(testData.env)
        .nock(serverURL, (api) =>
          api
            .get(`/v4/organizations/${orgId}/voices`)
            .reply(200, emptyVoicesListResponse)
        )
        .stdout()
        .command(['voices:list', '--organization=1'])
        .it('voices:list provides human-readable output', (ctx) => {
          const lines = ctx.stdout.split('\n').map(ln => ln.trim())
          expect(lines[0]).to.deep.equal('No voices found.')
        })
    }),
    describe('voices:list handling of missing flag', () => {
      test
        .env(testData.env)
        .stderr()
        .command(['voices:list'])
        .catch(ctx => {
          expect(ctx.message).to.contain('Missing required flag')
        })
        .it('voices:list throws error when missing required flag')
    })
})