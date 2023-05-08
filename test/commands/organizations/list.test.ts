/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {expect, test} from "@oclif/test"
import {PrettyPrintableError} from '@oclif/core/lib/errors'

const strip = require("strip-ansi")

const testData = require("../../test-data")
const serverURL = "https://" + testData.server
const td = require("./organizations-test-data")

const endpoint = "/v4/organizations"

describe("organizations:list command", () => {
  test
    .env(testData.env)
    .stdout()
    .nock(serverURL, api => 
        api.get(endpoint)
        .query({
          type: 'TYPE_UNSPECIFIED',
          view: 'VIEW_UNSPECIFIED',
          showAll: false,
          limit: 25,
        })
        .reply(200, td.shortResponse)

    ).command(['organizations:list', '--json'])
    .it('outputs all (standard view) orgs data as JSON', ctx => {
      const result = JSON.parse(ctx.stdout)
      expect(result).to.deep.equal(td.shortResponse)
      expect(result.organizations[0].displayName).to.equal("Nuance Communications Inc.")
  })
  
  test
    .env(testData.env)
    .stdout()
    .nock(serverURL, api => 
        api.get(endpoint)
        .query({
          type: 'TYPE_UNSPECIFIED',
          view: 'FULL',
          showAll: false,
          limit: 25,
        })
        .reply(200, td.fullResponse)

    ).command(['organizations:list', '--full', '--csv'])
    .it('outputs all (full view) orgs data as CSV', ctx => {
      const lines = ctx.stdout.split('\n').map(ln => ln.trim())
      expect(lines[0]).to.contain('Type')
      expect(lines[0]).to.contain('Members')
      
      const [_id, _displayName, _type, members] = lines[1].split(',')
      expect(members).to.equal('3')
  })

  test
    .env(testData.env)
    .stdout()
    .nock(serverURL, api => 
        api.get(endpoint)
        .query({
          type: 'STANDARD',
          view: 'FULL',
          showAll: false,
          limit: 25,
        })
        .reply(200, td.fullResponse)

    ).command(['organizations:list', '--csv', '--with-organization-type=standard', '--full'])
    .it('outputs all standard orgs data as CSV', ctx => {
      const lines = ctx.stdout.split('\n').map(ln => ln.trim())
      expect(lines[0]).to.contain('Type')
      expect(lines[0]).to.contain('Members')
      
      const [_id, _displayName, _type, members] = lines[1].split(',')
      expect(members).to.equal('3')
  })
  
  test
    .env(testData.env)
    .stdout()
    .nock(serverURL, api => 
        api.get(endpoint)
        .query({
          type: 'TYPE_UNSPECIFIED',
          view: 'VIEW_UNSPECIFIED',
          showAll: false,
          limit: 25,
          sortBy: '-name'
        })
        .reply(200, td.sortedResponse)

    ).command(['organizations:list', '--sort', '-name'])
    .it('outputs all orgs data as sorted by name', ctx => {
      const lines = ctx.stdout.split('\n').map(ln => ln.trim())
      const headers = lines[0].split(/\s+/)
      const first = lines[2].split(/\s+/)
      const second = lines[3].split(/\s+/)
      const third = lines[4].split(/\s+/)
      expect(headers).to.deep.equal(['OrganizationId','Name','Type'])
      expect(first).to.deep.equal(['118','test.user3@test.com','PERSONAL'])
      expect(second).to.deep.equal(['85','test.user2@test.com','PERSONAL'])
      expect(third).to.deep.equal(['14','test.user1@test.com','PERSONAL'])
  })

  test
    .env(testData.env)
    .stderr()
    .command(['organizations:list', '--with-organization-type=myorg'])
    .catch(ctx => {
      const err = ctx as PrettyPrintableError
      expect(strip(err.message)).to.contain(`Expected --with-organization-type=myorg to be one of: personal, standard`)
    })
    .it('errors out for invalid organization type')
})
