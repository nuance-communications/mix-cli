/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

export default {
  entityTypesListResponse: {
    entityTypes: [
      {
        name: "BASE",
        description: "Predefined Entity",
        compatibleDataTypes: [
          "SET"
        ]
      },
      {
        name: "FREEFORM",
        description: "Freefrom text",
        compatibleDataTypes: [
          "SET",
          "NUMBER"
        ]
      }
    ]
  },
  noEntityTypesResponse: {
    entityTypes: []
  }
}
