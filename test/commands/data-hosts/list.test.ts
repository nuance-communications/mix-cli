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
  describe('data-hosts:list command with valid Mix applicationId, buildLabel and deploymentFlowId', () => {
    const projectId = '457'
    const buildVersion = '1'
    const buildLabel = `DIALOG_${projectId}_${buildVersion}`
    const deploymentFlowId = '88'
    const applicationId = '32'
    const endpoint = `/v4/builds/${buildLabel}/data-hosts`
  
    test
      .nock(mixAPIServerURL, (api) =>
        api
          .get(endpoint)
          .query({
            applicationId: applicationId,
          })
          .reply(200, dataHostsListResponse)
      )
      .stdout()
      .command(['data-hosts:list', '-M', applicationId, '--build-label', buildLabel])
    .it('data-hosts:list provides human-readable output for given Mix applicationId and buildLabel', (ctx) => {
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
            applicationId: applicationId,
          })
          .reply(200, dataHostsListResponse)
      )
      .stdout()
      .command(['data-hosts:list', '-M', applicationId, '-P', projectId, '--build-version', buildVersion])
    .it('data-hosts:list provides human-readable output for given Mix applicationId, projectId and buildVersion', (ctx) => {
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
            applicationId: applicationId,
            deploymentFlowId: deploymentFlowId
          })
          .reply(200, dataHostsListResponse)
      )
      .stdout()
      .command(['data-hosts:list', '-M', applicationId, '--build-label', buildLabel, '-D', deploymentFlowId])
    .it('data-hosts:list provides human-readable output for given Mix applicationId, buildLabel and deploymentFlowId')
    // test failed if no deploymentFlowId supplied

    test
      .nock(mixAPIServerURL, (api) =>
        api
          .get(endpoint)
          .query({
            applicationId: applicationId,
            deploymentFlowId: deploymentFlowId
          })
          .reply(200, dataHostsListResponse)
      )
      .stdout()
      .command(['data-hosts:list',
        `-M=${applicationId}`,
        `-P=${projectId}`,
        `--build-version=${buildVersion}`,
        `-D=${deploymentFlowId}`,
      ])
    .it('data-hosts:list provides human-readable output for given Mix applicationId, projectId, buildVersion and deploymentFlowId')
    // test failed if no deploymentFlowId supplied

    test
      .nock(mixAPIServerURL, (api) =>
        api
          .get(endpoint)
          .query({
            applicationId: applicationId,
          })
          .reply(200, dataHostsListResponse)
      )
      .stdout()
      .command(['data-hosts:list', '-M', applicationId, '--build-label', buildLabel, '--json'])
    .it('data-hosts:list provides JSON output for given Mix applicationId and buildLabel', (ctx) => {
      const result = JSON.parse(ctx.stdout)
      expect(result).to.deep.equal(dataHostsListResponse)
    })

    test
      .nock(mixAPIServerURL, (api) =>
        api
          .get(endpoint)
          .query({
            applicationId: applicationId,
          })
          .reply(200, dataHostsListResponse)
      )
      .stdout()
      .command(['data-hosts:list', '-M', applicationId, '--build-label', buildLabel, '--csv'])
    .it('data-hosts:list provides CSV output for given Mix applicationId and buildLabel', (ctx) => {
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
    const applicationId = '32'
    test
      .stderr()
      .command(['data-hosts:list'])
      .catch(ctx => {
        expect(ctx.message).to.contain('Missing required flag')
      })
    .it('data-hosts:list errors out when no parameters supplied')

    test
      .stderr()
      .command(['data-hosts:list', '-M', applicationId])
      .catch(ctx => {
        expect(ctx.message).to.contain('Required flag(s) missing')
      })
    .it('data-hosts:list errors out when no buildLabel or projectId and buildVersion supplied')

    test
      .stderr()
      .command(['data-hosts:list', '--build-label', buildLabel])
      .catch(ctx => {
        expect(ctx.message).to.contain('Missing required flag')
      })
    .it('data-hosts:list errors out when no Mix applicationId supplied')

    test
      .stderr()
      .command(['data-hosts:list', '-P', projectId])
      .catch(ctx => {
        expect(ctx.message).to.contain('Missing required flag')
      })
    .it('data-hosts:list errors out when no Mix applicationId and buildVersion supplied')

    test
      .stderr()
      .command(['data-hosts:list', '--build-version', buildVersion])
      .catch(ctx => {
        expect(ctx.message).to.contain('--project= must also be provided')
      })
    .it('data-hosts:list errors out when no Mix applicationId and projectId supplied')

    test
      .stderr()
      .command(['data-hosts:list', '-P', projectId, '--build-version', buildVersion])
      .catch(ctx => {
        expect(ctx.message).to.contain('Missing required flag')
      })
    .it('data-hosts:list errors out when no Mix applicationId supplied')
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
    .it('data-hosts:list shows relevant message if no data hosts are returned', (ctx) => {
      expect(ctx.stdout).to.contain('No data hosts')
    })
  })
})
