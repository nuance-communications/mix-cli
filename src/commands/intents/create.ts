/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {flags} from '@oclif/command'
import makeDebug from 'debug'

import * as IntentsAPI from '../../mix/api/intents'
import * as MixFlags from '../../utils/flags'
import MixCommand from '../../utils/base/mix-command'
import {IntentsCreateParams, MixClient, MixResponse, MixResult} from '../../mix/types'
import {DomainOption} from '../../utils/validations'
import chalk from 'chalk'

const debug = makeDebug('mix:commands:intents:create')

export default class IntentsCreate extends MixCommand {
  static description = `create a new intent

Use this command to create a new intent in a project.`

  static examples = [
    '$ mix intents:create -P 1922 --name ORDER_DRINK',
  ]

  static flags = {
    name: MixFlags.intentNameFlag,
    project: MixFlags.projectWithDefaultFlag,
    // output flags
    json: MixFlags.jsonFlag,
    yaml: MixFlags.yamlFlag,
  }

  get domainOptions(): DomainOption[] {
    debug('get domainOptions()')
    return ['project']
  }

  async buildRequestParameters(options: Partial<flags.Output>): Promise<IntentsCreateParams> {
    debug('buildRequestParameters()')
    const {
      name: intentName,
      project: projectId,
    } = options

    return {
      intentName,
      projectId,
    }
  }

  doRequest(client: MixClient, params: IntentsCreateParams): Promise<MixResponse> {
    debug('doRequest()')
    return IntentsAPI.createIntent(client, params)
  }

  outputHumanReadable(transformedData: any) {
    debug('outputHumanReadable()')
    const {id, name} = transformedData
    this.log(`Intent ${chalk.cyan(name)} with ID ${chalk.cyan(id)} created.`)
  }

  setRequestActionMessage(options: any) {
    debug('setRequestActionMessage()')
    this.requestActionMessage = `Creating intent ${chalk.cyan(options.name)} in project ${chalk.cyan(options.project)}`
  }

  transformResponse(result: MixResult) {
    debug('transformResponse()')
    const data = result.data as any
    return data.intent
  }
}
