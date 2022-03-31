/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

module.exports = {
  export: {
    flags: {
      locale: 'en-US',
      project: 1922,
      filepath: './out.zip',
    },
    response: {
      data: {
      },
    },
  },
  import: {
    flags: {
      project: 1922,
      filepath: './ontology.zip',
    },
    response: {
      data: {
        id: 'long-random-job-id',
      },
    },
  },
}
