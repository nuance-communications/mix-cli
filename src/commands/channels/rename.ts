/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {Flags} from '@oclif/core'
import {FlagOutput} from '@oclif/core/lib/interfaces'
import chalk from 'chalk'
import makeDebug from 'debug'

import * as ChannelsAPI from '../../mix/api/channels'
import {ChannelsRenameParams} from '../../mix/api/channels-types'
import {MixClient, MixResponse} from '../../mix/types'
import MixCommand from '../../utils/base/mix-command'
import * as MixFlags from '../../utils/flags'
import {DomainOption, validateChannelName} from '../../utils/validations'

const debug = makeDebug('mix:commands:channels:rename')

export default class ChannelsRename extends MixCommand {
  static description = `rename a channel
    
Use this command to change the name of a channel in a project.`

  static examples = [
    'mix channels:rename -P 1922 \\',
    '  --channel bc40667c-e0f6-11ec-9d64-0242ac120003 \\',
    '  --new-name "voice channel"',
  ]

  static flags = {
    project: MixFlags.projectWithDefaultFlag,
    channel: MixFlags.required(MixFlags.channelFlag),
    'new-name': Flags.string({
      required: true,
      description: 'new channel name',
    }),
    // output flags
    json: MixFlags.jsonFlag,
    yaml: MixFlags.yamlFlag,
  }

  get domainOptions(): DomainOption[] {
    debug('get domainOptions()')
    return ['project', 'channel']
  }

  tryDomainOptionsValidation(options: any, domainOptions: DomainOption[]) {
    super.tryDomainOptionsValidation(options, domainOptions)

    validateChannelName(options['new-name'], 'new-name')
  }

  async buildRequestParameters(options: Partial<FlagOutput>): Promise<ChannelsRenameParams> {
    debug('buildRequestParameters()')
    const {'new-name': newName, project: projectId, channel: channelId} = options

    const displayName = newName.trim()

    return {projectId, channelId, displayName}
  }

  setRequestActionMessage(options: any) {
    debug('setRequestActionMessage()')
    const {channel, project} = options
    this.requestActionMessage = `Renaming channel with ID ${chalk.cyan(channel)} in project ${chalk.cyan(project)}`
  }

  doRequest(client: MixClient, params: ChannelsRenameParams): Promise<MixResponse> {
    debug('doRequest()')
    return ChannelsAPI.renameChannel(client, params)
  }

  outputHumanReadable(transformedData: any) {
    debug('outputHumanReadable()')
    const {channel: channelId} = this.options
    const {displayName} = transformedData
    this.log(`Channel with ID ${chalk.cyan(channelId)} successfully renamed to ${chalk.cyan(displayName)}.`)
  }
}
