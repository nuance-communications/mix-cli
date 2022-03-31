/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {flags} from '@oclif/command'
import makeDebug from 'debug'

import * as ApplicationsAPI from '../../mix/api/applications'
import * as MixFlags from '../../utils/flags'
import MixCommand, {Columns} from '../../utils/base/mix-command'
import {ApplicationsListParams, MixClient, MixResponse, MixResult} from '../../mix/types'
import {DomainOption} from '../../utils/validations'

const debug = makeDebug('mix:commands:applications:list')

export default class ApplicationsList extends MixCommand {
  static description = `list Mix applications in an organization
  
Use this command to list Mix applications for a specific Mix organization.
A number of flags can be used to constrain the returned results.`

  static examples = [
    '$ mix applications:list -O 64',
  ]

  static flags = {
    full: MixFlags.showFullApplicationDetailsFlag,
    json: MixFlags.jsonFlag,
    organization: MixFlags.organizationFlag,
    ...MixFlags.tableFlags({except: ['extended']}),
    'omit-overridden': flags.boolean({
      description: MixFlags.omitOverriddenDesc,
      dependsOn: ['full'],
    }),
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
    const {organization: orgId, 'with-runtime-app': appId} = options

    return {
      orgId,
      ...(typeof appId === 'undefined' ? {} : {appId}),
      view: this.viewType,
    }
  }

  captureOptions() {
    debug('captureOptions()')
    const {flags} = this.parse(ApplicationsList)
    this.options = flags
  }

  doRequest(client: MixClient, params: ApplicationsListParams): Promise<MixResponse> {
    debug('doRequest()')
    return ApplicationsAPI.listApplications(client, params)
  }

  outputHumanReadable(transformedData: any) {
    debug('outputHumanReadable()')
    const {columns, options} = this
    if (options.full) {
      this.warn(`Full application configuration objects are complex, so some data is not shown.
If you want to see all app configs, either:
retry the command in JSON or YAML mode, or
use applications:get to get full details for a single app.
`)
    }

    super.outputCLITable(transformedData, columns)
  }

  setRequestActionMessage(options: any) {
    debug('setRequestActionMessage()')
    this.requestActionMessage = `Retrieving applications for organization ID ${options.organization}`
  }

  transformResponse(result: MixResult) {
    debug('transformResponse()')
    const data = result.data as any
    return data.applications
  }
}
