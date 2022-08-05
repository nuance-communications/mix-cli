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
import {ChannelModalities, ChannelModality, ChannelsCreateParams} from '../../mix/api/channels-types'
import {highlightModeNames} from '../../mix/api/utils/channels-helpers'
import {MixClient, MixResponse, MixResult} from '../../mix/types'
import MixCommand from '../../utils/base/mix-command'
import {eInvalidValue} from '../../utils/errors'
import * as MixFlags from '../../utils/flags'
import {DomainOption, validateChannelColor, validateChannelModeOptions} from '../../utils/validations'

const debug = makeDebug('mix:commands:channels:create')

export default class ChannelsCreate extends MixCommand {
  static description = `create a new channel

Use this command to create a new channel in your Mix project.
A channel defines a collection of different modalities through
which users interact with your application. The currently available
modalities are:

audioscript
dtmf
interactivity
richtext
tts

Note that, for your convenience, this command will automatically convert
inputs to the --mode flag as close to the format of the above modes as possible,
by converting upper-case letters to lower-case and removing deliminating punctuation
('-' and '_'). So, the modes 'audioscript', 'AUDIO-SCRIPT', and 'a_u-d_i-o----scriPT'
are all equivalent to the server-side value of 'AUDIO_SCRIPT'. 

The same conversion is done for colours, except that dashes ('-') are replaced 
with ('_') rather than being deleted. So, 'light-pink', 'light____pink', and 
'LIGHT_PINK' are also equivalent.

Acceptable channel colors are:
blue          brown         corn-flower
cyan          green         grey
indigo        light-green   light-grey  
light-orange  light-pink    light-purple
orange        pink          purple
ruby          salmon        sky
teal          yellow

${chalk.bold('IMPORTANT:')} due to a current limitation in the V4 API,
both the --mode and --color flags ${chalk.bold('must be set.')}

In theory, at least one of these flags should be allowed to be optional,
with unset values resulting in the corresponding property on the channel
not being modified. However, this is currently not the case and, to
minimize unexpected behaviour, we have chosen to require both flags
until the limitation is resolved.
`

  static examples = [
    `mix channels:create -P 1922 --name "New IVR channel" \\
    --mode tts --mode interactivity --color light-pink`,
  ]

  static flags = {
    color: MixFlags.required(MixFlags.channelColorFlag),
    mode: MixFlags.modesFlag,
    name: flags.string({
      description: 'channel name',
      required: true,
    }),
    project: MixFlags.projectFlag,
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

    try {
      validateChannelColor(options.color)
    } catch {
      throw (eInvalidValue(`Invalid color ${chalk.red(options.color)} supplied to command.`,
        [
          'Check value of --color flag and try again.',
          `Enter ${chalk.green('mix channels:create help')} to review valid color options.`,
        ]))
    }

    try {
      validateChannelModeOptions(options.mode)
    } catch (error) {
      throw (eInvalidValue(
        highlightModeNames(error.message, options),
        error.suggestions))
    }
  }

  async buildRequestParameters(options: Partial<flags.Output>): Promise<ChannelsCreateParams> {
    debug('buildRequestParameters()')

    const {
      project: projectId,
      name: displayName,
      mode,
      color: _color,
    } = options

    const modes = mode?.map((mode: string) => mode.toLowerCase().replace(/[_-]/g, ''))
      .map((mode: ChannelModality) => ChannelModalities[mode])

    const color: string = _color?.toUpperCase().replace('-', '_')

    modes && debug('converted modes: %s', modes)
    color && debug('converted color: %s', color)

    return {
      projectId,
      displayName,
      ...(modes !== undefined && {modes}),
      ...(color !== undefined && {color}),
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
    this.log(`Channel ${chalk.cyan(displayName)} with ID ${chalk.cyan(id)} created.`)
  }
}
