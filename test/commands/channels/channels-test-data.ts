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
  },
  configure: {
    flags: {
      project: '123',
      channel: 'very-long-uuid',
      modes: ['dtmf', 'tts', 'richtext'],
      color: 'light-pink'
    },
    expectedBody: {
      channelId: 'very-long-uuid',
      modes: ['DTMF', 'TTS', 'RICH_TEXT'],
      color: 'LIGHT_PINK',
    },
    expectedResult: {
      channel: {
        id: 'very-long-uid',
        displayName: 'Test channel',
        codeName: 'custom',
        modes: ['DTMF', 'TTS', 'RICH_TEXT'],
        color: 'LIGHT_PINK',
      },
      isActive: true,
    }
  },
  request: {
    projectId: '1922',
    channel: '8f3e480e-f8e2-4274-8daf-ae8a304f11e4',
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
  },
  activate: {
    response: { code: 0, message: 'Channel activated.', details: [] }
  }
}
