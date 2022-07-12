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
import {IntentsRenameParams, MixClient, MixResponse, MixResult} from '../../mix/types'
import {DomainOption} from '../../utils/validations'
import chalk from 'chalk'

const debug = makeDebug('mix:commands:intents:rename')

export default class IntentsRename extends MixCommand {
  static description = `rename an intent

Use this command to rename an intent in a project.`

  static examples = [
    '$ mix intents:rename -P 1922 -I ORDER_DRINK --name ORDER_COFFEE',
  ]

  static flags = {
    intent: MixFlags.intentFlag,
    json: MixFlags.jsonFlag,
    name: MixFlags.intentNameFlag,
    project: MixFlags.projectFlag,
    yaml: MixFlags.yamlFlag,
  }

  get domainOptions(): DomainOption[] {
    debug('get domainOptions()')
    return ['project']
  }

  async buildRequestParameters(options: Partial<flags.Output>): Promise<IntentsRenameParams> {
    debug('buildRequestParameters()')
    const {
      intent: intentName,
      name: newIntentName,
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
    this.requestActionMessage = `Renaming intent ${options.intent} in project ${options.project}`
  }

  transformResponse(result: MixResult) {
    debug('transformResponse()')
    const data = result.data as any
    return data.intent
  }
}
