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
import MixCommand from '../../utils/base/mix-command'
import {MixClient, MixResponse, OntologyImportParams} from '../../mix/types'

const debug = makeDebug('mix:commands:ontology:import')

export default class OntologyImport extends MixCommand {
  static description = `import by appending to existing ontology
  
Use this command to import an ontology into a specific project. The provided
ontology can only be appended to the existing ontology.

The import needs to be confirmed by re-typing the project ID when prompted.
It can also be pre-confirmed by using the --confirm flag.`

  static examples = [
    'Import an ontology',
    '$ mix ontology:import -P 29050 -f ontology.zip',
    '',
    'Import an ontology using pre-confirmation',
    '$ mix ontology:import -P 29050 -f ontology.zip -c 29050',
  ]

  static flags = {
    confirm: MixFlags.confirmFlag,
    filepath: MixFlags.inputFilePathFlag,
    ...MixFlags.machineOutputFlags,
    project: MixFlags.projectWithDefaultFlag,
  }

  action = 'import by appending'
  shouldConfirmCommand = true

  async buildRequestParameters(options: Partial<flags.Output>): Promise<OntologyImportParams> {
    debug('buildRequestParameters()')
    const {filepath: filePath, project: projectId} = options

    return {filePath, projectId}
  }

  doRequest(client: MixClient, params: OntologyImportParams): Promise<MixResponse> {
    debug('doRequest()')
    return OntologyAPI.appendOntology(client, params)
  }

  get expectedConfirmationValue() {
    debug('get expectedConfirmationValue()')
    return this.options.project.toString()
  }

  outputHumanReadable(transformedData: any) {
    debug('outputHumanReadable()')
    const {id} = transformedData
    if (id) {
      this.log(`Ontology append job ${chalk.cyan(id)} successfully queued.`)
      this.log(`Use 'mix jobs:get -P ${this.options.project} -J ${id} --watch' to monitor progress.`)
    }
  }

  setRequestActionMessage(options: any) {
    debug('setRequestActionMessage()')
    this.requestActionMessage = `Importing ontology by appending into project ID ${chalk.cyan(options.project)}`
  }

  warnBeforeConfirmation() {
    debug('warnBeforeConfirmation()')
    this.warn(chalk.yellow(`This command appends to the existing ontology and cannot be undone.
Consider making a backup of your project first.`))
  }
}
