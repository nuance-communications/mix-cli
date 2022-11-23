/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

module.exports = {
  response: {
    invalidValuesResponse: {
      code: 400,
      message: "Invalid organization id provided",
      details: []
    },
    unauthorizedResponse: {
      code:401,
      status:"Unauthorized",
      message:"The request could not be authorized"
    },
    notFoundResponse: {
      code: 404,
      message: "Organization not found",
      details: []
    },
    conflictResponse: {
      code: 409,
      message: "The request conflicts with your project or application configuration.",
      details: []
    }
  },
}