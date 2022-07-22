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
      modes: ['dtmf', 'tts', 'rich_text'],
      color: 'light_pink'
    },
    expectedBody: {
      channelId: 'very-long-uuid',
      modes: ['DTMF', 'TTS', 'RICH_TEXT'],
      color: 'LIGHT_PINK',
    },
    expectedResult: {
      "channel": {
        "id": 'very-long-uid',
        "displayName": 'Test channel',
        "codeName": 'custom',
        "modes": ['DTMF', 'TTS', 'RICH_TEXT'],
        "color": "LIGHT_PINK",
      },
      "isActive": true,
    }
  }
}
