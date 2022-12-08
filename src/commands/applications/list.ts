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
import {pluralize as s} from '../../utils/format'

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
    'omit-overridden': flags.boolean({
      description: MixFlags.omitOverriddenDesc,
      dependsOn: ['full'],
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

    const {full, 'omit-overridden': omitOverridden} = this.options
    return full && omitOverridden ?
      'AV_FULL_AVAILABLE_CONFIGS' :
      (full ?
        'AV_FULL' :
        'AV_VIEW_UNSPECIFIED')
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
    const {columns, context, options} = this
    const count: number = context.get('count')
    const totalSize: number = context.get('totalSize')

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

    if (totalSize > count) {
      this.log(`\nShowing ${chalk.cyan(count)} of ${chalk.cyan(totalSize)} application${s(count)}.\n`)
    }

    super.outputCLITable(transformedData, columns)
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
