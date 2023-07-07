/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import { expect, test } from "@oclif/test";

const testData = require("../../test-data");
const serverURL = `https://${testData.server}`;

describe("env-configs:configure command", () => {
  let project = 1;
  let envId = 1001;
  let envGeoId = 9;
  let label = "GRAMMAR_BASE_PATH";
  let value = "http://www.test.com/";

  test
    .env(testData.env)
    .nock(serverURL, (api) =>
      api
        .put(`/v4/projects/${project}/env-configs/${label}`, `"${value}"`)
        .reply(200)
    )
    .stdout()
    .command([
      "env-configs:configure",
      `--project=${project}`,
      `--label=${label}`,
      `--value=${value}`,
    ])
    .it("configures default environment configuration", (ctx) => {
      const [firstLine, secondLine] = ctx.stdout.split("\n");
      expect(secondLine).to.contain(`configured successfully`);
    });

  test
    .env(testData.env)
    .nock(serverURL, (api) =>
      api
        .put(
          `/v4/environments/${envId}/geographies/${envGeoId}/configs/${label}`,
          `"${value}"`
        )
        .query({
          projectId: project,
        })
        .reply(200)
    )
    .stdout()
    .command([
      "env-configs:configure",
      `--project=${project}`,
      `--env=${envId}`,
      `--env-geo=${envGeoId}`,
      `--label=${label}`,
      `--value=${value}`,
    ])
    .it("configures environment configuration with env and env-geo", (ctx) => {
      const [firstLine, secondLine] = ctx.stdout.split("\n");
      expect(secondLine).to.contain(`configured successfully`);
    });

  test
    .env(testData.env)
    .stderr()
    .command([
      "env-configs:configure",
      `--project=${project}`,
      `--env=${envId}`,
      `--label=${label}`,
      `--value=${value}`,
    ])
    .catch((ctx) => {
      expect(ctx.message).to.contain(
        `All of the following must be provided when using --env: --env-geo`
      );
    })
    .it("fails to configure environment configuration with env but no env-geo");

  test
    .env(testData.env)
    .stderr()
    .command([
      "env-configs:configure",
      `--project=${project}`,
      `--env-geo=${envGeoId}`,
      `--label=${label}`,
      `--value=${value}`,
    ])
    .catch((ctx) => {
      expect(ctx.message).to.contain(
        `All of the following must be provided when using --env-geo: --env`
      );
    })
    .it("fails to configure environment configuration with env-geo but no env");

  test
    .env(testData.env)
    .stderr()
    .command([
      "env-configs:configure",
      `--label=${label}`,
      `--value=${value}`,
    ])
    .catch((ctx) => {
      expect(ctx.message).to.contain(
        `Missing required flag project`
      );
    })
    .it("fails to configure environment configuration with no project ID");

  test
    .env(testData.env)
    .stderr()
    .command([
      "env-configs:configure",
      `--project=ok123`,
      `--label=${label}`,
      `--value=${value}`,
    ])
    .catch((ctx) => {
      expect(ctx.message).to.contain(
        'Expected an integer'
      );
    })
    .it("fails to configure environment configuration with invalid project ID");
});
