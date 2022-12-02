/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {expect, test} from '@oclif/test'
import {mixAPIServerURL} from '../../mocks'
import testData from './data-hosts-test-data'

const {
  dataHostsListResponse,
  noDataHostsReponse,
} = testData

describe('data-hosts:list command', () => {
  describe('data-hosts:list command with valid buildLabel, deploymentFlowId and mix-app', () => {
    const projectId = '457'
    const buildVersion = '1'
    const buildLabel = `DIALOG_${projectId}_${buildVersion}`
    const deploymentFlowId = '88'
    const mixApp = '32'
    const endpoint = `/v4/builds/${buildLabel}/data-hosts`
  
    test
      .nock(mixAPIServerURL, (api) =>
        api
          .get(endpoint)
          .query({
            applicationId: mixApp,
          })
          .reply(200, dataHostsListResponse)
      )
      .stdout()
      .command(['data-hosts:list', '-M', mixApp, '--build-label', buildLabel])
    .it('data-hosts:list provides human-readable output for given Mix application ID and buildLabel', (ctx) => {
      const lines = ctx.stdout.split('\n').map(ln => ln.trim())
      const headers = lines[0].split(/\s+/)
      const dataLine = lines[2].split(/\s+/)
      expect(headers).to.deep.equal(['DataHostId', 'Alias', 'EnvironmentId','EnvironmentGeographyId', 'Value'])
      expect(dataLine).to.deep.equal(['742', 'test', '87','1', 'https://www.testing.com'])
    })

    test
      .nock(mixAPIServerURL, (api) =>
        api
          .get(endpoint)
          .query({
            applicationId: mixApp,
          })
          .reply(200, dataHostsListResponse)
      )
      .stdout()
      .command(['data-hosts:list', '-M', mixApp, '-P', projectId, '--build-version', buildVersion])
    .it('data-hosts:list provides human-readable output for given Mix application ID, projectId and buildVersion', (ctx) => {
      const lines = ctx.stdout.split('\n').map(ln => ln.trim())
      const headers = lines[0].split(/\s+/)
      const dataLine = lines[2].split(/\s+/)
      expect(headers).to.deep.equal(['DataHostId', 'Alias', 'EnvironmentId','EnvironmentGeographyId', 'Value'])
      expect(dataLine).to.deep.equal(['742', 'test', '87','1', 'https://www.testing.com'])
    })
  
    test
      .nock(mixAPIServerURL, (api) =>
        api
          .get(endpoint)
          .query({
            applicationId: mixApp,
            deploymentFlowId: deploymentFlowId
          })
          .reply(200, dataHostsListResponse)
      )
      .stdout()
      .command(['data-hosts:list', '-M', mixApp, '--build-label', buildLabel, '-D', deploymentFlowId])
    .it('data-hosts:list provides human-readable output for given Mix application ID, buildLabel and deploymentFlowId')
    // test failed if no deploymentFlowId supplied

    test
      .nock(mixAPIServerURL, (api) =>
        api
          .get(endpoint)
          .query({
            applicationId: mixApp,
            deploymentFlowId: deploymentFlowId
          })
          .reply(200, dataHostsListResponse)
      )
      .stdout()
      .command(['data-hosts:list',
        `-M=${mixApp}`,
        `-P=${projectId}`,
        `--build-version=${buildVersion}`,
        `-D=${deploymentFlowId}`,
      ])
    .it('data-hosts:list provides human-readable output for given Mix application ID, projectId, buildVersion and deploymentFlowId')
    // test failed if no deploymentFlowId supplied

    test
      .nock(mixAPIServerURL, (api) =>
        api
          .get(endpoint)
          .query({
            applicationId: mixApp,
          })
          .reply(200, dataHostsListResponse)
      )
      .stdout()
      .command(['data-hosts:list', '-M', mixApp, '--build-label', buildLabel, '--json'])
    .it('data-hosts:list provides JSON output for given Mix application ID and buildLabel', (ctx) => {
      const result = JSON.parse(ctx.stdout)
      expect(result).to.deep.equal(dataHostsListResponse)
    })

    test
      .nock(mixAPIServerURL, (api) =>
        api
          .get(endpoint)
          .query({
            applicationId: mixApp,
          })
          .reply(200, dataHostsListResponse)
      )
      .stdout()
      .command(['data-hosts:list', '-M', mixApp, '--build-label', buildLabel, '--csv'])
    .it('data-hosts:list provides CSV output for given Mix application ID and buildLabel', (ctx) => {
      const lines = ctx.stdout.split('\n').map(ln => ln.trim())
      const headers = lines[0].split(',')
      const dataLine = lines[1].split(',')
      expect(headers).to.deep.equal(['DataHostId', 'Alias', 'EnvironmentId','EnvironmentGeographyId', 'Value'])
      expect(dataLine).to.deep.equal(['742', 'test', '87','1', 'https://www.testing.com'])
    })
  }),

  describe('data-hosts:list handling of missing flags', () => {
    const projectId = '457'
    const buildVersion = '1'
    const buildLabel = `DIALOG_${projectId}_${buildVersion}`
    const mixApp = '32'
    test
      .stderr()
      .command(['data-hosts:list'])
      .catch(ctx => {
        expect(ctx.message).to.contain('Missing required flag')
      })
    .it('data-hosts:list errors out when no parameters supplied')

    test
      .stderr()
      .command(['data-hosts:list', '-M', mixApp])
      .catch(ctx => {
        expect(ctx.message).to.contain('Required flag(s) missing')
      })
    .it('data-hosts:list errors out when no buildLabel supplied')

    test
      .stderr()
      .command(['data-hosts:list', '--build-label', buildLabel])
      .catch(ctx => {
        expect(ctx.message).to.contain('Missing required flag')
      })
    .it('data-hosts:list errors out when no Mix application ID supplied')

    test
      .stderr()
      .command(['data-hosts:list', '-P', projectId])
      .catch(ctx => {
        expect(ctx.message).to.contain('Missing required flag')
      })
    .it('data-hosts:list errors out when no buildVersion supplied')

    test
      .stderr()
      .command(['data-hosts:list', '--build-version', buildVersion])
      .catch(ctx => {
        expect(ctx.message).to.contain('--project= must also be provided')
      })
    .it('data-hosts:list errors out when no projectId supplied')

    test
      .stderr()
      .command(['data-hosts:list', '-P', projectId, '--build-version', buildVersion])
      .catch(ctx => {
        expect(ctx.message).to.contain('Missing required flag')
      })
    .it('data-hosts:list errors out when no Mix application ID supplied')
  }),

  describe('data-hosts:list handling of empty data', () => {
    const buildLabel = 'DIALOG_458_2'
    const endpoint = `/v4/builds/${buildLabel}/data-hosts`
  
    test
      .nock(mixAPIServerURL, (api) =>
        api
          .get(endpoint)
          .query({
            applicationId: '20',
          })
          .reply(200, noDataHostsReponse)
      )
      .stdout()
      .command(['data-hosts:list', '-M', '20', '--build-label', buildLabel])
    .it('data-hosts:list shows error message for no data hosts ', (ctx) => {
      expect(ctx.stdout).to.contain('No data hosts')
    })
  })
})
