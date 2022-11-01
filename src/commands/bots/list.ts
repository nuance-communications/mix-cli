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

import * as BotsAPI from '../../mix/api/bots'
import * as MixFlags from '../../utils/flags'
import MixCommand, {Columns} from '../../utils/base/mix-command'
import {BotsListParams, MixClient, MixResponse, MixResult} from '../../mix/types'
import {DomainOption} from '../../utils/validations'

const debug = makeDebug('mix:commands:bots:list')

export default class BotsList extends MixCommand {
  static description = `list bots in an organization
  
Use this command to list bots for a specific Mix organization.
A number of flags can be used to constrain the returned results.`

  static examples = [
    '$ mix bots:list -O 64',
  ]

  static flags = {
    full: MixFlags.showFullBotDetailsFlag,
    json: MixFlags.jsonFlag,
    organization: MixFlags.organizationFlag,
    ...MixFlags.tableFlags({except: ['extended']}),
    'omit-overridden': flags.boolean({
      description: MixFlags.omitOverriddenDesc,
      dependsOn: ['full'],
    }),
    yaml: MixFlags.yamlFlag,
  }

  get columns() {
    debug('get columns()')

    const fullViewOnlyColumns = {
      configs: {
        header: 'BotConfigs',
        get: ({configs}: any) => configs.map(({id}: any) => id).join(','),
      },
      createTime: {header: 'CreateTime'},
    }

    return {
      id: {
        header: 'BotId',
        minWidth: 4,
      },
      applicationName: {
        header: 'Name',
        minWidth: 8,
      },
      ...(this.options.full ? fullViewOnlyColumns : {}),
    } as Columns
  }

  get domainOptions(): DomainOption[] {
    debug('get domainOptions()')

    return ['organization']
  }

  get viewType() {
    debug('get viewType()')

    const {full, 'omit-overridden': omitOverridden} = this.options
    return full && omitOverridden ?
      'BV_FULL_AVAILABLE_CONFIGS' :
      (full ?
        'BV_FULL' :
        'BV_VIEW_UNSPECIFIED')
  }

  async buildRequestParameters(options: Partial<flags.Output>): Promise<BotsListParams> {
    debug('buildRequestParameters()')
    const {organization: orgId} = options

    return {
      orgId,
      view: this.viewType,
    }
  }

  doRequest(client: MixClient, params: BotsListParams): Promise<MixResponse> {
    debug('doRequest()')
    return BotsAPI.listBots(client, params)
  }

  outputHumanReadable(transformedData: any) {
    debug('outputHumanReadable()')
    const {columns, options} = this
    if (transformedData.length === 0) {
      const msg = 'No bots found.'
      this.log(msg)

      return
    }

    if (options.full) {
      this.warn(`Full bot configuration objects are complex, so some data is not shown.
If you want to see the complete data then retry the command with the output format
set to JSON or YAML.`)
    }

    super.outputCLITable(transformedData, columns)
  }

  setRequestActionMessage(options: any) {
    debug('setRequestActionMessage()')
    this.requestActionMessage = `Retrieving bots for organization ID ${chalk.cyan(options.organization)}`
  }

  transformResponse(result: MixResult) {
    debug('transformResponse()')
    const data = result.data as any
    return data.bots
  }
}
