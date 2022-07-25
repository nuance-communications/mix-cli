/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

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

export type ChannelsActivateParams = ChannelsPathParams
export type ChannelsRenameParams = ChannelsPathParams & ChannelsRenameBodyParams
