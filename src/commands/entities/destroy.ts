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
import {MixClient, MixResponse, EntitiesDeleteParams} from '../../mix/types'
import {DomainOption} from '../../utils/validations'

const debug = makeDebug('mix:commands:entities:destroy')

export default class EntitiesDestroy extends MixCommand {
  static description = `destroy an entity

Use this command to permanently delete an entity from a project.`

  static examples = [
    '$ mix entities:destroy -P 1922 -E CoffeeSize',
  ]

  static flags = {
    confirm: MixFlags.confirmFlag,
    entity: MixFlags.entityFlag,
    json: MixFlags.jsonFlag,
    project: MixFlags.projectWithDefaultFlag,
    yaml: MixFlags.yamlFlag,
  }

  action = 'destroy'
  shouldConfirmCommand = true

  get domainOptions(): DomainOption[] {
    debug('get domainOptions()')
    return ['project']
  }

  async buildRequestParameters(options: Partial<flags.Output>): Promise<EntitiesDeleteParams> {
    debug('buildRequestParameters()')
    const {
      entity: entityName,
      project: projectId} = options

    return {entityName, projectId}
  }

  doRequest(client: MixClient, params: EntitiesDeleteParams): Promise<MixResponse> {
    debug('doRequest()')
    return EntitiesAPI.deleteEntity(client, params)
  }

  get expectedConfirmationValue() {
    debug('get expectedConfirmationValue()')
    return this.options.entity
  }

  outputHumanReadable(_transformedData: any) {
    debug('outputHumanReadable()')
    // Add entity name as endpoint response does not provide it
    this.log(`Entity ${chalk.cyan(this.options.entity)} was deleted.`)
  }

  setRequestActionMessage(options: any) {
    debug('setRequestActionMessage()')
    this.requestActionMessage = `Destroying entity ${chalk.cyan(options.entity)} in project ${chalk.cyan(options.project)}`
  }

  warnBeforeConfirmation() {
    debug('warnBeforeConfirmation()')
    this.warn(chalk.yellow('Destroying an entity cannot be undone. Consider making a backup of your project first.'))
  }
}
