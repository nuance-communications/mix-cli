/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

module.exports = {
  request: {
    orgId: "123",
    view: "AV_FULL",
  },
  response: {
    json: {
      applications: [
        {
          id: "456",
          applicationName: "Mix Sample App",
          configs: [
            {
              id: "config_a",
            },
            {
              id: "config_b",
            },
          ],
          createTime: 'now',
        },
        {
            id: "789",
            applicationName: "Mix Sample App 2",
            configs: [
              {
                id: "config_x",
              }
            ],
            createTime: 'later',
          },
      ],
      totalSize: 1,
    },
  },
}