/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

export const channelColors = [
  'COLOR_UNSPECIFIED',
  'PURPLE',
  'LIGHT_ORANGE',
  'GREEN',
  'CORN_FLOWER',
  'PINK',
  'YELLOW',
  'TEAL',
  'LIGHT_GREY',
  'SALMON',
  'BROWN',
  'SKY',
  'GREY',
  'LIGHT_PURPLE',
  'RUBY',
  'LIGHT_GREEN',
  'BLUE',
  'LIGHT_PINK',
  'ORANGE',
  'CYAN',
  'INDIGO',
]

export function getColorCode(channelIndex: number): string {
  if (channelIndex >= channelColors.length) {
    throw new Error('a maximum of 17 custom channels is supported')
  }

  return channelColors[channelIndex]
}
