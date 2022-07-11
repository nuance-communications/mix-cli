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
import {cli} from 'cli-ux'
import {eNotConfirmed} from '../../utils/errors'

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
    channel: flags.string({
      description: 'channel id',
      required: true,
    }),
    confirm: flags.boolean({
      description: 'pre-confirm deactivation',
      default: false,
    }),
    ...MixFlags.machineOutputFlags,
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
    // NOTE: doInteractiveConfirmation is overridden.
    // This literal value is supplied to avoid runtime error.
    return 'YES_TYPE'
  }

  warnBeforeConfirmation() {
    debug('warnBeforeConfirmation()')
    this.warn(chalk.yellow('This command will disable functionality in your Mix app until you reactivate the channel.'))
  }

  checkPreConfirmation() {
    if (!this.options.confirm) {
      throw eNotConfirmed(this.options.confirm, 'true')
    }
  }

  async doInteractiveConfirmation(): Promise<boolean> {
    debug('doInteractiveConfirmation()')

    this.log()
    this.warnBeforeConfirmation()
    this.log()

    const answer = await cli.prompt(
      `Confirm channel deactivate?
This channel will be inactive until reactivated with ${chalk.yellow('mix channels:rename')}. (Y/yes to confirm)`,
    ) as string

    if (!/y(es)?/i.test(answer)) {
      return false
    }

    return true
  }

  outputHumanReadable() {
    debug('outputHumanReadable()')
    this.log('Channel deactivated successfully.')
  }
}
