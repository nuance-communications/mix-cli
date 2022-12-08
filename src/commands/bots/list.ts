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
Use flag 'full' to list all bot details, including the list of bot configs.
Use flag 'live-only'  with flag 'full' to filter out
bot configs that are NOT deployed.
Use flag 'omit-overridden'  with flag 'full' to filter out
bot configs that are overridden.
Flags 'live-only' and 'omit-overridden' cannot be used together.
Flags 'live-only' and 'omit-overridden' can only be used with flag 'full'.`

  static examples = [
    '$ mix bots:list -O 64',
  ]

  static flags = {
    full: MixFlags.showFullBotDetailsFlag,
    json: MixFlags.jsonFlag,
    'live-only': flags.boolean({
      description: MixFlags.liveOnlyFlag.description,
      dependsOn: ['full'],
      exclusive: ['omit-overridden'],
    }),
    organization: MixFlags.organizationFlag,
    ...MixFlags.tableFlags({except: ['extended']}),
    'omit-overridden': flags.boolean({
      description: MixFlags.omitOverriddenDesc,
      dependsOn: ['full'],
      exclusive: ['live-only'],
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
    const {full, 'live-only': liveOnly, 'omit-overridden': omitOverridden} = this.options

    if (!full) {
      return 'BV_VIEW_UNSPECIFIED'
    }

    if (liveOnly) {
      return 'BV_FULL_LIVE_CONFIGS'
    }

    if (omitOverridden) {
      return 'BV_FULL_AVAILABLE_CONFIGS'
    }

    return 'BV_FULL'
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
      this.log('No bots found.')

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
