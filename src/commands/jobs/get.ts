/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {flags} from '@oclif/command'
import makeDebug from 'debug'

import * as JobsAPI from '../../mix/api/jobs'
import * as MixFlags from '../../utils/flags'
import MixCommand, {Columns} from '../../utils/base/mix-command'
import {JobsGetParams, MixClient, MixResponse} from '../../mix/types'
import {asValueOrNA} from '../../utils/format'
import {DomainOption} from '../../utils/validations'

const debug = makeDebug('mix:commands:jobs:get')

export default class JobsGet extends MixCommand {
  static description = `get details about a job
  
Use this command to get details about a particular job.`

  static examples = ['mix jobs:get -P 1922 -J 25a08872-c635-43f1-b459-5bd98a1c2576']

  static flags = {
    job: MixFlags.jobFlag,
    json: MixFlags.jsonFlag,
    project: MixFlags.projectWithDefaultFlag,
    ...MixFlags.tableFlags({except: ['extended', 'filter', 'sort'], useColumnsWithCSVOnly: true}),
    watch: MixFlags.watchFlag,
    yaml: MixFlags.yamlFlag,
  }

  get columns() {
    debug('get columns()')

    return {
      projectId: {header: 'ProjectId'},
      id: {header: 'JobId'},
      type: {header: 'JobType'},
      status: {header: 'Status'},
      createTime: {header: 'CreateTime'},
      duration: {
        header: 'Duration',
        get: (row: any) => asValueOrNA('duration', row.duration),
      },
    } as Columns
  }

  get reportsColumns() {
    debug('get reportsColumns()')

    return {
      job: {header: 'Report'},
      locale: {header: 'Locale'},
      status: {header: 'Status'},
      createTime: {header: 'CreateTime'},
    }
  }

  get reportsErrorsColumns() {
    debug('get reportsErrorsColumns()')

    return {
      errors: {header: 'Errors'},
    }
  }

  get domainOptions(): DomainOption[] {
    debug('get domainOptions()')
    return ['job', 'project']
  }

  async buildRequestParameters(options: Partial<flags.Output>): Promise<JobsGetParams> {
    debug('buildRequestParameters()')
    const {job: jobId, project: projectId} = options

    return {jobId, projectId}
  }

  doRequest(client: MixClient, params: JobsGetParams): Promise<MixResponse> {
    debug('doRequest()')
    return JobsAPI.getJob(client, params)
  }

  outputHumanReadable(transformedData: any) {
    debug('outputHumanReadable()')

    if (transformedData === undefined) {
      this.log('No job found.')

      return
    }

    this.outputAsKeyValuePairs(transformedData, this.columns)
    this.log()

    let isSomeFailed = false
    const reportsData: any[] = []
    const {report: mainReport} = transformedData

    for (const reportSection of Object.keys(mainReport)) {
      const {reports: sectionReports} = mainReport[reportSection]
      for (const report of sectionReports) {
        const row: any = {}
        row.job = reportSection
        row.locale = report.locale ?? 'n/a'
        row.status = report.status
        row.createTime = report.createTime

        if (Object.prototype.hasOwnProperty.call(report, 'errors') && report.errors.errors.length > 0) {
          row.errors = report.errors.errors.map(({message}: any) => message).join(',')
          isSomeFailed = true
        }

        // only keep the most recent report
        const index = reportsData.findIndex(x => x.job === row.job && x.locale === row.locale)

        if (index === -1) {
          reportsData.push(row)
        } else if (reportsData[index].createTime < row.createTime) {
          reportsData[index] = row
        }
      }
    }

    if (reportsData.length > 0 && !isSomeFailed) {
      this.outputCLITable(reportsData, this.reportsColumns)
    }

    if (isSomeFailed) {
      this.outputCLITable(reportsData, {...this.reportsColumns, ...this.reportsErrorsColumns})
      this.log('\nRun the command again with the --json flag to see detailed errors for reported failures.')
    }
  }

  setRequestActionMessage(_options: any) {
    debug('setRequestActionMessage()')
    this.requestActionMessage = 'Retrieving job details'
  }
}
