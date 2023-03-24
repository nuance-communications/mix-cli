/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import chalk from 'chalk'
import {FlagOutput} from '@oclif/core/lib/interfaces'
import makeDebug from 'debug'

import * as LiteralsAPI from '../../mix/api/literals'
import * as MixFlags from '../../utils/flags'
import {LiteralsImportParams, MixClient, MixResponse} from '../../mix/types'
import MixCommand from '../../utils/base/mix-command'

const debug = makeDebug.debug('mix:commands:literals:import')

export default class LiteralsImport extends MixCommand {
  static description = `import entity literals, appending to existing literals by default
  
Use this command to import literal-value pairs into a project. By default, the
literal-value pairs are appended to the project in the specified locale. It is
also possible to completely replace literal-value pairs for the specified locale
by using the 'replace' flag.

The import needs to be confirmed by re-typing the entity name when prompted.
It can also be pre-confirmed by using the 'confirm' flag.`

  static examples = [
    'Import entity literals by appending',
    '$ mix literals:import -P 29050 -E DrinkSize -L en-US -f literals.trsx',
    '',
    'Import entity literals by appending using pre-confirmation',
    '$ mix literals:import -P 29050 -E DrinkSize -L en-US -f literals.trsx -c DrinkSize',
    '',
    'Import entity literals by replacing',
    '$ mix literals:import -P 29050 -E DrinkSize -L en-US -f literals.trsx --replace',
    '',
    'Import entity literals by replacing using pre-confirmation',
    '$ mix literals:import -P 29050 -E DrinkSize -L en-US -f literals.trsx -c DrinkSize --replace',
  ]

  static flags = {
    confirm: MixFlags.confirmFlag,
    'entity-name': MixFlags.entityFlag,
    filepath: MixFlags.inputFilePathFlag,
    locale: MixFlags.localeWithDefaultFlag,
    ...MixFlags.machineOutputFlags,
    project: MixFlags.projectWithDefaultFlag,
    replace: MixFlags.replaceEntityFlag,
  }

  action = 'import'
  shouldConfirmCommand = true

  async buildRequestParameters(options: Partial<FlagOutput>): Promise<LiteralsImportParams> {
    debug('buildRequestParameters()')
    const {'entity-name': entityName, filepath: filePath, locale, project: projectId} = options

    return {entityName, filePath, locale, projectId}
  }

  async captureOptions() {
    await super.captureOptions()
    this.action = this.options.replace ? 'import by replacing' : 'import by appending'
  }

  doRequest(client: MixClient, params: LiteralsImportParams): Promise<MixResponse> {
    debug('doRequest()')
    return this.options.replace ?
      LiteralsAPI.replaceLiterals(client, params) :
      LiteralsAPI.appendLiterals(client, params)
  }

  get expectedConfirmationValue() {
    debug('get expectedConfirmationValue()')
    return this.options['entity-name']
  }

  outputHumanReadable(transformedData: any) {
    debug('outputHumanReadable()')
    const jobType = this.options.replace ? 'replace' : 'append'
    const {id} = transformedData

    if (id) {
      this.log(`Entity literals ${chalk.cyan(jobType)} job ${chalk.cyan(id)} successfully queued.`)
      this.log(`Use 'mix jobs:get -P ${this.options.project} -J ${id} --watch' to monitor progress.`)
    }
  }

  setRequestActionMessage(options: any) {
    debug('setRequestActionMessage()')
    const importMode = options.replace ? 'replacing' : 'appending'
    this.requestActionMessage = `Importing entity literals by ${chalk.cyan(importMode)} into project ID ${chalk.cyan(options.project)}` +
` for locale ${chalk.cyan(options.locale)}`
  }

  warnBeforeConfirmation() {
    debug('warnBeforeConfirmation()')
    if (this.options.replace) {
      this.warn(chalk.yellow(`This command is a destructive operation that cannot be undone.
Consider making a backup of your project first.`))
    } else {
      this.warn(chalk.yellow(`This command appends to the existing entity literals and cannot be undone.
Consider making a backup of your project first.`))
    }
  }
}
