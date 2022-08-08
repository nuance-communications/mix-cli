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
import {ChannelsDeactivateParams} from '../../mix/api/channels-types'
import {MixClient, MixResponse} from '../../mix/types'
import MixCommand from '../../utils/base/mix-command'
import {DomainOption} from '../../utils/validations'

const debug = makeDebug('mix:commands:channels:deactivate')

export default class ChannelsDeactivate extends MixCommand {
  static description = `deactivate a channel
  
  Use this command to deactivate a channel in a project.`

  static examples = [
    'mix channels:deactivate -P 1922 \\',
    '  --channel bc40667c-e0f6-11ec-9d64-0242ac120003 \\',
    '  --confirm',
  ]

  static flags = {
    project: MixFlags.projectWithDefaultFlag,
    channel: flags.string({
      description: 'channel ID',
      required: true,
    }),
    confirm: MixFlags.confirmFlag,
    // output flags
    json: MixFlags.jsonFlag,
    yaml: MixFlags.yamlFlag,
  }

  action = 'deactivate'
  shouldConfirmCommand = true

  get domainOptions(): DomainOption[] {
    debug('get domainOptions()')
    return ['project']
  }

  async buildRequestParameters(options: flags.Output): Promise<ChannelsDeactivateParams> {
    debug('buildRequestParameters()')
    const {project: projectId, channel: channelId} = options

    return {projectId, channelId}
  }

  doRequest(client: MixClient, params: ChannelsDeactivateParams): Promise<MixResponse> {
    debug('doRequest()')
    return ChannelsAPI.deactivateChannel(client, params)
  }

  get expectedConfirmationValue() {
    debug('get expectedConfirmationValue()')

    return this.options.channel
  }

  warnBeforeConfirmation() {
    debug('warnBeforeConfirmation()')
    this.warn(chalk.yellow('This command will disable functionality in your Mix app until you reactivate the channel.'))
  }

  outputHumanReadable() {
    debug('outputHumanReadable()')
    this.log('Channel deactivated successfully.')
  }
}
