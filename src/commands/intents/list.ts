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

import * as IntentsAPI from '../../mix/api/intents'
import * as MixFlags from '../../utils/flags'
import MixCommand, {Columns} from '../../utils/base/mix-command'
import {IntentsListParams, MixClient, MixResponse, MixResult} from '../../mix/types'
import {DomainOption} from '../../utils/validations'

const debug = makeDebug('mix:commands:intents:list')

export default class IntentsList extends MixCommand {
  static description = `list intents
  
Use this command to list all intents available in a specific project.`

  static examples = [
    '$ mix intents:list -P 1922',
  ]

  static flags = {
    project: MixFlags.projectWithDefaultFlag,
    // output flags
    json: MixFlags.jsonFlag,
    ...MixFlags.tableFlags({except: ['extended']}),
    yaml: MixFlags.yamlFlag,
  }

  get columns() {
    debug('get columns()')
    return {
      id: {header: 'IntentId'},
      name: {header: 'Name'},
      isInBaseOntology: {header: 'isInBaseOntology'},
      links: {
        header: 'EntityLinks',
        get: ({links}: any) => links.map(({entityRef}: any) => entityRef).join(','),
      },
      dataSource: {
        header: 'DataSource',
        get: ({dataSource}: any) => dataSource ?? 'n/a',
      },
    } as Columns
  }

  get domainOptions(): DomainOption[] {
    debug('get domainOptions()')
    return ['project']
  }

  async buildRequestParameters(options: Partial<FlagOutput>): Promise<IntentsListParams> {
    debug('buildRequestParameters()')
    const {project: projectId} = options

    return {projectId}
  }

  doRequest(client: MixClient, params: IntentsListParams): Promise<MixResponse> {
    debug('doRequest()')
    return IntentsAPI.listIntents(client, params)
  }

  outputHumanReadable(transformedData: any) {
    debug('outputHumanReadable()')
    if (transformedData.length === 0) {
      this.log('No intents found.')

      return
    }

    this.outputCLITable(transformedData, this.columns)
  }

  setRequestActionMessage(options: any) {
    debug('setRequestActionMessage()')
    this.requestActionMessage = `Retrieving intents for project ID ${chalk.cyan(options.project)}`
  }

  transformResponse(result: MixResult) {
    debug('transformResponse()')
    const data = result.data as any
    const {intents} = data

    return intents
  }
}

