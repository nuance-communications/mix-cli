/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {flags} from '@oclif/command'
import makeDebug from 'debug'

import * as MixFlags from '../../utils/flags'
import * as ChannelsAPI from '../../mix/api/channels'
import MixCommand from '../../utils/base/mix-command'
import {DomainOption} from '../../utils/validations'
import {ChannelModalities, ChannelModality, ChannelsCreateParams} from '../../mix/api/channels-types'
import {asArray} from '../../utils/as-array'
import {MixClient, MixResponse, MixResult} from '../../mix/types'
import chalk from 'chalk'
import {channelColors} from '../../mix/api/utils/channel-colors'

const debug = makeDebug('mix:commands:channels:create')

export default class ChannelsCreate extends MixCommand {
  // TODO: longer description here
  static description = 'create a new channel in a project'

  static examples = [
    'mix channels:create -P 1922 --name "New IVR channel" --mode ivr',
  ]

  static flags = {
    project: MixFlags.projectFlag,
    name: flags.string({
      description: 'channel name',
      required: true,
    }),
    mode: MixFlags.modesFlag,
    color: flags.string({
      description: 'channel color',
    }),
  }

  get domainOptions(): DomainOption[] {
    debug('get domainOptions()')
    return ['project']
  }

  async buildRequestParameters(options: Partial<flags.Output>): Promise<ChannelsCreateParams> {
    debug('buildRequestParameters()')

    const {
      project: projectId,
      name: displayName,
      mode: _modes,
      color: _color,
    } = options

    // Check if all modes are valid and appear exactly once
    const modes = _modes?.map((mode: string) => mode.toUpperCase() as ChannelModality)
    const seen = new Set<ChannelModality>()

    for (const [i, mode] of modes.entries()) {
      if (!ChannelModalities.includes(mode)) {
        this.error(`Unknown channel modality ${chalk.red(_modes[i])}.
  Modalities must be one of:
  ${ChannelModalities.slice(1).join(', ')}.`,
        {suggestions: ['check value(s) supplied to --mode flag(s) and try again.']})
      }

      seen.add(mode)
      if (seen.size !== i + 1) {
        this.error(`Duplicate modality: ${chalk.red(_modes[i])} appears twice.`,
          {suggestions: ['check values supplied to --mode flags and try again.']})
      }
    }

    // Check for duplicate modes
    if (modes.length !== new Set(modes).size) {
      this.error('Duplicate modality found.',
        {suggestions: ['check values supplied to --mode flags and try again.']})
    }

    // Check for valid color
    const color = _color?.toUpperCase()
    if (color && !channelColors.slice(1).includes(color.toUpperCase())) {
      this.error(`Unknown color ${chalk.red(_color)}.`,
        {suggestions: ['check values supplied to --color flag and try again.']})
    }

    return {
      projectId,
      displayName,
      modes,
      color,
    }
  }

  captureOptions() {
    debug('captureOptions()')
    const {flags} = this.parse(ChannelsCreate)
    this.options = {
      ...flags,
      mode: asArray(flags.mode),
    }
  }

  doRequest(client: MixClient, params: ChannelsCreateParams): Promise<MixResponse> {
    debug('doRequest()')

    return ChannelsAPI.createChannel(client, params)
  }

  transformResponse(result: MixResult) {
    debug('transformResponse()')
    const {data} = result as any
    return data?.channel
  }

  outputHumanReadable(transformedData: any) {
    debug('outputHumanReadable()')

    const {displayName, id} = transformedData
    this.log(`Channel ${chalk.cyan(displayName)} created sucessfully (id: ${chalk.cyan(id)}).`)
  }
}
