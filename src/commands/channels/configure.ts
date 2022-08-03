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
import {ChannelBodyModality, ChannelModalities, ChannelModality, ChannelsConfigParams} from '../../mix/api/channels-types'
import {MixClient, MixResponse, MixResult} from '../../mix/types'
import MixCommand from '../../utils/base/mix-command'
import {eInvalidValue} from '../../utils/errors'
import * as MixFlags from '../../utils/flags'
import {DomainOption, validateChannelColor, validateChannelModeOptions} from '../../utils/validations'

const debug = makeDebug('mix:commands:channels:configure')

export default class ChannelsConfigure extends MixCommand {
  static description = `update channel details in a project

Configure the modalities and color of an existing channel in a Mix project.
If either value is not supplied, the existing property on the channel will be unmodified.

A note on channel modes and colors:
For your convenience, you may enter modes and colors case-insensitively.
In particular, you can spell any given mode/color with lowercase or capital letters,
and with dashes ('-') in place of underscores ('_'). The value will be internally converted
into the format the Mix API expects before the request is made. As an example, the values
'light-pink', 'light_Pink', and 'LIGHT-PINK' are all equivalent to Mix's 'LIGHT_PINK'.

Acceptable channel modes are:
audioscript
dtmf
interactivity
richtext
tts

Acceptable channel colors are:
blue
brown
corn-flower
cyan
green
grey
indigo
light-green
light-grey
light-orange
light-pink
light-purple
orange
pink
purple
ruby
salmon
sky
teal
yellow

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
      description: 'channel ID',
      required: true,
    }),
    mode: {
      ...MixFlags.modesFlag,
      required: false,
    },
    color: flags.string({
      description: 'channel color',
    }),
    // output flags
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
    if (options.mode === undefined && options.color === undefined) {
      this.error('At least one of --mode and --color must be set.')
    }

    if (options.color !== undefined) {
      try {
        validateChannelColor(options.color)
      } catch {
        throw (eInvalidValue(`Invalid color ${chalk.red(options.color)} supplied.`,
          [
            'Check value of --color flag and try again.',
            `Enter ${chalk.green('mix channels:configure help')} to review valid color options.`,
          ]))
      }
    }

    if (options.mode !== undefined) {
      validateChannelModeOptions(options.mode)
    }

    if (!(options.mode && options.color)) {
      this.warn(chalk.yellow(`The V4 API currently requires both the --color and --mode flags to be set.
This is due to a server-side error in which the default values for these flags (i.e., when not modified)
are not recognized as valid.)`))
    }
  }

  async buildRequestParameters(options: Partial<flags.Output>): Promise<ChannelsConfigParams> {
    debug('buildRequestParameters()')

    const {
      project: projectId,
      channel: channelId,
      mode,
      color: _color,
    } = options

    debug('raw --mode: %s', mode)

    const modes: ChannelBodyModality[] | undefined =
      mode?.map((mode: string) => mode.toLowerCase().replace(/[_-]/g, ''))
        .map((mode: ChannelModality) => ChannelModalities[mode])

    const color: string | undefined = _color?.toUpperCase().replace('-', '_')

    modes && debug('converted modes: %s', modes)
    color && debug('converted color: %s', color)

    return {
      projectId,
      channelId,
      ...(modes !== undefined && {modes}),
      ...(color !== undefined && {color}),
    }
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
    this.log(`Channel ${chalk.cyan(displayName)} with ID ${chalk.cyan(id)} was updated successfully.
    `)
  }
}
