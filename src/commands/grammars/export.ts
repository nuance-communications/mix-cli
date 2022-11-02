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
import * as EntitiesAPI from '../../mix/api/entities'
import MixCommand from '../../utils/base/mix-command'
import {MixClient, MixResponse, EntitiesGetParams} from '../../mix/types'
import {DomainOption} from '../../utils/validations'

const debug = makeDebug.debug('mix:command:grammars:export')

export default class GrammarExport extends MixCommand {
  static description = `export the grammar for an entity
 
Use this command to export the rule-based GrXML grammars for an entity.
Note that rule-based grammars are restricted to Nuance Professional Services users
and not available to all users.`

  static examples = [
    'Export the grammar for an entity to a zip file',
    '$ mix grammars:export -P 29050 -E DrinkSize --overwrite',
  ]

  static flags = {
    entity: MixFlags.entityFlag,
    project: MixFlags.projectWithDefaultFlag,
    filepath: {
      ...MixFlags.outputFilePathFlag,
      required: false,
    },
    overwrite: MixFlags.overwriteFileFlag,
  }

  get filepath(): string {
    debug('get filepath()')
    const filePath = this.options.filepath ?? this.defaultFilepath
    return filePath
  }

  get defaultFilepath(): string {
    debug('get defaultFilepath()')
    const defaultFilePath = `${this.options.project}-${this.options.entity}-grammars.zip`
    return defaultFilePath
  }

  shouldDownloadFile = true

  get domainOptions(): DomainOption[] {
    debug('get domainOptions()')
    return ['project']
  }

  async buildRequestParameters(options: Partial<flags.Output>): Promise<EntitiesGetParams> {
    debug('buildRequestParams()')
    const {
      entity: entityName,
      project: projectId,
    } = options

    return {
      entityName,
      projectId,
    }
  }

  doRequest(client: MixClient, params: EntitiesGetParams): Promise<MixResponse> {
    debug('doRequest()')
    return EntitiesAPI.exportGrammars(client, params)
  }

  outputHumanReadable(_transformedData: any, options: Partial<flags.Output>) {
    debug('outputHumanReadable()')
    this.log(`Grammar saved to ${options.filepath ? chalk.cyan(options.filepath) : chalk.cyan(this.defaultFilepath)}`)
  }

  setRequestActionMessage(options: any) {
    debug('setRequestActionMessage()')
    this.requestActionMessage = `Exporting grammar for entity ${chalk.cyan(options.entity)} in project ${chalk.cyan(options.project)}`
  }
}
