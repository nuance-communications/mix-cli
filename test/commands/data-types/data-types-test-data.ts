/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

export default {
  dataTypesListResponse: {
    dataTypes: [
      {
        name: 'SET',
        schema: {
          schema: 'http://json-schema/schema#',
          title: 'SET',
          type: 'string',
          additionalProperties: false,
          description: 'Nothing set. Default.',
          properties: {}
        },
        compatibleEntityTypes: [
          {
            name: 'FREEFORM',
            default: false
          },
          {
            name: 'LIST',
            default: true
          }
        ]
      },
      {
        name: 'NUMBER',
        schema: {
          schema: 'http://json-schema/schema#',
          title: 'NUMBER',
          type: 'Integer',
          additionalProperties: false,
          description: 'Nothing set. Default.',
          properties: {}
        },
        compatibleEntityTypes: [
          {
            name: 'REGEX',
            default: false
          }
        ]
      },
    ]
  },
  noDataTypesResponse: {
    dataTypes: []
  }
}
