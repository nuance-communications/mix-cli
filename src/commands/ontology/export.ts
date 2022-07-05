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
    '$ mix ontology:export -P 29050 -L en-US -f ontology.zip --overwrite',
  ]

  static flags = {
    filepath: MixFlags.outputFilePathFlag,
    locale: MixFlags.localeMultipleWithDefaultFlag,
    overwrite: MixFlags.overwriteFileFlag,
    project: MixFlags.projectWithDefaultFlag,
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

  outputHumanReadable(_transformedData: any) {
    debug('outputHumanReadable()')
    this.log(`Ontology exported to file ${this.options.filepath}`)
  }

  setRequestActionMessage(options: any) {
    debug('setRequestActionMessage()')
    this.requestActionMessage = `Exporting ontology from project ID ${options.project} ` +
    ` for locale${s(options.locale.length)} ${options.locale}`
  }
}
