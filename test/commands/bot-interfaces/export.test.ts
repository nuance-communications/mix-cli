/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {expect, test} from '@oclif/test'
import {mixAPIServerURL} from '../../mocks'
import testData from './bot-interfaces-test-data'

import * as sf from '../../../src/utils/save-file'

const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')

chai.should()
chai.use(sinonChai)

const {
  botInterfacesGetResponse,
} = testData

describe('bot-interfaces:export command', () => {
  const botId = '456'
  const configId = '321'
  const endpoint = `/v4/bots/${botId}/configs/${configId}/interface`

  describe('bot-interfaces:export command with valid bot Id, configuration Id and default filepath', () => {
    const defaultFilepath = `interface-bot-${botId}-config-${configId}.json`
    const overwrite = false
    const saveArgs = {
      response: botInterfacesGetResponse,
      filepath: defaultFilepath,
      overwrite: overwrite
    }
    const saveFileStub = sinon.stub().returns(undefined)

    after(() => {
      saveFileStub.reset()
    })

    test
      .nock(mixAPIServerURL, (api) =>
        api
          .get(endpoint)
          .reply(200, botInterfacesGetResponse)
      )
      .stub(sf, 'saveFile', () => saveFileStub(saveArgs))
      .stdout()
      .command(['bot-interfaces:export', '-B', botId, '-C', configId])
    .it('bot-interfaces:export provides human-readable output for given bot and configuration with default filepath', (ctx) => {
      expect(saveFileStub.calledWith(saveArgs)).equals(true)
      expect(ctx.stdout).to.contain(`saved to file ${defaultFilepath}`)
    })

    const error = new Error('file already exist')
    const failedSaveFileStub = sinon.stub().throws(error)

    after(() => {
      failedSaveFileStub.reset()
    })
    
    test
      .nock(mixAPIServerURL, (api) =>
        api
          .get(endpoint)
          .reply(200, botInterfacesGetResponse)
      )
      .stub(sf, 'saveFile', failedSaveFileStub)
      .stdout()
      .command(['bot-interfaces:export', '-B', botId, '-C', configId])
      .catch(ctx => {
        expect(ctx.message).to.contain('file already exist')
      })
    .it('bot-interfaces:export errors out when file already exist')
  }),

  describe('bot-interfaces:export command with valid botId, configuration Id and given filepath', () => {
    const filepath = `interface-${botId}-${configId}.json`
    const saveFileStub = sinon.stub().returns(undefined)

    after(() => {
      saveFileStub.reset()
    })
  
    test
      .nock(mixAPIServerURL, (api) =>
        api
          .get(endpoint)
          .reply(200, botInterfacesGetResponse)
      )
      .stub(sf, 'saveFile', () => saveFileStub)
      .stdout()
      .command(['bot-interfaces:export', '-B', botId, '-C', configId, '-f', filepath])
    .it('bot-interfaces:export provides human-readable output for given bot and configuration with filepath', (ctx) => {
      expect(ctx.stdout).to.contain(`saved to file ${filepath}`)
    })

    test
      .nock(mixAPIServerURL, (api) =>
        api
          .get(endpoint)
          .reply(200, botInterfacesGetResponse)
      )
      .stub(sf, 'saveFile', () => saveFileStub)
      .stdout()
      .command(['bot-interfaces:export', '-B', botId, '-C', configId, '-f', filepath, '--overwrite'])
    .it('bot-interfaces:export provides human-readable output for given bot and configuration with overwriting filepath', (ctx) => {
      const [firstLine] = ctx.stdout.split('\n').map(ln => ln.trim())
      expect(firstLine).to.contain(`saved to file ${filepath}`)
    })    
  }),
  
  describe('bot-interfaces:export handling of missing flags', () => {
    const botId = '456'
    const configId = '321'
    
    test
      .stderr()
      .command(['bot-interfaces:export'])
      .catch(ctx => {
        expect(ctx.message).to.contain('Missing required flag')
      })
    .it('bot-interfaces:export errors out when no parameters supplied')

    test
      .stderr()
      .command(['bot-interfaces:export', '-B', botId])
      .catch(ctx => {
        expect(ctx.message).to.contain('Missing required flag')
      })
    .it('bot-interfaces:export errors out when configuration Id not supplied')

    test
      .stderr()
      .command(['bot-interfaces:export', '-C', configId])
      .catch(ctx => {
        expect(ctx.message).to.contain('Missing required flag')
      })
    .it('bot-interfaces:export errors out when bot Id not supplied')
  })
})
