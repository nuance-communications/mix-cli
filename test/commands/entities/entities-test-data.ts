/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

module.exports = {
  request: {
    project: '1922',
    entity: 'DrinkSize',
    invalidEntity: '1234',
    newName: 'DrinkFormat',
    unknownEntity: 'NONE',
    unknownProject: '99999',
  },
  entityNotFoundResponse: { 
    code: 3,
    message: `400 Bad Request: "["Illegal Argument -> Bad Request Exception","Caused by: Unrecognized node 'DrinkSizeeeee'"]"`,
    details: [],
  },
  projectInvalidResponse: { code: 3, message: 'Project 99999 is not available.', details: [] } ,
  getEntityResponse: {
    entity: {
      listEntity: {
        id: 'some-long-uuid',
        name: 'DrinkSize',
        isDynamic: false,
        numLiterals: 9,
        settings: {
          isSensitive: false,
          canonicalize: true
        }
      }
    }
  },
}
