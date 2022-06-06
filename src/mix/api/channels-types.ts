/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {channelColors} from './utils/channel-colors'

/** @hidden */
export type ChannelsPathParams = {
  /** ID of the relevant project. */
  projectId: string;

  /** ID of the relevant channel. */
  channelId: string;
}

/** @hidden */
export type ChannelsRenameBodyParams = {
  /** Updated channel display name */
  displayName: string;
}

/** @hidden */
export type ChannelsCreatePathParams = {
  /** ID of the relevant project. */
  projectId: string;
}

// REVIEW: this should almost certainly be put in its own file
type ChannelModality =
    'MODE_UNSPECIFIED' |
    'RICH_TEXT' |
    'TTS' |
    'INTERACTIVITY' |
    'AUDIO_SCRIPT' |
    'DTMF'

type ChannelColor = typeof channelColors[number];

/** @hidden */
export type ChannelsCreateBodyParams = {
  /** Channel display name. */
  displayName: string;

  /** Modes available for the channel. */
  modes: ChannelModality[];

  /** Channel color. */
  color: ChannelColor;
}

export type ChannelsCreateParams = {projectId: string} & ChannelsCreateBodyParams
export type ChannelsRenameParams = ChannelsPathParams & ChannelsRenameBodyParams
