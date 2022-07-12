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
    intent: 'ORDER_DRINK',
    invalidIntent: '1234',
    newName: 'ORDER_COFFEE',
    unknownIntent: 'NONE',
    unknownProject: '99999',
  },
  intentNotFoundResponse: { code: 5, message: 'No intent found.', details: [] },
  projectInvalidResponse: { code: 3, message: 'Project 99999 is not available.', details: [] } ,
  renameIntentResponse: {
    intent: {
      id: 'be567689-7948-45db-ae9a-8c18f5dc4634',
      name: 'ORDER_COFFEE',
      isInBaseOntology: false,
      links: []
    }
  }
}
