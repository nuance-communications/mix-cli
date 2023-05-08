/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {expect, test} from '@oclif/test'
import {PrettyPrintableError} from '@oclif/core/lib/errors'

const chai = require('chai')
const sinonChai = require('sinon-chai')

chai.should()
chai.use(sinonChai)

const responseData = {project: {displayName: 'Test Project'}} // actual project data not important for unit tests here
const testData = require('../../test-data')
const serverURL = `https://${testData.server}`

describe('projects:create command', () => {
  test
    .env(testData.env)
    .stdout()
    .stderr()
    .nock(serverURL, api => api
    .post("/v4/organizations/64/projects")
    .reply(200, responseData)
    )
    .command(['projects:create',
      '-n=MyProject',
      '-O=64',
      '-L=en-US',
      '-t=gen',
      '-c=MyChannel',
      '-m=dtmf'])
    .it('creates a project', ctx => {
      expect(ctx.stdout).to.match(/Project.*created./)
    })

  test
    .env(testData.env)
    .stdout()
    .stderr()
    .nock(serverURL, api => api
    .post("/v4/organizations/64/projects")
    .reply(200, responseData)
    )
    .command(['projects:create',
      '-n=MyProject',
      '-O=64',
      '-L=en-US',
      '-t=gen',
      '-c=MyChannel',
      '-m=dtmf',
      '--child-data-compliant',
      '--description="This is the project description"',
    ])
    .it('creates a child-data-compliant project', ctx => {
      expect(ctx.stdout).to.match(/Project.*created./)
    })

  test
    .env(testData.env)
    .stderr()
    .command(['projects:create',
      '-n=MyProject',
      '-O=64',
      '-L=en-US',
      '-t=gen',
      '-c=MyChannel',
      '-m=dtmf',
      '--child-data-compliant',
    ])
    .catch(ctx => {
      const err: PrettyPrintableError = ctx
      expect(err.message).to.contain('Expected project description')
    })
    .it('exits on validation error if a description is not present with the child-data-compliant flag', ctx => {
    })

  test
    .env(testData.env)
    .stdout()
    .stderr()
    .nock(serverURL, api => api
    .post("/v4/organizations/64/projects")
    .reply(200, responseData)
    )
    .command(['projects:create',
      '-n=MyProject',
      '-O=64',
      '-L=en-US',
      '-t=gen',
      '-c=MyChannel',
      '-m=dtmf',
      '--json'])
    .it('creates a project and shows json response', ctx => {
      expect(ctx.stdout).to.equal(`${JSON.stringify(responseData, undefined, 2)}\n`)
    })

  test
    .env(testData.env)
    .stdout()
    .stderr()
    .command(['projects:create',
      '-n=MyProject',
      '-O=64',
      '-L=en-US',
      '-t=gen',
      '-c=MyChannel',
      '-m=badmode'])
    .catch(ctx => {
      const err: PrettyPrintableError = ctx
      expect(err.message).to.contain('invalid value for mode: badmode')
    })
    .it('outputs message when there is an error')

  test
    .env(testData.env)
    .stdout()
    .stderr()
    .command(['projects:create',
      '-n=MyProject',
      '-O=64',
      '-L=en-US',
      '-t=gen',
      '-c=MyChannel',
      '-m=dtmf',
      '-m=tts'])
    .catch(error => {
      expect(error.message).to.contain('Expected number of channels to match number of modes lists')
    })
    .it('fails when number of channels is not number of sets of modalities')
})
