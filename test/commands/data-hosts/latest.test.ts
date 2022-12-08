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
  dataHostsLatestResponse,
  noDataHostsReponse,
} = testData

describe('data-hosts:latest command', () => {
  describe('data-hosts:latest command with valid Mix applicationId, projectId and deploymentFlowId', () => {
    const projectId = '457'
    const deploymentFlowId = '88'
    const applicationId = '32'
    const endpoint = `/v4/apps/${applicationId}/projects/${projectId}/data-hosts/.latest`
  
    test
      .nock(mixAPIServerURL, (api) =>
        api
          .get(endpoint)
          .reply(200, dataHostsLatestResponse)
      )
      .stdout()
      .command(['data-hosts:latest', '-M', applicationId, '-P', projectId])
    .it('data-hosts:latest provides human-readable output for given Mix applicationId and projectId', (ctx) => {
      const lines = ctx.stdout.split('\n').map(ln => ln.trim())
      const headers = lines[0].split(/\s+/)
      const dataLine = lines[2].split(/\s+/)
      expect(headers).to.deep.equal(['DataHostId', 'Alias', 'EnvironmentId','EnvironmentGeographyId', 'Value'])
      expect(dataLine).to.deep.equal(['743', 'test2', '87','1', 'http://data.com'])
    })

    test
      .nock(mixAPIServerURL, (api) =>
        api
          .get(endpoint)
          .query({
            deploymentFlowId: deploymentFlowId
          })
          .reply(200, dataHostsLatestResponse)
      )
      .stdout()
      .command(['data-hosts:latest', '-M', applicationId, '-P', projectId, '-D', deploymentFlowId])
    .it('data-hosts:latest provides human-readable output for given Mix applicationId, projectId and deploymentFlowId')
    // test failed if no deploymentFlowId supplied

    test
      .nock(mixAPIServerURL, (api) =>
        api
          .get(endpoint)
          .reply(200, dataHostsLatestResponse)
      )
      .stdout()
      .command(['data-hosts:latest', '-M', applicationId, '-P', projectId, '--json'])
    .it('data-hosts:latest provides JSON output for given Mix applicationId and projectId', (ctx) => {
      const result = JSON.parse(ctx.stdout)
      expect(result).to.deep.equal(dataHostsLatestResponse)
    })

    test
      .nock(mixAPIServerURL, (api) =>
        api
          .get(endpoint)
          .reply(200, dataHostsLatestResponse)
      )
      .stdout()
      .command(['data-hosts:latest', '-M', applicationId, '-P', projectId, '--csv'])
    .it('data-hosts:latest provides CSV output for given Mix applicationId and projectId', (ctx) => {
      const lines = ctx.stdout.split('\n').map(ln => ln.trim())
      const headers = lines[0].split(',')
      const dataLine = lines[1].split(',')
      expect(headers).to.deep.equal(['DataHostId', 'Alias', 'EnvironmentId','EnvironmentGeographyId', 'Value'])
      expect(dataLine).to.deep.equal(['743', 'test2', '87','1', 'http://data.com'])
    })
  }),

  describe('data-hosts:latest handling of missing flags', () => {
    const projectId = '457'
    const applicationId = '32'
    test
      .stderr()
      .command(['data-hosts:latest'])
      .catch(ctx => {
        expect(ctx.message).to.contain('Missing required flag')
      })
    .it('data-hosts:latest errors out when no parameters supplied')

    test
      .stderr()
      .command(['data-hosts:latest', '-M', applicationId])
      .catch(ctx => {
        expect(ctx.message).to.contain('Missing required flag')
      })
    .it('data-hosts:latest errors out when no projectId supplied')

    test
      .stderr()
      .command(['data-hosts:latest', '-P', projectId])
      .catch(ctx => {
        expect(ctx.message).to.contain('Missing required flag')
      })
    .it('data-hosts:latest errors out when no Mix applicationId supplied')
  }),

  describe('data-hosts:latest handling of empty data', () => {
    const projectId = '458'
    const applicationId = '40'
    const endpoint = `/v4/apps/${applicationId}/projects/${projectId}/data-hosts/.latest`
  
    test
      .nock(mixAPIServerURL, (api) =>
        api
          .get(endpoint)
          .reply(200, noDataHostsReponse)
      )
      .stdout()
      .command(['data-hosts:latest', '-M', applicationId, '-P', projectId])
    .it('data-hosts:latest shows relevant message if no data hosts are returned', (ctx) => {
      expect(ctx.stdout).to.contain('No data hosts')
    })
  })
})
