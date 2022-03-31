/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {expect, test} from '@oclif/test'
import {PrettyPrintableError} from '@oclif/errors'

const testData = require ('../../test-data')
const serverURL = 'https://' + testData.server
const td = require('./data-hosts-test-data')
const endpoint = '/v4/builds'

describe('data-hosts:list', () => {
  test
    .env(testData.env)
    .stdout()
    .nock(serverURL, api =>
      api.get(`${endpoint}/${td.request.buildLabel}/data-hosts`)
      .query({
        applicationId: td.request['mix-app']
      })
      .reply(200, td.response.json))
    .command(['data-hosts:list',
      `-M=${td.request['mix-app']}`,
      `--build-label=${td.request.buildLabel}`])
    .it('outputs data hosts when given a build label and Mix application ID', ctx => {
      const lines = ctx.stdout.split('\n').map(ln => ln.trim())
      const headers = lines[0].split(/\s+/)
      const dataLine = lines[2].split(/\s+/)
      expect(headers).to.deep.equal(['DataHostId', 'Alias', 'EnvironmentId','EnvironmentGeographyId', 'Value'])
      expect(dataLine).to.deep.equal(['742', 'test', '87','1', 'https://www.testing.com'])
    })

  test
    .env(testData.env)
    .stdout()
    .nock(serverURL, api =>
      api.get(`${endpoint}/${td.request.buildLabel}/data-hosts`)
      .query({
        applicationId: td.request['mix-app']
      })
      .reply(200, td.response.json))
    .command(['data-hosts:list',
      `-M=${td.request['mix-app']}`,
      `--build-label=${td.request.buildLabel}`,
      '--csv'])
    .it('outputs data hosts in csv format', ctx => {
      expect(ctx.stdout).to.equal(td.csvOutput)
      expect(ctx.stdout).not.to.contain(`2 data hosts found for Mix application ${td.request['mix-app']}`)
    })

  test
    .env(testData.env)
    .stdout()
    .nock(serverURL, api =>
      api.get(`${endpoint}/${td.request.buildLabel}/data-hosts`)
      .query({
        applicationId: td.request['mix-app']
      })
      .reply(200, td.response.json))
    .command(['data-hosts:list',
      `-M=${td.request['mix-app']}`,
      `-P=${td.request.projectId}`,
      `--build-version=${td.request.version}`,
      '--json'])
    .it('outputs data hosts in json format when given a Mix application ID, project ID and build version', ctx => {
      const result = JSON.parse(ctx.stdout)
      expect(result).to.deep.equal(td.response.json)
      expect(ctx.stdout).not.to.contain(`2 data hosts found for Mix application ${td.request['mix-app']}`)
    })

  test
    .env(testData.env)
    .stdout()
    .nock(serverURL, api =>
      api.get(`${endpoint}/${td.request.buildLabel}/data-hosts`)
      .query({
        applicationId: td.request['mix-app'],
        deploymentFlowId: td.request.dialogFlowId
      })
      .reply(200, td.response.filter))
    .command(['data-hosts:list',
      `-M=${td.request['mix-app']}`,
      `-P=${td.request.projectId}`,
      `--build-version=${td.request.version}`,
      `-D=${td.request.dialogFlowId}`,
      '--json'])
    .it('outputs data hosts in json format when given a Mix application ID, project ID, build version and deployment flow ID', ctx => {
      const result = JSON.parse(ctx.stdout)
      expect(result).to.deep.equal(td.response.filter)
    })

  
  test
    .env(testData.env)
    .stdout()
    .nock(serverURL, api =>
      api.get(`${endpoint}/${td.request.buildLabel}/data-hosts`)
      .query({
        applicationId: td.request['mix-app'],
        deploymentFlowId: td.request.dialogFlowId
      })
      .reply(200, td.response.empty))
    .command(['data-hosts:list',
      `-M=${td.request['mix-app']}`,
      `-P=${td.request.projectId}`,
      `--build-version=${td.request.version}`,
      `-D=${td.request.dialogFlowId}`])
    .it('outputs data hosts post message for empty response', ctx => {
      expect(ctx.stdout).to.contain(`No data hosts found for this application build.`)
      expect(ctx.stdout).not.to.contain(`0 data host found for Mix application ${td.request['mix-app']} with deployment flow ${td.request.dialogFlowId}.`)
    })

  test
    .env(testData.env)
    .stdout()
    .nock(serverURL, api =>
      api.get(`${endpoint}/${td.request.buildLabel}/data-hosts`)
      .query({
        applicationId: td.request['mix-app'],
        deploymentFlowId: '999999'
      })
      .reply(404))
    .command(['data-hosts:list',
      `-M=${td.request['mix-app']}`,
      `--build-label=${td.request.buildLabel}`,
      '-D=999999'])
    .catch(ctx => {
      const err: PrettyPrintableError = ctx
      expect(err.message).to.contain('The data you requested could not be found.')
      expect(err.code).to.contain('ENOTFOUND')
      expect(err.suggestions).to.deep.equal(['verify the values passed to the command flags.'])
    })
    .it('errors out when given an invalid deployment flow ID') 

  test
    .env(testData.env)
    .stdout()
    .nock(serverURL, api =>
      api.get(`${endpoint}/${td.request.buildLabel}/data-hosts`)
      .query({
        applicationId: td.request['mix-app'],
        deploymentFlowId: td.request.dialogFlowId
      })
      .reply(401))
    .command(['data-hosts:list',
      `-M=${td.request['mix-app']}`,
      `--build-label=${td.request.buildLabel}`,
      `-D=${td.request.dialogFlowId}`])
    .catch(ctx => {
      const err: PrettyPrintableError = ctx
      expect(err.message).to.contain('Unauthorized request.')
      expect(err.code).to.contain('EUNAUTHORIZED')
    })
    .it('errors out when authentication has failed') 

  test
    .env(testData.env)
    .stdout()
    .command(['data-hosts:list',
      '-M=-11',
      `--build-label=${td.request.buildLabel}`,
      '-D=11'])
    .catch(ctx => {
      const err: PrettyPrintableError = ctx
      expect(err.message).to.contain("Expected flag 'mix-app' to have a value greater than 0")
    })
    .it('errors out when given an invalid Mix application ID')
  
  test
    .env(testData.env)
    .stdout()
    .command(['data-hosts:list',
      '-M=11',
      `--build-label=${td.request.buildLabel}`,
      '-D=0'])
    .catch(ctx => {
      const err: PrettyPrintableError = ctx
      expect(err.message).to.contain("Expected flag 'deployment-flow' to have a value greater than 0")
    })
    .it('errors out when given an invalid deployment flow ID')
})
