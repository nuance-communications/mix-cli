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
import {ChannelsDeactivateParams} from '../../mix/api/channels-types'

const debug = makeDebug('mix:commands:channels:deactivate')

export default class ChannelsDeactivate extends MixCommand {
  static description = `activate a channel in Mix project
  
  Use this command to deactivate a channel in a project.`

  static examples = [
    'mix channels:activate -P 1922 \\',
    '  --channel bc40667c-e0f6-11ec-9d64-0242ac120003 \\',
    '  --confirm',
  ]

  static flags = {
    project: MixFlags.projectWithDefaultFlag,
    channel: {
      ...MixFlags.channelMultipleFlag, // REVIEW: same as other command
      multiple: false,
    },
    // TODO: confirmation?
    ...MixFlags.machineOutputFlags,
  }

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

  outputHumanReadable(transformedData: any) {
    debug('outputHumanReadable()')
    this.log('Channel deactivated successfully.')
  }
}
