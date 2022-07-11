/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import chalk from 'chalk'
import {flags} from '@oclif/command'
import makeDebug from 'debug'

import * as MixFlags from '../../utils/flags'
import * as ChannelsAPI from '../../mix/api/channels'
import {DomainOption} from '../../utils/validations'
import {MixClient, MixResponse} from '../../mix/types'
import MixCommand from '../../utils/base/mix-command'
import {Output} from '@oclif/parser/lib/flags'
import {ChannelsRenameParams} from '../../mix/api/channels-types'

const debug = makeDebug('mix:commands:channels:rename')

export default class ChannelsRename extends MixCommand {
  static description = `rename a channel in Mix project
    
    Use this command to change the name of a channel in a project.`

  static examples = [
    'mix channels:rename -P 1922 \\',
    '  --channel bc40667c-e0f6-11ec-9d64-0242ac120003 \\',
    '  --new-name "voice channel"',
  ]

  static flags = {
    project: MixFlags.projectWithDefaultFlag,
    channel: flags.string({
      description: 'channel id',
      required: true,
    }),
    'new-name': flags.string({
      required: true,
      description: 'new channel name',
    }),
    ...MixFlags.machineOutputFlags,
  }

  get domainOptions(): DomainOption[] {
    debug('get domainOptions()')
    return ['project']
  }

  async buildRequestParameters(options: Partial<Output>): Promise<ChannelsRenameParams> {
    debug('buildRequestParameters()')
    const {'new-name': displayName, project: projectId, channel: channelId} = options

    return {projectId, channelId, displayName}
  }

  doRequest(client: MixClient, params: ChannelsRenameParams): Promise<MixResponse> {
    debug('doRequest()')
    return ChannelsAPI.renameChannel(client, params)
  }

  outputHumanReadable(transformedData: any) {
    debug('outputHumanReadable()')
    const {displayName} = transformedData
    this.log(`Channel renamed to ${chalk.cyan(displayName)}.`)
  }
}
