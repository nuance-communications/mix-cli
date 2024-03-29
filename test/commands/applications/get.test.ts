/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {expect, test} from '@oclif/test'
import {mixAPIServerURL} from '../../mocks'
import testData from './applications-test-data'

const {
  applicationsGetResponse,
  applicationsGetJsonResponse,
  noApplicationsResponse,
} = testData

describe('applications:get command', () => {
  describe('applications:get command with valid options', () => {
    const applicationId = '1'
    const endpoint = '/v4/apps'

    test
      .nock(mixAPIServerURL, (api) =>
        api
          .get(endpoint)
          .query({
            view: 'AV_FULL',
            filter: applicationId,
          })
          .reply(200, applicationsGetResponse)
      )
      .stdout()
      .command(['applications:get', '-M', applicationId])
    .it('applications:get provides human-readable output for given applicationId', (ctx) => {
      const lines = ctx.stdout.split('\n').map(ln => ln.trim())
      const headers = lines[4].split(/\s+/)
      const firstRow = lines[6].split(/\s+/)
      // test if the resulted applicationId is same as provided applicationId
      expect(lines[0]).to.equal(`ApplicationId: ${applicationId}`)
      expect(lines[1]).to.equal('Name: Sample App')
      expect(lines[1]).to.not.contain(`${applicationId}`)
      expect(lines[2]).to.equal('CreateTime: later')
      expect(headers).to.deep.equal(['ConfigId', 'DeploymentFlowId', 'ProjectId', 'ProjectName', 'CreateTime'])
      expect(firstRow).to.deep.equal('58 6 61 Test Project later'.split(/\s+/))
    })

    test
      .nock(mixAPIServerURL, (api) =>
        api
          .get(endpoint)
          .query({
            view: 'AV_FULL',
            filter: applicationId,
          })
          .reply(200, applicationsGetResponse)
      )
      .stdout()
      .command(['applications:get', '-M', applicationId, '--json'])
    .it('applications:get provides JSON output for given applicationId', (ctx) => {
      const result = JSON.parse(ctx.stdout)
      expect(result).to.deep.equal(applicationsGetJsonResponse)
    })
  })

  describe('applications:get handling of missing flags', () => {
    test
      .stderr()
      .command(['applications:get'])
      .catch(ctx => {
        expect(ctx.message).to.contain('Missing required flag')
      })
    .it('applications:get errors out when no parameters supplied')
  }),

  describe('applications:get handling of empty data', () => {
    const endpoint = '/v4/apps'
    const applicationId = '198'
  
    test
      .nock(mixAPIServerURL, (api) =>
        api
          .get(endpoint)
          .query({
            view: 'AV_FULL',
            filter: applicationId,
          })
          .reply(200, noApplicationsResponse)
      )
      .stdout()
      .command(['applications:get', '-M', applicationId])
    .it('applications:get shows relevant message if no application found', (ctx) => {
      expect(ctx.stdout).to.contain('No application')
    })
  })
})
