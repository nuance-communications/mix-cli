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
import {asArray} from '../../utils/as-array'
import {DomainOption} from '../../utils/validations'
import {MixClient, MixResponse, SamplesExportParams} from '../../mix/types'
import MixCommand from '../../utils/base/mix-command'
import {pluralize as s} from '../../utils/format'

const debug = makeDebug('mix:commands:samples:export')

export default class SamplesExport extends MixCommand {
  static description = `export sample sentences
  
Use this command to export samples for an intent in the project.`

  static examples = [
    '$ mix samples:export -P 29050 -I ORDER_DRINK -L en-US --overwrite',
  ]

  static flags = {
    filepath: {
      ...MixFlags.outputFilePathFlag,
      required: false,
    },
    'intent-name': MixFlags.intentFlag,
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
    const defaultFilePath = `samples-${this.options.project}-${this.options['intent-name']}.zip`
    return defaultFilePath
  }

  shouldDownloadFile = true

  get domainOptions(): DomainOption[] {
    debug('get domainOptions()')
    return ['locale[]', 'project']
  }

  async buildRequestParameters(options: Partial<flags.Output>): Promise<SamplesExportParams> {
    debug('buildRequestParameters()')
    const {'intent-name': intentName, locale, project: projectId} = options

    return {intentName, locales: asArray(locale), projectId}
  }

  captureOptions() {
    super.captureOptions()
    this.options.locale = asArray(this.options.locale)
  }

  doRequest(client: MixClient, params: SamplesExportParams): Promise<MixResponse> {
    debug('doRequest()')
    return SamplesAPI.exportSamples(client, params)
  }

  outputHumanReadable(_transformedData: any, options: any) {
    debug('outputHumanReadable()')
    this.log(`Sample sentences exported to file ${options.filepath ? chalk.cyan(options.filepath) : chalk.cyan(this.defaultFilepath)}`)
  }

  setRequestActionMessage(options: any) {
    debug('setRequestActionMessage()')
    this.requestActionMessage = `Exporting samples for locale${s(options.locale.count)} ${chalk.cyan(options.locale)} ` +
    `from project ${chalk.cyan(options.project)}`
  }
}
