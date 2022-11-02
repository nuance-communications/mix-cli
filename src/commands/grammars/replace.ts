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
import {MixClient, MixResponse, MixResult, EntitiesGrammarReplaceParams} from '../../mix/types'

const debug = makeDebug('mix:commands:grammars:replace')

export default class GrammarsReplace extends MixCommand {
  static description = `replace the GrXML grammar for an entity 

  Use this command to replace the rule-based GrXML grammars for an entity.
  The GrXML files must be provided in a .zip file, in a folder identifying
  the locale for the grammar (for example, en-US/grammar.grxml).
  Note that rule-based grammars are restricted to Nuance Professional Services
  users and not available to all users.`

  static examples = [
    'Replace the GrXML grammar for an entity',
    '$ mix projects:replace -P 29050 -E DrinkSize -f 29050_DrinkSize.zip',
    '',
    'Replace the GrXML grammar for an entity using pre-confirmation',
    '$ mix projects:replace -P 29050 -E DrinkSize -f 29050_DrinkSize.zip -c DrinkSize',
  ]

  static flags = {
    confirm: MixFlags.confirmFlag,
    entity: MixFlags.entityFlag,
    filepath: MixFlags.inputFilePathFlag,
    ...MixFlags.machineOutputFlags,
    project: MixFlags.projectWithDefaultFlag,
  }

  action = 'replace'
  shouldConfirmCommand = true

  async buildRequestParameters(options: Partial<flags.Output>): Promise<EntitiesGrammarReplaceParams> {
    debug('buildRequestParameters()')
    const {entity: entityName, filepath: filePath, project: projectId} = options

    return {entityName, filePath, projectId}
  }

  doRequest(client: MixClient, params: EntitiesGrammarReplaceParams): Promise<MixResponse> {
    debug('doRequest()')
    return EntitiesAPI.replaceGrammar(client, params)
  }

  get expectedConfirmationValue() {
    debug('get expectedConfirmationValue()')
    return this.options.entity.toString()
  }

  outputHumanReadable(transformedData: any) {
    debug('outputHumanReadable()')
    const id = transformedData.ruleBasedEntity.id
    this.log(id ? 'Grammar replaced successfully.' : 'Grammar replacement aborted.')
  }

  setRequestActionMessage(options: any) {
    debug('setRequestActionMessage()')
    this.requestActionMessage = `Replacing grammar for ${chalk.cyan(options.entity)} in project ${chalk.cyan(options.project)}`
  }

  warnBeforeConfirmation() {
    debug('warnBeforeConfirmation()')
    this.warn(chalk.yellow(`This command is a destructive operation that cannot be undone.
Consider making a backup of your grammar first.`))
  }

  transformResponse(result: MixResult) {
    debug('transformResponse()')
    const data = result.data as any
    return data.entity
  }
}
