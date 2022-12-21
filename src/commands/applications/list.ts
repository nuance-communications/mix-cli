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

import * as ApplicationsAPI from '../../mix/api/applications'
import * as MixFlags from '../../utils/flags'
import MixCommand, {Columns} from '../../utils/base/mix-command'
import {ApplicationsListParams, MixClient, MixResponse, MixResult} from '../../mix/types'
import {DomainOption} from '../../utils/validations'
import {defaultLimit} from '../../utils/constants'

const debug = makeDebug('mix:commands:applications:list')

export default class ApplicationsList extends MixCommand {
  static description = `list Mix applications
  
Use this command to list Mix applications.
A number of flags can be used to constrain the returned results.`

  static examples = [
    'List Mix applications to which you have access, across all organizations',
    'mix applications:list',
    '',
    'List Mix applications that are part of a particular organization',
    'mix applications:list -O 64',
  ]

  static flags = {
    full: MixFlags.showFullApplicationDetailsFlag,
    json: MixFlags.jsonFlag,
    limit: MixFlags.limitFlag,
    offset: MixFlags.offsetFlag,
    organization: {
      ...MixFlags.organizationFlag,
      required: false,
    },
    ...MixFlags.tableFlags({except: ['extended']}),
    'live-only': flags.boolean({
      description: MixFlags.liveOnlyFlag.description,
      dependsOn: ['full'],
      exclusive: ['omit-overridden'],
    }),
    'omit-overridden': flags.boolean({
      description: MixFlags.omitOverriddenDesc,
      dependsOn: ['full'],
      exclusive: ['live-only'],
    }),
    'with-name': MixFlags.withApplicationName,
    'with-runtime-app': MixFlags.withRuntimeApp,
    yaml: MixFlags.yamlFlag,
  }

  get columns() {
    debug('get columns()')

    const fullViewOnlyColumns = {
      configs: {
        header: 'AppConfigs',
        get: ({configs}: any) => configs.map(({id}: any) => id).join(','),
      },
      createTime: {header: 'CreateTime'},
    }

    return {
      id: {
        header: 'ApplicationId',
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

    // oclif ensures that full is provided with either live-only/omit-overridden
    // otherwise command errors out before viewType() gets called
    if (!full) {
      return 'AV_VIEW_UNSPECIFIED'
    }

    if (liveOnly) {
      return 'AV_FULL_LIVE_CONFIGS'
    }

    if (omitOverridden) {
      return 'AV_FULL_AVAILABLE_CONFIGS'
    }

    return 'AV_FULL'
  }

  async buildRequestParameters(options: Partial<flags.Output>): Promise<ApplicationsListParams> {
    debug('buildRequestParameters()')
    const {limit = defaultLimit, offset, organization: orgId, 'with-name': filter, 'with-runtime-app': appId} = options

    return {
      ...(typeof limit === 'undefined' ? {} : {limit}),
      ...(typeof offset === 'undefined' ? {} : {offset}),
      ...(typeof orgId === 'undefined' ? {} : {orgId}),
      ...(typeof filter === 'undefined' ? {} : {filter}),
      ...(typeof appId === 'undefined' ? {} : {appId}),
      view: this.viewType,
    }
  }

  doRequest(client: MixClient, params: ApplicationsListParams): Promise<MixResponse> {
    debug('doRequest()')
    return ApplicationsAPI.listApplications(client, params)
  }

  outputHumanReadable(transformedData: any) {
    debug('outputHumanReadable()')
    const {options} = this

    if (transformedData.length === 0) {
      this.log('No applications found.')

      return
    }

    if (options.full) {
      this.warn(`Full application configuration objects are complex, so some data is not shown.
If you want to see all app configs, either:
retry the command in JSON or YAML mode, or
use applications:get to get full details for a single app.
`)
    }

    super.outputHumanReadable(transformedData, options)
  }

  setRequestActionMessage(options: any) {
    debug('setRequestActionMessage()')
    const optionalOrganizationInfo = options.organization ? ` for organization ID ${chalk.cyan(options.organization)}` : ''
    this.requestActionMessage = 'Retrieving applications' + optionalOrganizationInfo
  }

  transformResponse(result: MixResult) {
    debug('transformResponse()')
    const data = result.data as any
    const {applications, count, totalSize, offset, limit} = data
    this.context.set('count', count)
    this.context.set('offset', offset)
    this.context.set('limit', limit)
    this.context.set('totalSize', totalSize)

    return applications
  }
}
