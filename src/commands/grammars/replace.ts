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

import * as MixFlags from '../../utils/flags'
import * as EntitiesAPI from '../../mix/api/entities'
import MixCommand from '../../utils/base/mix-command'
import {MixClient, MixResponse, MixResult, EntitiesGrammarsReplaceParams} from '../../mix/types'

const debug = makeDebug('mix:commands:grammars:replace')

export default class GrammarsReplace extends MixCommand {
  static description = `replace the GrXML grammars for an entity 

Use this command to replace the rule-based GrXML grammars for an entity.
The GrXML files must be provided in a .zip file, in a folder identifying
the locale for the grammar (for example, en-US/grammar.grxml).
Note that rule-based grammars are restricted to Nuance Professional Services
users and not available to all users.`

  static examples = [
    'Replace the GrXML grammars for an entity',
    '$ mix grammars:replace -P 29050 -E DrinkSize -f 29050_DrinkSize.zip',
    '',
    'Replace the GrXML grammars for an entity using pre-confirmation',
    '$ mix grammars:replace -P 29050 -E DrinkSize -f 29050_DrinkSize.zip -c DrinkSize',
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

  async buildRequestParameters(options: Partial<FlagOutput>): Promise<EntitiesGrammarsReplaceParams> {
    debug('buildRequestParameters()')
    const {entity: entityName, filepath: filePath, project: projectId} = options

    return {entityName, filePath, projectId}
  }

  doRequest(client: MixClient, params: EntitiesGrammarsReplaceParams): Promise<MixResponse> {
    debug('doRequest()')
    return EntitiesAPI.replaceGrammars(client, params)
  }

  get expectedConfirmationValue() {
    debug('get expectedConfirmationValue()')
    return this.options.entity.toString()
  }

  outputHumanReadable(transformedData: any) {
    debug('outputHumanReadable()')
    const id = transformedData.ruleBasedEntity.id
    this.log(id ? 'Grammars replaced successfully.' : 'Grammars replacement aborted.')
  }

  setRequestActionMessage(options: any) {
    debug('setRequestActionMessage()')
    this.requestActionMessage = `Replacing grammars for ${chalk.cyan(options.entity)} in project ${chalk.cyan(options.project)}`
  }

  warnBeforeConfirmation() {
    debug('warnBeforeConfirmation()')
    this.warn(chalk.yellow(`This command is a destructive operation that cannot be undone.
Consider making a backup of your grammars first.`))
  }

  transformResponse(result: MixResult) {
    debug('transformResponse()')
    const data = result.data as any
    return data.entity
  }
}
