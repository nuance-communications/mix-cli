/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import cli from 'cli-ux'
import {expect, test} from '@oclif/test'
import {mixAPIServerURL} from '../../mocks'
import testData from './grammars-test-data'

import * as createFormModule from '../../../src/mix/api/utils/create-form'

const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const strip = require('strip-ansi')

chai.should()
chai.use(sinonChai)

const {
  grammarsReplaceResponse,
} = testData

const getHeaders = () => ({
  'Content-Type': 'multipart/form-data; boundary=--------------------------461709635804907982362641'
})

describe('grammars:replace command', () => {
  const projectId = '254'
  const entityName = 'DrinkEntity'
  const filepath = `./grammars.grxml`
  const endpoint = `/v4/projects/${projectId}/entities/${entityName}/grammars/.replace`
  const promptStub = sinon.stub()
  const createFormStub = sinon.stub().returns({getHeaders})

  afterEach(() => {
    promptStub.reset()
  })

  after(() => {
    createFormStub.reset()
  })

  describe('grammars:replace command with valid projectId, entityName and filepath', () => {
    describe('grammars:replace command with user confirmation', () => {
      test
        .do(() => {
          promptStub.onFirstCall().resolves(entityName)
        })
        .stub(cli, 'prompt', () => promptStub)
        .nock(mixAPIServerURL, (api) =>
          api
            .post(endpoint)
            .reply(200, grammarsReplaceResponse)
        )
        .stub(createFormModule, 'createForm', () => createFormStub(filepath))
        .stdout()
        .stderr()
        .command(['grammars:replace', '-P', projectId, '-E', entityName, '-f', filepath])
      .it('grammars:replace provides human-readable output for given project, entity and filepath with confirmation', (ctx) => {
        expect(createFormStub.calledWith(filepath)).to.be.true
        const promptMessages = promptStub.args.map(([msg]: any) => strip(msg))
        expect(promptMessages[0]).to.contain(`Confirm replace action by typing ${entityName} ('no' to abort)`)
        expect(ctx.stdout).to.contain('replaced successfully')
      })

      test
        .do(() => {
          promptStub.onFirstCall().resolves('no')
        })
        .stub(cli, 'prompt', () => promptStub)
        .stdout()
        .stderr()
        .command(['grammars:replace', '-P', projectId, '-E', entityName, '-f', filepath])
      .it('grammars:replace provides human-readable output for given project, entity and filepath with rejection', (ctx) => {
        expect(ctx.stdout).to.contain('Aborting')
      })
    }),

    describe('grammars:replace command with pre-confirmation', () => {
      test
        .nock(mixAPIServerURL, (api) =>
          api
            .post(endpoint)
            .reply(200, grammarsReplaceResponse)
        )
        .stub(createFormModule, 'createForm', () => createFormStub(filepath))
        .stdout()
        .command(['grammars:replace',
          `-P=${projectId}`,
          `-E=${entityName}`,
          `-f=${filepath}`,
          `-c=${entityName}`
          ])
      .it('grammars:replace provides human-readable output for given project, entity and filepath with pre-confirmation', (ctx) => {
        expect(createFormStub.calledWith(filepath)).to.be.true
        expect(ctx.stdout).to.not.contain(`Consider making a backup of your grammars first`)
        expect(ctx.stdout).to.contain('replaced successfully')
        promptStub.should.not.have.been.called
      })

      const wrongEntity = 'Drnk'
      test
        .stub(createFormModule, 'createForm', createFormStub)
        .stdout()
        .command(['grammars:replace',
          `-P=${projectId}`,
          `-E=${entityName}`,
          `-f=${filepath}`,
          `-c=${wrongEntity}`
         ])
        .catch(ctx => {
          expect(ctx.message).to.contain('--confirm flag does not match expected value')
        })
      .it('grammars:replace errors out when --confirm flag does not match expected value')
    })
  }),
  
  describe('grammars:replace handling of missing flags', () => {
    const projectId = '254'
    const entityName = 'DrinkEntity'
    const filepath = './grammars.grxml'
    
    test
      .stderr()
      .command(['grammars:replace'])
      .catch(ctx => {
        expect(ctx.message).to.contain('Missing required flag')
      })
    .it('grammars:replace errors out when no parameters supplied')

    test
      .stderr()
      .command(['grammars:replace', '-P', projectId])
      .catch(ctx => {
        expect(ctx.message).to.contain('Missing required flag')
      })
    .it('grammars:replace errors out when entityName and filepath not supplied')

    test
      .stderr()
      .command(['grammars:replace', '-E', entityName])
      .catch(ctx => {
        expect(ctx.message).to.contain('Missing required flag')
      })
    .it('grammars:replace errors out when projectId and filepath not supplied')

    test
      .stderr()
      .command(['grammars:replace', '-f', filepath])
      .catch(ctx => {
        expect(ctx.message).to.contain('Missing required flag')
      })
    .it('grammars:replace errors out when projectId and entityName not supplied')

    test
      .stderr()
      .command(['grammars:replace', '-P', projectId, '-E', entityName])
      .catch(ctx => {
        expect(ctx.message).to.contain('Missing required flag')
      })
    .it('grammars:replace errors out when filepath not supplied')

    test
      .stderr()
      .command(['grammars:replace', '-P', projectId, '-f', filepath])
      .catch(ctx => {
        expect(ctx.message).to.contain('Missing required flag')
      })
    .it('grammars:replace errors out when entityName not supplied')

    test
      .stderr()
      .command(['grammars:replace', '-E', entityName, '-f', filepath])
      .catch(ctx => {
        expect(ctx.message).to.contain('Missing required flag')
      })
    .it('grammars:replace errors out when projectId not supplied')
  })
})
