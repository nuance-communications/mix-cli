/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

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
    '$ mix samples:export -P 29050 -I ORDER_DRINK -L en-US -f samples.zip --overwrite',
  ]

  static flags = {
    filepath: MixFlags.outputFilePathFlag,
    'intent-name': MixFlags.intentFlag,
    locale: MixFlags.localeMultipleWithDefaultFlag,
    overwrite: MixFlags.overwriteFileFlag,
    project: MixFlags.projectWithDefaultFlag,
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

  outputHumanReadable(_transformedData: any) {
    debug('outputHumanReadable()')
    this.log(`Sample sentences exported to file ${this.options.filepath}`)
  }

  setRequestActionMessage(options: any) {
    debug('setRequestActionMessage()')
    this.requestActionMessage = `Exporting samples for locale${s(options.locale.count)} ${options.locale} ` +
    `from project ${options.project}`
  }
}
