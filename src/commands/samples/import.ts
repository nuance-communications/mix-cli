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
import * as SamplesAPI from '../../mix/api/samples'
import {MixClient, MixResponse, SamplesImportParams} from '../../mix/types'
import MixCommand from '../../utils/base/mix-command'

const debug = makeDebug.debug('mix:commands:samples:import')

export default class SamplesImport extends MixCommand {
  static description = `import sample sentences, appending to existing samples by default

Use this command sample sentences into a project.  By default, the samples
sentences are appended to the project in the specified locale. It is also
possible to completely replace sample sentences for the specified locale
by using the 'replace' flag.

The import needs to be confirmed by re-typing the intent name when prompted.
It can also be pre-confirmed by using the 'confirm' flag. Consider making
a project backup before using this command.`

  static examples = [
    'Import samples by appending',
    '$ mix samples:import -P 29050 -I ORDER_DRINK -L en-US -f samples.trsx',
    '',
    'Import samples by appending using pre-confirmation',
    '$ mix samples:import -P 29050 -I ORDER_DRINK -L en-US -f samples.trsx -c ORDER_DRINK',
    '',
    'Import samples by replacing',
    '$ mix samples:import -P 29050 -I ORDER_DRINK -L en-US -f samples.trsx --replace',
    '',
    'Import samples by replacing using pre-confirmation',
    '$mix samples:import -P 29050 -I ORDER_DRINK -L en-US -f samples.trsx --replace -c ORDER_DRINK',
  ]

  static flags = {
    confirm: MixFlags.confirmFlag,
    filepath: MixFlags.inputFilePathFlag,
    'intent-name': MixFlags.intentFlag,
    locale: MixFlags.localeWithDefaultFlag,
    ...MixFlags.machineOutputFlags,
    project: MixFlags.projectWithDefaultFlag,
    replace: MixFlags.replaceSamplesFlag,
  }

  action = 'import'
  shouldConfirmCommand = true

  async buildRequestParameters(options: Partial<flags.Output>): Promise<SamplesImportParams> {
    debug('buildRequestParams()')
    const {
      filepath: filePath,
      'intent-name': intentName,
      locale,
      project: projectId,
    } = options

    return {filePath, intentName, locale, projectId}
  }

  captureOptions() {
    super.captureOptions()
    this.action = this.options.replace ? 'import by replacing' : 'import by appending'
  }

  doRequest(client: MixClient, params: SamplesImportParams): Promise<MixResponse> {
    debug('doRequest() %O', this.options)
    return this.options.replace ?
      SamplesAPI.replaceSamples(client, params) :
      SamplesAPI.appendSamples(client, params)
  }

  get expectedConfirmationValue() {
    debug('get expectedConfirmationValue()')
    return this.options['intent-name']
  }

  outputHumanReadable(transformedData: any) {
    debug('outputHumanReadable()')
    const jobType = this.options.replace ? 'replace' : 'append'
    const {id} = transformedData

    if (id) {
      this.log(`Samples ${chalk.cyan(jobType)} job ${chalk.cyan(id)} successfully queued.`)
      this.log(`Use 'mix jobs:get -P ${this.options.project} -J ${id} --watch' to monitor progress.`)
    }
  }

  setRequestActionMessage(options: any) {
    debug('setRequestActionMessage()')
    const importMode = options.replace ? 'replacing' : 'appending'
    this.requestActionMessage = `Importing samples for locale ${chalk.cyan(options.locale)} ` +
      `by ${chalk.cyan(importMode)} into project ${chalk.cyan(options.project)}`
  }

  warnBeforeConfirmation() {
    debug('warnBeforeConfirmation()')
    if (this.options.replace) {
      this.warn(chalk.yellow(`This command is a destructive operation that cannot be undone.
Consider making a backup of your project first.`))
    } else {
      this.warn(chalk.yellow(`This command appends to the existing samples and cannot be undone.
Consider making a backup of your project first.`))
    }
  }
}
