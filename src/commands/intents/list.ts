/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {flags} from '@oclif/command'
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
    json: MixFlags.jsonFlag,
    project: MixFlags.projectFlag,
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

  async buildRequestParameters(options: Partial<flags.Output>): Promise<IntentsListParams> {
    debug('buildRequestParameters()')
    const {project: projectId} = options

    return {projectId}
  }

  doRequest(client: MixClient, params: IntentsListParams): Promise<MixResponse> {
    debug('doRequest()')
    return IntentsAPI.listIntents(client, params)
  }

  setRequestActionMessage(options: any) {
    debug('setRequestActionMessage()')
    this.requestActionMessage = `Retrieving intents for project ID ${options.project}`
  }

  transformResponse(result: MixResult) {
    debug('transformResponse()')
    const data = result.data as any
    const {intents} = data

    return intents
  }
}

