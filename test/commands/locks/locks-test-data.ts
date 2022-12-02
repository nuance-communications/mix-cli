/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

export default {
  locksListResponse: {
    locks: [
      {
        lockId: '15',
        projectId: '457',
        lockOwner: {
          id: '2',
          email: 'example@gmail.com',
          name: 'Alice'
        },
        notes: 'string',
        createTime: 'now'
      },
      {
        lockId: '16',
        projectId: '458',
        lockOwner: {
          id: '4',
          email: 'example@gmail.com',
          name: 'Alex'
        },
        notes: 'export',
        createTime: 'later'
      }
    ],
    totalSize: 2,
    count: 2,
    limit: 25,
    offset: 0
  },
  noLocksReponse: {
    locks: [],
  },
}
