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
import * as IntentsAPI from '../../mix/api/intents'
import MixCommand from '../../utils/base/mix-command'
import {MixClient, MixResponse, IntentsDeleteParams} from '../../mix/types'
import {DomainOption} from '../../utils/validations'

const debug = makeDebug('mix:commands:intents:destroy')

export default class IntentsDestroy extends MixCommand {
  static description = `destroy an intent

Use this command to permanently delete an intent from a project.`

  static examples = [
    '$ mix intents:destroy -P 1922 -I ORDER_DRINK',
  ]

  static flags = {
    confirm: MixFlags.confirmFlag,
    intent: MixFlags.intentFlag,
    json: MixFlags.jsonFlag,
    project: MixFlags.projectFlag,
    yaml: MixFlags.yamlFlag,
  }

  action = 'destroy'
  shouldConfirmCommand = true

  get domainOptions(): DomainOption[] {
    debug('get domainOptions()')
    return ['project']
  }

  async buildRequestParameters(options: Partial<flags.Output>): Promise<IntentsDeleteParams> {
    debug('buildRequestParameters()')
    const {
      intent: intentName,
      project: projectId} = options

    return {intentName, projectId}
  }

  doRequest(client: MixClient, params: IntentsDeleteParams): Promise<MixResponse> {
    debug('doRequest()')
    return IntentsAPI.deleteIntent(client, params)
  }

  get expectedConfirmationValue() {
    debug('get expectedConfirmationValue()')
    return this.options.intent
  }

  outputHumanReadable(_transformedData: any) {
    debug('outputHumanReadable()')
    // Add intent name as endpoint response does not provide it
    this.log(`Intent ${this.options.intent} was deleted.`)
  }

  setRequestActionMessage(options: any) {
    debug('setRequestActionMessage()')
    this.requestActionMessage = `Destroying intent ${options.intent}`
  }

  warnBeforeConfirmation() {
    debug('warnBeforeConfirmation()')
    this.warn(chalk.yellow('Destroying an intent cannot be undone. Consider making a backup of your project first.'))
  }
}
