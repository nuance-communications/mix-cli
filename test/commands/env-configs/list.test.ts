/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import { expect, test } from "@oclif/test";

import { EnvConfigListTestData } from "./env-configs-test-data";
const testData = require("../../test-data");
const serverURL = `https://${testData.server}`;

describe("env-configs:list command", () => {
  const {
    flags: { project },
    response: {
      noProjectDefaultsData,
      oneProjectDefaultsData,
      twoProjectsDefaultData,
      noEnvironmentDefaultsData,
    },
  } = EnvConfigListTestData;
  
  const endpoint = `/v4/projects/${project}/env-configs`;

  test
    .env(testData.env)
    .nock(serverURL, (api) =>
      api.get(endpoint).reply(200, noProjectDefaultsData)
    )
    .stdout()
    .command(["env-configs:list", `--project=${project}`])
    .it(
      "lists out environment configurations for project with no project defaults",
      (ctx) => {
        const lines = ctx.stdout.split("\n").map((ln) => ln.trim());
        const headers = lines[0].split(/\s+/);
        expect(headers).to.deep.equal([
          "EnvId",
          "EnvName",
          "EnvGeoId",
          "EnvGeoName",
          "Label",
          "Value",
          "DefaultValue",
        ]);

        expect(ctx.stdout.match(/GRAMMAR_BASE_PATH/g)).to.have.lengthOf(1);
        expect(
          ctx.stdout.match(/http:\/\/www\.geographydefault\.com/g)
        ).to.have.lengthOf(1);
        expect(ctx.stdout.match(/Azure US/g)).to.have.lengthOf(1);
        expect(ctx.stdout.match(/Dev/g)).to.have.lengthOf(1);
        expect(ctx.stdout.match(/Stage/g)).to.have.lengthOf(1);
        expect(ctx.stdout.match(/Production US/g)).to.have.lengthOf(2);

        // this is no project default, and 4 environments in total, so 4 rows.
        // add in the headers and the separator => 2 rows.
        expect(ctx.stdout.split("\n").filter(Boolean)).to.have.lengthOf(6);
      }
    );

  test
    .env(testData.env)
    .nock(serverURL, (api) =>
      api.get(endpoint).reply(200, oneProjectDefaultsData)
    )
    .stdout()
    .command(["env-configs:list", `--project=${project}`])
    .it(
      "lists out environment configurations for project with one project default",
      (ctx) => {
        expect(ctx.stdout.match(/GRAMMAR_BASE_PATH/g)).to.have.lengthOf(4);

        expect(
          ctx.stdout.match(/http:\/\/www\.geographydefault\.com/g)
        ).to.have.lengthOf(1);
        expect(
          ctx.stdout.match(/http:\/\/www\.projectdefault\.com/g)
        ).to.have.lengthOf(4);

        expect(ctx.stdout.match(/Azure US/g)).to.have.lengthOf(1);
        expect(ctx.stdout.match(/Dev/g)).to.have.lengthOf(1);
        expect(ctx.stdout.match(/Stage/g)).to.have.lengthOf(1);
        expect(ctx.stdout.match(/Production US/g)).to.have.lengthOf(2);

        // this has one project default and one geography default with the same label => 1 * 4 => 4 rows.
        // add in the headers and the separator => 2 rows.
        expect(ctx.stdout.split("\n").filter(Boolean)).to.have.lengthOf(6);
      }
    );

  test
    .env(testData.env)
    .nock(serverURL, (api) =>
      api.get(endpoint).reply(200, twoProjectsDefaultData)
    )
    .stdout()
    .command(["env-configs:list", `--project=${project}`])
    .it(
      "lists out environment configurations for project with two available labels",
      (ctx) => {
        expect(ctx.stdout.match(/GRAMMAR_BASE_PATH/g)).to.have.lengthOf(1);
        expect(ctx.stdout.match(/NEW_DEFAULT_LABEL/g)).to.have.lengthOf(4);

        expect(
          ctx.stdout.match(/http:\/\/www\.geographydefault\.com/g)
        ).to.have.lengthOf(1);
        expect(
          ctx.stdout.match(/http:\/\/www\.new-label\.com/g)
        ).to.have.lengthOf(4);

        // there's one geography default for this with a different label than the project default
        expect(ctx.stdout.match(/Azure US/g)).to.have.lengthOf(2);

        expect(ctx.stdout.match(/Dev/g)).to.have.lengthOf(1);
        expect(ctx.stdout.match(/Stage/g)).to.have.lengthOf(1);
        expect(ctx.stdout.match(/Production US/g)).to.have.lengthOf(2);

        // there is one project default so that's 1 * 4 => 4 rows.
        // there is one geography default for a different label so that's 1 row.
        // add in the headers and the separator => 2 rows.
        expect(ctx.stdout.split("\n").filter(Boolean)).to.have.lengthOf(7);
      }
    );

  test
    .env(testData.env)
    .nock(serverURL, (api) =>
      api.get(endpoint).reply(200, noEnvironmentDefaultsData)
    )
    .stdout()
    .command(["env-configs:list", `--project=${project}`])
    .it(
      "lists out environment configurations for project with one project default and no environment geography defaults",
      (ctx) => {
        expect(ctx.stdout.match(/GRAMMAR_BASE_PATH/g)).to.have.lengthOf(4);

        expect(
          ctx.stdout.indexOf("http://www.geographydefault.com")
        ).to.be.equal(-1);
        expect(
          ctx.stdout.match(/http:\/\/www\.projectdefault\.com/g)
        ).to.have.lengthOf(4);

        expect(ctx.stdout.match(/Azure US/g)).to.have.lengthOf(1);

        expect(ctx.stdout.match(/Dev/g)).to.have.lengthOf(1);
        expect(ctx.stdout.match(/Stage/g)).to.have.lengthOf(1);
        expect(ctx.stdout.match(/Production US/g)).to.have.lengthOf(2);

        // there's one project default for 4 environments => 4 rows.
        // add in the headers and the separator => 2 rows.
        expect(ctx.stdout.split("\n").filter(Boolean)).to.have.lengthOf(6);
      }
    );

    test
      .env(testData.env)
      .stdout()
      .command(["env-configs:list"])
      .catch((ctx) => {
        expect(ctx.message).to.contain(
          `Missing required flag project`
        );
      })
      .it("fails to list environment configurations without --project");

    test
      .env(testData.env)
      .stdout()
      .command(["env-configs:list", "--project=abc"])
      .catch((ctx) => {
        expect(ctx.message).to.contain(
          `Expected an integer`
        );
      })
      .it("fails when provided invalid value for project");
});
