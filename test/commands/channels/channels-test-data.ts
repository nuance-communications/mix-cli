/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

module.exports = {
  request: {
    projectId: '1922',
    displayName: 'New test channel',
    color: 'light-pink'
  },
  response: {
    channel: {
      id: '8f3e480e-f8e2-4274-8daf-ae8a304f11e4',
      displayName: 'New test channel',
      codeName: 'custom',
      modes: ['DTMF', 'AUDIO_SCRIPT'],
      color: 'LIGHT_PINK'
    },
    isActive: true,
    extendedChannel: {
      id: '8f3e480e-f8e2-4274-8daf-ae8a304f11e4',
      displayName: 'New test channel',
      codeName: 'custom',
      modes: [
        {
          mode: 'DTMF',
          isActive: true,
        },
        {
          mode: 'AUDIO_SCRIPT',
          isActive: true,
        },
      ],
      color: 'LIGHT_PINK'
    }
  }
}
