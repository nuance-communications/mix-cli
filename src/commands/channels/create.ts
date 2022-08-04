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
import {MixClient, MixResponse, MixResult} from '../../mix/types'
import MixCommand from '../../utils/base/mix-command'
import {eInvalidValue} from '../../utils/errors'
import * as MixFlags from '../../utils/flags'
import {DomainOption, validateChannelColor, validateChannelModeOptions} from '../../utils/validations'

const debug = makeDebug('mix:commands:channels:create')

export default class ChannelsCreate extends MixCommand {
  static description = `create a new channel in a project

`

  static examples = [
    'mix channels:create -P 1922 --name "New IVR channel" --mode ivr',
  ]

  static flags = {
    color: flags.string({
      description: 'channel color',
    }),
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

    if (options.color === undefined) {
      this.warn(chalk.yellow(`The V4 API currently requires the --color flag to be set.
This is due to a server-side error in which the default values for these flags are not recognized as valid.
This invocation of the command will likely fail. If it does not fail, kindly submit an issue on GitHub 
to let us know.`))
    } else {
      try {
        validateChannelColor(options.color)
      } catch {
        throw (eInvalidValue(`Invalid color ${chalk.red(options.color)} supplied.`,
          [
            'Check value of --color flag and try again.',
            `Enter ${chalk.green('mix channels:create help')} to review valid color options.`,
          ]))
      }
    }

    validateChannelModeOptions(options.mode)
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
    this.log(`Channel ${chalk.cyan(displayName)} created sucessfully (id: ${chalk.cyan(id)}).`)
  }
}
