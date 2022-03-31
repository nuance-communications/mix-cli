/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

module.exports = {
  shortResponse: {
    organizations: [
      {
        id: "1",
        displayName: "Nuance Communications Inc.",
      },
      {
        id: "2",
        displayName: "test.user@test.com",
      },
    ]
  },
  fullResponse: {
    organizations: [
      {
        id: "1",
        displayName: "Nuance Communications Inc.",
        type: "STANDARD",
        members: [{}, {}, {}]
      },
      {
        id: "2",
        displayName: "test.user@test.com",
        type: "PERSONAL",
        members: [{}]
      },
    ],
  },
  sortedResponse: {
    organizations: [
      {
        id: "1",
        displayName: "Nuance Communications, Inc.",
        type: "STANDARD",
        members: []
      },
      {
        id: "14",
        displayName: "test.user1@test.com",
        type: "PERSONAL",
        members: []
      },
      {
        id: "85",
        displayName: "test.user2@test.com",
        type: "PERSONAL",
        members: []
      },
      {
        id: "118",
        displayName: "test.user3@test.com",
        type: "PERSONAL",
        members: []
      }
    ],
    totalSize: 4,
    count: 4,
    limit: 25,
    offset: 0
  }
}
