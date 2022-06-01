/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import makeDebug from 'debug'
import { MixClient, MixResponse } from '../types'
import { ChannelsActivateParams, ChannelsRenameParams } from './channels-types'
import buildURL from './utils/build-url'

const debug = makeDebug('mix:api:channels')


/**
 * Change the display name of a channel in a project.
 * 
 * @category channels
 */
export async function renameChannel(client: MixClient, requestParams: ChannelsRenameParams): Promise<MixResponse> {
    debug('renameChannel()')
    const {projectId, channelId, displayName, ...searchParams} = requestParams

    const body = {displayName}

    return client.request({
        method: 'put',
        url: buildURL(client.getServer(), `/v4/projects/${projectId}/channels/${channelId}/.rename`, searchParams),
        data: body
    })
}

/**
 * Activate a channel in a project.
 * 
 * @category channels
 */
export async function activateChannel(client: MixClient, requestParams: ChannelsActivateParams): Promise<MixResponse> {
    debug('activateChannel()')
    const {projectId, channelId} = requestParams

    const body = {}

    return client.request({
        method: 'put',
        url: buildURL(client.getServer(), `/v4/projects/${projectId}/channels/${channelId}/.activate`),
        data: body
    })
}
