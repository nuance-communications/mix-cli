/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

export default {
    invalidValuesResponse: {
      code: 400,
      message: 'Invalid application ID provided',
      details: []
    },
    unauthorizedResponse: {
      code: 401,
      status: 'Unauthorized',
      message: 'The request could not be authorized'
    },
    forbiddenAccessResponse: {
      code: 403,
      message: 'Access is denied',
      details: []
    },
    notFoundResponse: {
      code: 404,
      message: 'Application not found',
      details: []
    },
    conflictResponse: {
      code: 409,
      message: 'The request conflicts with your application configuration',
      details: []
    },
    unexpectedStatusResponse: {
      code: 500,
      message: 'Backend returned status code 500',
      details: []
    }
}
