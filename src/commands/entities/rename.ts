/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {flags} from '@oclif/command'
import makeDebug from 'debug'

import * as EntitiesAPI from '../../mix/api/entities'
import * as MixFlags from '../../utils/flags'
import MixCommand from '../../utils/base/mix-command'
import {EntitiesRenameParams, MixClient, MixResponse, MixResult} from '../../mix/types'
import {DomainOption} from '../../utils/validations'
import chalk from 'chalk'

const debug = makeDebug('mix:commands:entities:rename')

export default class EntitiesRename extends MixCommand {
  static description = `rename an entity

Use this command to rename an entity in a project.`

  static examples = [
    '$ mix entities:rename -P 1922 -E DrinkSize --name DrinkFormat',
  ]

  static flags = {
    entity: MixFlags.entityFlag,
    json: MixFlags.jsonFlag,
    name: MixFlags.entityNameFlag,
    project: MixFlags.projectWithDefaultFlag,
    yaml: MixFlags.yamlFlag,
  }

  get domainOptions(): DomainOption[] {
    debug('get domainOptions()')
    return ['project']
  }

  async buildRequestParameters(options: Partial<flags.Output>): Promise<EntitiesRenameParams> {
    debug('buildRequestParameters()')
    const {
      entity: entityName,
      name: newEntityName,
      project: projectId,
    } = options

    return {
      entityName,
      newEntityName,
      projectId,
    }
  }

  doRequest(client: MixClient, params: EntitiesRenameParams): Promise<MixResponse> {
    debug('doRequest()')
    return EntitiesAPI.renameEntity(client, params)
  }

  outputHumanReadable(transformedData: any) {
    debug('outputHumanReadable()')
    const {name} = transformedData
    this.log(`Entity ${chalk.cyan(this.options.entity)} successfully renamed to ${chalk.cyan(name)}.`)
  }

  setRequestActionMessage(options: any) {
    debug('setRequestActionMessage()')
    this.requestActionMessage = `Renaming entity ${chalk.cyan(options.entity)} in project ${chalk.cyan(options.project)}`
  }

  transformResponse(result: MixResult) {
    debug('transformResponse()')
    const data = result.data as any
    const [type] = Object.keys(data.entity)
    return data.entity[type]
  }
}
