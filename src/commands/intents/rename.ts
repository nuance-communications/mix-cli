/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {Flags} from '@oclif/core'
import {FlagOutput} from '@oclif/core/lib/interfaces'
import makeDebug from 'debug'

import * as IntentsAPI from '../../mix/api/intents'
import * as MixFlags from '../../utils/flags'
import MixCommand from '../../utils/base/mix-command'
import {IntentsRenameParams, MixClient, MixResponse, MixResult} from '../../mix/types'
import {DomainOption} from '../../utils/validations'
import chalk from 'chalk'

const debug = makeDebug('mix:commands:intents:rename')

export default class IntentsRename extends MixCommand {
  static description = `rename an intent

Use this command to rename an intent in a project.`

  static examples = [
    '$ mix intents:rename -P 1922 -I ORDER_DRINK --new-name ORDER_COFFEE',
  ]

  static flags = {
    intent: MixFlags.intentFlag,
    'new-name': Flags.string({
      required: true,
      description: 'new intent name',
    }),
    project: MixFlags.projectWithDefaultFlag,
    // output flags
    json: MixFlags.jsonFlag,
    yaml: MixFlags.yamlFlag,
  }

  get domainOptions(): DomainOption[] {
    debug('get domainOptions()')
    return ['project']
  }

  async buildRequestParameters(options: Partial<FlagOutput>): Promise<IntentsRenameParams> {
    debug('buildRequestParameters()')
    const {
      intent: intentName,
      'new-name': newIntentName,
      project: projectId,
    } = options

    return {
      intentName,
      newIntentName,
      projectId,
    }
  }

  doRequest(client: MixClient, params: IntentsRenameParams): Promise<MixResponse> {
    debug('doRequest()')
    return IntentsAPI.renameIntent(client, params)
  }

  outputHumanReadable(transformedData: any) {
    debug('outputHumanReadable()')
    const {name} = transformedData
    this.log(`Intent ${chalk.cyan(this.options.intent)} successfully renamed to ${chalk.cyan(name)}.`)
  }

  setRequestActionMessage(options: any) {
    debug('setRequestActionMessage()')
    this.requestActionMessage = `Renaming intent ${chalk.cyan(options.intent)} in project ${chalk.cyan(options.project)}`
  }

  transformResponse(result: MixResult) {
    debug('transformResponse()')
    const data = result.data as any
    return data.intent
  }
}
