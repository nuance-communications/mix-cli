/*
  * Copyright 2022, Nuance, Inc. and its contributors.
  * All rights reserved.
  *
  * This source code is licensed under the Apache-2.0 license found in
  * the LICENSE file in the root directory of this source tree.
  */

module.exports = {
  rename: {
      flags: {
          project: '123',
          channel: 'very-long-uuid',
          name: 'renamed channel'
      },
      response: {
          data: {
              displayName: 'renamed channel'
          }
      }
  }
}