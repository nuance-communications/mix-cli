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
import * as OntologyAPI from '../../mix/api/ontology'
import {asArray} from '../../utils/as-array'
import {DomainOption} from '../../utils/validations'
import {MixClient, MixResponse, OntologyExportParams} from '../../mix/types'
import MixCommand from '../../utils/base/mix-command'
import {pluralize as s} from '../../utils/format'

const debug = makeDebug('mix:commands:ontology:export')

export default class OntologyExport extends MixCommand {
  static description = `export ontology
  
Use this command to export the ontology for a particular project. 

The contents of the exported zip file depend on the role you have been granted
on the Mix platform.`

  static examples = [
    '$ mix ontology:export -P 29050 -L en-US --overwrite',
  ]

  static flags = {
    filepath: {
      ...MixFlags.outputFilePathFlag,
      description: 'output file path (defaults to "ontology-<projectId>-<locale>.zip")',
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
    const defaultFilePath = `ontology-${this.options.project}-${this.options.locale}.zip`
    return defaultFilePath
  }

  shouldDownloadFile = true

  get domainOptions(): DomainOption[] {
    debug('get domainOptions()')
    return ['locale[]', 'project']
  }

  async buildRequestParameters(options: Partial<flags.Output>): Promise<OntologyExportParams> {
    debug('buildRequestParameters(')
    const {locale, project: projectId} = options

    return {locales: asArray(locale), projectId}
  }

  captureOptions() {
    super.captureOptions()
    this.options.locale = asArray(this.options.locale)
  }

  doRequest(client: MixClient, params: OntologyExportParams): Promise<MixResponse> {
    debug('doRequest()')
    return OntologyAPI.exportOntology(client, params)
  }

  outputHumanReadable(_transformedData: any, options: any) {
    debug('outputHumanReadable()')
    this.log(`Ontology exported to file ${options.filepath ? chalk.cyan(options.filepath) : chalk.cyan(this.defaultFilepath)}`)
  }

  setRequestActionMessage(options: any) {
    debug('setRequestActionMessage()')
    this.requestActionMessage = `Exporting ontology from project ID ${chalk.cyan(options.project)} ` +
    ` for locale${s(options.locale.length)} ${chalk.cyan(options.locale)}`
  }
}
