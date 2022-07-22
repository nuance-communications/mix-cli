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
import {ChannelModalities, ChannelsConfigParams} from '../../mix/api/channels-types'
import {asArray} from '../../utils/as-array'
import {MixClient, MixResponse, MixResult} from '../../mix/types'
import chalk from 'chalk'
import {channelColors} from '../../mix/api/utils/channel-colors'
import {DomainOption} from '../../utils/validations'

const debug = makeDebug('mix:commands:channels:configure')

export default class ChannelsConfigure extends MixCommand {
  static description = `update channel details in a project
  Configure the modalities and color of an existing channel in a Mix project.
  `

  static examples = [
    'mix channels:configure -P 1922  \\',
    '  --channel bc40667c-e0f6-11ec-9d64-0242ac120003 \\',
    '  --mode DTMF --mode TTS \\',
    '  --color SALMON',
  ]

  static flags = {
    project: MixFlags.projectFlag,
    channel: flags.string({
      char: 'C',
      description: 'channel id',
      required: true,
    }),
    mode: {
      ...MixFlags.modesFlag,
      required: false,
    },
    color: flags.string({
      description: 'channel color',
    }),
    json: MixFlags.jsonFlag,
    yaml: MixFlags.yamlFlag,
  }

  get domainOptions(): DomainOption[] {
    debug('get domainOptions()')
    return ['project']
  }

  tryDomainOptionsValidation(options: any, domainOptions: DomainOption[]) {
    debug('tryDomainOptionsValidation()')
    super.tryDomainOptionsValidation(options, domainOptions)

    // At least one flag must be set
    if (!options.mode && !options.color) {
      this.error('At least one of --mode and --color must be set.')
    }

    const color = options.color?.toUpperCase()

    if (color && !channelColors.slice(1).includes(color)) {
      this.error(`Unknown color ${chalk.red(options.color)}.`,
        {suggestions: ['check value supplied to --color flag and try again.']})
    }

    const modesSeen = Object.fromEntries(
      ChannelModalities
        .slice(1)
        .map((mode: string) => [mode, false]))

    const modesOptions = options.mode?.map((mode: string) => mode.toUpperCase())

    for (const mode of modesOptions ?? []) {
      if (!(mode in modesSeen)) {
        // TODO
        this.error(`Unknown mode ${chalk.red(mode)}`)
      } else if (modesSeen[mode]) {
        // TODO
        this.error(`Duplicate mode ${chalk.red(mode)} appears twice.`)
      }

      modesSeen[mode] = true
    }
  }

  async buildRequestParameters(options: Partial<flags.Output>): Promise<ChannelsConfigParams> {
    debug('buildRequestParameters()')

    const {
      project: projectId,
      channel: channelId,
      mode: modes,
      color,
    } = options

    return {
      projectId,
      channelId,
      modes: modes?.map((mode: string) => mode.toUpperCase()),
      color: color?.toUpperCase(),
    }
  }

  captureOptions() {
    super.captureOptions()
    this.options.mode = this.options.mode ?
      asArray(this.options.mode) :
      undefined
  }

  doRequest(client: MixClient, params: ChannelsConfigParams): Promise<MixResponse> {
    debug('doRequest()')

    return ChannelsAPI.updateChannel(client, params)
  }

  transformResponse(result: MixResult) {
    debug('transformResponse()')
    const {data} = result as any
    return data
  }

  outputHumanReadable(transformedData: any) {
    debug('outputHumanReadable()')

    const {displayName, id} = transformedData.channel
    this.log(`Channel ${chalk.cyan(displayName)} (id: ${chalk.cyan(id)}) updated successfully.
    `)
  }
}
