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
import {IntentsGetParams, MixClient, MixResponse, MixResult} from '../../mix/types'
import {DomainOption} from '../../utils/validations'

const debug = makeDebug('mix:commands:intents:get')

export default class IntentsGet extends MixCommand {
  static description = `get details about an intent

Use this command to get details about a particular intent in a project.`

  static examples = [
    '$ mix intents:get -P 1922 -I ORDER_DRINK',
  ]

  static flags = {
    intent: MixFlags.intentFlag,
    json: MixFlags.jsonFlag,
    project: MixFlags.projectFlag,
    ...MixFlags.tableFlags({
      except: ['extended', 'no-header', 'filter', 'sort'],
      useColumnsWithCSVOnly: true,
    }),
    yaml: MixFlags.yamlFlag,
  }

  get columns() {
    debug('get columns()')
    return {
      intentId: {header: 'IntentId'},
      name: {header: 'Name'},
      isInBaseOntology: {header: 'IsInBaseOntology'},
      entityLinks: {header: 'EntityLinks'},
    } as Columns
  }

  get domainOptions(): DomainOption[] {
    debug('get domainOptions()')
    return ['project']
  }

  async buildRequestParameters(options: Partial<flags.Output>): Promise<IntentsGetParams> {
    debug('buildRequestParameters()')
    const {
      intent: intentName,
      project: projectId,
    } = options

    return {
      intentName,
      projectId,
    }
  }

  doRequest(client: MixClient, params: IntentsGetParams): Promise<MixResponse> {
    debug('doRequest()')
    return IntentsAPI.getIntent(client, params)
  }

  outputHumanReadable(transformedData: any) {
    debug('outputHumanReadable()')
    this.outputAsKeyValuePairs(transformedData, this.columns)
  }

  setRequestActionMessage(options: any) {
    debug('setRequestActionMessage()')
    this.requestActionMessage = `Retrieving details for intent ${options.intent}`
  }

  transformResponse(result: MixResult) {
    debug('transformResponse()')
    const data = result.data as any

    const {
      id: intentId,
      name,
      isInBaseOntology,
      links = [],
    } = data?.intent ?? {}

    return {
      intentId,
      name,
      isInBaseOntology,
      entityLinks: links.map((link: any) => link.entityRef).join(','),
    }
  }
}
