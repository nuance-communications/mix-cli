/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {FlagOutput} from '@oclif/core/lib/interfaces'
import makeDebug from 'debug'

import * as ApplicationsAPI from '../../mix/api/applications'
import * as MixFlags from '../../utils/flags'
import MixCommand, {Columns} from '../../utils/base/mix-command'
import {ApplicationsGetParams, MixClient, MixResponse, MixResult} from '../../mix/types'
import {DomainOption} from '../../utils/validations'
import YAML from 'yaml'

const debug = makeDebug('mix:commands:applications:get')

export default class ApplicationsGet extends MixCommand {
  static description = `get details about a Mix application
  
  Use this command to get details about a particular Mix application.`

  static examples = [
    '$ mix applications:get -M 94',
  ]

  static flags = {
    json: MixFlags.jsonFlag,
    'mix-app': MixFlags.mixApplicationFlag,
    ...MixFlags.tableFlags({except: ['extended', 'csv']}),
    yaml: MixFlags.yamlFlag,
  }

  get columns() {
    debug('get columns()')

    return {
      id: {header: 'ApplicationId'},
      applicationName: {header: 'Name'},
      createTime: {header: 'CreateTime'},
    } as Columns
  }

  get configsColumns() {
    debug('get configsColumns()')

    return {
      configId: {header: 'ConfigId'},
      deploymentFlowId: {header: 'DeploymentFlowId'},
      projectId: {header: 'ProjectId'},
      projectName: {header: 'ProjectName'},
      createTime: {header: 'CreateTime'},
    } as Columns
  }

  get domainOptions(): DomainOption[] {
    debug('get domainOptions()')

    return ['mix-app']
  }

  async buildRequestParameters(options: Partial<FlagOutput>): Promise<ApplicationsGetParams> {
    debug('buildRequestParameters()')
    const {'mix-app': filter} = options

    return {
      filter,
      view: 'AV_FULL',
    }
  }

  doRequest(client: MixClient, params: ApplicationsGetParams): Promise<MixResponse> {
    debug('doRequest()')
    return ApplicationsAPI.getApplications(client, params)
  }

  outputJSON(result: MixResult): void {
    debug('outputJSON()')
    this.log(JSON.stringify(this.transformResponse(result), null, 2))
  }

  outputYAML(result: MixResult): void {
    debug('outputYAML()')
    this.log(YAML.stringify(this.transformResponse(result)))
  }

  outputHumanReadable(transformedData: any) {
    debug('outputHumanReadable()')
    const {columns, configsColumns} = this

    if (transformedData.application === undefined) {
      this.log('No application found.')

      return
    }

    const configsData: any[] = []
    const {configs} = transformedData.application
    this.outputAsKeyValuePairs(transformedData.application, columns)
    this.log()

    for (const config of configs) {
      const row: any = {}

      row.configId = config.id
      row.deploymentFlowId = config.deploymentFlowId
      row.projectId = config.projectDetails.projectId
      row.projectName = config.projectDetails.projectName
      row.createTime = config.createTime

      configsData.push(row)
    }

    if (configsData.length > 0) {
      this.outputCLITable(configsData, configsColumns)
    }
  }

  setRequestActionMessage(_options: any) {
    debug('setRequestActionMessage()')
    this.requestActionMessage = 'Retrieving application details'
  }

  transformResponse(result: MixResult) {
    debug('transformResponse()')
    const data = result.data as any
    // Let's only keep the entry that has a matching application ID.
    // The list endpoint may return entries that matched on the application name
    // but those are discarded.
    const application = Object.values(data.applications).find(
      (app: any) => (app.id === this.options['mix-app'].toString()),
    )
    return {application}
  }
}
