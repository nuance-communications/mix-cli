/*
  * Copyright 2022, Nuance, Inc. and its contributors.
  * All rights reserved.
  *
  * This source code is licensed under the Apache-2.0 license found in
  * the LICENSE file in the root directory of this source tree.
  */

import {flags} from '@oclif/command'
import chalk from 'chalk'
import makeDebug from 'debug'

import * as ChannelsAPI from '../../mix/api/channels'
import * as MixFlags from '../../utils/flags'
import {ChannelsActivateParams} from '../../mix/api/channels-types'
import {MixClient, MixResponse} from '../../mix/types'
import MixCommand from '../../utils/base/mix-command'
import {DomainOption} from '../../utils/validations'

const debug = makeDebug('mix:commands:channels:activate')

export default class ChannelsActivate extends MixCommand {
  static description = `activate a channel
  
  Use this command to activate a channel in a project.`

  static examples = [
    'mix channels:activate -P 1922 \\',
    '  --channel bc40667c-e0f6-11ec-9d64-0242ac120003',
  ]

  static flags = {
    project: MixFlags.projectWithDefaultFlag,
    channel: flags.string({
      description: 'channel ID',
      required: true,
    }),
    // output flags
    json: MixFlags.jsonFlag,
    yaml: MixFlags.yamlFlag,
  }

  get domainOptions(): DomainOption[] {
    debug('get domainOptions()')
    return ['project']
  }

  async buildRequestParameters(options: flags.Output): Promise<ChannelsActivateParams> {
    debug('buildRequestParameters()')
    const {project: projectId, channel: channelId} = options

    return {projectId, channelId}
  }

  doRequest(client: MixClient, params: ChannelsActivateParams): Promise<MixResponse> {
    debug('doRequest()')
    return ChannelsAPI.activateChannel(client, params)
  }

  outputHumanReadable(_transformedData: any) {
    debug('outputHumanReadable()')
    this.log(`Channel with ID ${chalk.cyan(this.options.channel)} activated successfully.`)
  }
}
