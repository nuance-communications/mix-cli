/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */
import { EnvConfigListResponse } from "../../../src/mix/api/env-configs-types";

export const EnvConfigListTestData: {
  flags: {
    project: number;
  };
  response: {
    noProjectDefaultsData: EnvConfigListResponse;
    oneProjectDefaultsData: EnvConfigListResponse;
    twoProjectsDefaultData: EnvConfigListResponse;
    noEnvironmentDefaultsData: EnvConfigListResponse;
  };
} = {
  response: {
    noProjectDefaultsData: {
      projectDefaults: [],
      environments: [
        {
          id: "64",
          name: "Sandbox",
          environmentGeographies: [
            {
              id: "1",
              name: "Azure US",
              environmentGeographyDefaults: [
                {
                  label: "GRAMMAR_BASE_PATH",
                  value: "http://www.geographydefault.com/",
                },
              ],
            },
          ],
        },
        {
          id: "254",
          name: "Dev",
          environmentGeographies: [
            {
              id: "10",
              name: "Sandbox US",
              environmentGeographyDefaults: [],
            },
          ],
        },
        {
          id: "255",
          name: "Stage",
          environmentGeographies: [
            {
              id: "11",
              name: "Production US",
              environmentGeographyDefaults: [],
            },
          ],
        },
        {
          id: "256",
          name: "Production",
          environmentGeographies: [
            {
              id: "11",
              name: "Production US",
              environmentGeographyDefaults: [],
            },
          ],
        },
      ],
    },
    oneProjectDefaultsData: {
      projectDefaults: [
        {
          label: "GRAMMAR_BASE_PATH",
          value: "http://www.projectdefault.com/",
        },
      ],
      environments: [
        {
          id: "64",
          name: "Sandbox",
          environmentGeographies: [
            {
              id: "1",
              name: "Azure US",
              environmentGeographyDefaults: [
                {
                  label: "GRAMMAR_BASE_PATH",
                  value: "http://www.geographydefault.com/",
                },
              ],
            },
          ],
        },
        {
          id: "254",
          name: "Dev",
          environmentGeographies: [
            {
              id: "10",
              name: "Sandbox US",
              environmentGeographyDefaults: [],
            },
          ],
        },
        {
          id: "255",
          name: "Stage",
          environmentGeographies: [
            {
              id: "11",
              name: "Production US",
              environmentGeographyDefaults: [],
            },
          ],
        },
        {
          id: "256",
          name: "Production",
          environmentGeographies: [
            {
              id: "11",
              name: "Production US",
              environmentGeographyDefaults: [],
            },
          ],
        },
      ],
    },
    twoProjectsDefaultData: {
      projectDefaults: [
        {
          label: "NEW_DEFAULT_LABEL",
          value: "http://www.new-label.com/",
        },
      ],
      environments: [
        {
          id: "64",
          name: "Sandbox",
          environmentGeographies: [
            {
              id: "1",
              name: "Azure US",
              environmentGeographyDefaults: [
                {
                  label: "GRAMMAR_BASE_PATH",
                  value: "http://www.geographydefault.com/",
                },
              ],
            },
          ],
        },
        {
          id: "254",
          name: "Dev",
          environmentGeographies: [
            {
              id: "10",
              name: "Sandbox US",
              environmentGeographyDefaults: [],
            },
          ],
        },
        {
          id: "255",
          name: "Stage",
          environmentGeographies: [
            {
              id: "11",
              name: "Production US",
              environmentGeographyDefaults: [],
            },
          ],
        },
        {
          id: "256",
          name: "Production",
          environmentGeographies: [
            {
              id: "11",
              name: "Production US",
              environmentGeographyDefaults: [],
            },
          ],
        },
      ],
    },
    noEnvironmentDefaultsData: {
      projectDefaults: [
        {
          label: "GRAMMAR_BASE_PATH",
          value: "http://www.projectdefault.com/",
        },
      ],
      environments: [
        {
          id: "64",
          name: "Sandbox",
          environmentGeographies: [
            {
              id: "1",
              name: "Azure US",
              environmentGeographyDefaults: [],
            },
          ],
        },
        {
          id: "254",
          name: "Dev",
          environmentGeographies: [
            {
              id: "10",
              name: "Sandbox US",
              environmentGeographyDefaults: [],
            },
          ],
        },
        {
          id: "255",
          name: "Stage",
          environmentGeographies: [
            {
              id: "11",
              name: "Production US",
              environmentGeographyDefaults: [],
            },
          ],
        },
        {
          id: "256",
          name: "Production",
          environmentGeographies: [
            {
              id: "11",
              name: "Production US",
              environmentGeographyDefaults: [],
            },
          ],
        },
      ],
    },
  },
  flags: {
    project: 1922,
  },
};
