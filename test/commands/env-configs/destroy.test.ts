/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import { CliUx } from "@oclif/core";
import { expect, test } from "@oclif/test";


const chai = require("chai")
const sinon = require("sinon")
const sinonChai = require("sinon-chai")


chai.should()
chai.use(sinonChai)

const testData = require("../../test-data");
const serverURL = `https://${testData.server}`;

describe("env-configs:destroy command", () => {
  const promptStub = sinon.stub()

  let project = 1;
  let envId = 1001;
  let envGeoId = 9;
  let label = "GRAMMAR_BASE_PATH";

  afterEach(() => {
    promptStub.reset()
  })

  test
    .env(testData.env)
    .do(() => {
      promptStub.onFirstCall().resolves(project.toString())
    })
    .stub(CliUx.ux, 'prompt', () => promptStub)
    .nock(serverURL, (api) =>
      api
        .delete(`/v4/projects/${project}/env-configs/${label}`)
        .reply(200)
    )
    .stdout()
    .command([
      "env-configs:destroy",
      `--project=${project}`,
      `--label=${label}`,
    ])
    .it("destroys default environment configuration", (ctx) => {
      expect(ctx.stdout).to.contain(`destroyed successfully`);
    });

  test
    .env(testData.env)
    .do(() => {
      promptStub.onFirstCall().resolves(project.toString())
    })
    .stub(CliUx.ux, 'prompt', () => promptStub)
    .nock(serverURL, (api) =>
      api
        .delete(
          `/v4/environments/${envId}/geographies/${envGeoId}/configs/${label}`,
        )
        .query({
          projectId: project,
        })
        .reply(200)
    )
    .stdout()
    .command([
      "env-configs:destroy",
      `--project=${project}`,
      `--env=${envId}`,
      `--env-geo=${envGeoId}`,
      `--label=${label}`,
    ])
    .it("destroys environment configuration with env and env-geo", (ctx) => {
      expect(ctx.stdout).to.contain(`destroyed successfully`);
    });

  test
    .env(testData.env)
    .stderr()
    .command([
      "env-configs:destroy",
      `--project=${project}`,
      `--env=${envId}`,
      `--label=${label}`,
    ])
    .catch((ctx) => {
      expect(ctx.message).to.contain(
        `All of the following must be provided when using --env: --env-geo`
      );
    })
    .it("fails to destroy environment configuration with env but no env-geo");

  test
    .env(testData.env)
    .stderr()
    .command([
      "env-configs:destroy",
      `--project=${project}`,
      `--env-geo=${envGeoId}`,
      `--label=${label}`,
    ])
    .catch((ctx) => {
      expect(ctx.message).to.contain(
        `All of the following must be provided when using --env-geo: --env`
      );
    })
    .it("fails to destroy environment configuration with env-geo but no env");

    test
    .env(testData.env)
    .stderr()
    .command([
      "env-configs:destroy",
      `--label=${label}`,
    ])
    .catch((ctx) => {
      expect(ctx.message).to.contain(
        `Missing required flag project`
      );
    })
    .it("fails to destroy environment configuration with no project ID");

  test
    .env(testData.env)
    .stderr()
    .command([
      "env-configs:destroy",
      `--project=ok123`,
      `--label=${label}`,
    ])
    .catch((ctx) => {
      expect(ctx.message).to.contain(
        'Expected an integer'
      );
    })
    .it("fails to destroy environment configuration with invalid project ID");
});
