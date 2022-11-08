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

import * as LiteralsAPI from '../../mix/api/literals'
import * as MixFlags from '../../utils/flags'
import {asArray} from '../../utils/as-array'
import {DomainOption} from '../../utils/validations'
import {LiteralsExportParams, MixClient, MixResponse} from '../../mix/types'
import MixCommand from '../../utils/base/mix-command'
import {pluralize as s} from '../../utils/format'

const debug = makeDebug('mix:commands:literals:export')

export default class LiteralsExport extends MixCommand {
  static description = `export entity literals
  
Use this command to export literal-value pairs for a specific entity.
It is possible to specify the locale(s) for which the pairs should be exported.

The contents of the exported zip file depend on the role you have been granted
on the Mix platform.`

  static examples = [
    '$ mix literals:export -P 29050 -E DrinkSize -L en-US --overwrite',
  ]

  static flags = {
    'entity-name': MixFlags.entityFlag,
    filepath: {
      ...MixFlags.outputFilePathFlag,
      description: 'output file path (defaults to "literals-<projectId>-<entity>-<locale>.zip")',
      required: false,
    },
    locale: MixFlags.localeMultipleWithDefaultFlag,
    overwrite: MixFlags.overwriteFileFlag,
    project: MixFlags.projectWithDefaultFlag,
  }

  get filepath(): string {
    debug('get filepath()')
    const filePath = this.options.filepath ?? this.defaultFilepath
    return filePath
  }

  get defaultFilepath(): string {
    debug('get defaultFilepath()')
    const defaultFilePath = `literals-${this.options.project}-${this.options['entity-name']}-${this.options.locale}.zip`
    return defaultFilePath
  }

  shouldDownloadFile = true

  get domainOptions(): DomainOption[] {
    debug('get domainOptions()')
    return ['locale[]', 'project']
  }

  async buildRequestParameters(options: Partial<flags.Output>): Promise<LiteralsExportParams> {
    debug('buildRequestParameters()')
    const {'entity-name': entityName, locale, project: projectId} = options

    return {entityName, locales: asArray(locale), projectId}
  }

  captureOptions() {
    super.captureOptions()
    this.options.locale = asArray(this.options.locale)
  }

  doRequest(client: MixClient, params: LiteralsExportParams): Promise<MixResponse> {
    debug('doRequest()')
    return LiteralsAPI.exportLiterals(client, params)
  }

  outputHumanReadable(_transformedData: any, options: any) {
    debug('outputHumanReadable()')
    this.log(`Entity literals exported to file ${options.filepath ? chalk.cyan(options.filepath) : chalk.cyan(this.defaultFilepath)}`)
  }

  setRequestActionMessage(options: any) {
    debug('setRequestActionMessage()')
    this.requestActionMessage = `Exporting entity literals from project ID ${chalk.cyan(options.project)}` +
    ` for locale${s(options.locale.length)} ${chalk.cyan(options.locale)}`
  }
}
