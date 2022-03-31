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
import MixCommand from '../../utils/base/mix-command'
import {defaultLimit} from '../../utils/constants'
import {JobsListParams, MixClient, MixResponse, MixResult} from '../../mix/types'
import {DomainOption} from '../../utils/validations'

const debug = makeDebug('mix:commands:jobs:list')

export default class JobsList extends MixCommand {
  static description = `list jobs for a project
  
Use this command to list all jobs related to a particular project.`

  static examples = ['mix jobs:list -P 1922']

  static flags = {
    json: MixFlags.jsonFlag,
    ...MixFlags.limitOffsetSortFlags,
    project: MixFlags.projectWithDefaultFlag,
    ...MixFlags.tableFlags({except: ['extended', 'sort']}),
    yaml: MixFlags.yamlFlag,
  }

  get columns() {
    debug('get columns()')

    return {
      id: {header: 'JobId'},
      type: {header: 'Type'},
      status: {header: 'Status'},
      createTime: {header: 'CreateTime'},
      updateTime: {header: 'UpdateTime'},
      duration: {header: 'Duration'},
    }
  }

  get domainOptions(): DomainOption[] {
    debug('get domainOptions()')
    return ['limit', 'offset', 'project']
  }

  async buildRequestParameters(options: Partial<flags.Output>): Promise<JobsListParams> {
    debug('buildRequestParameters()')
    const {limit = defaultLimit, offset, project: projectId, sort: sortBy} = options

    return {
      ...(typeof limit === 'undefined' ? {} : {limit}),
      ...(typeof offset === 'undefined' ? {} : {offset}),
      projectId,
      ...(typeof sortBy === 'undefined' ? {} : {sortBy}),
    }
  }

  captureOptions() {
    debug('captureOptions()')
    const {flags} = this.parse(JobsList)
    this.options = flags
  }

  doRequest(client: MixClient, params: JobsListParams): Promise<MixResponse> {
    debug('doRequest()')
    return JobsAPI.listJobs(client, params)
  }

  outputHumanReadable(transformedData: any) {
    debug('outputHumanReadable()')
    const {context, options} = this
    const count: number = context.get('count')

    if (count === 0) {
      return this.log('No jobs found.')
    }

    super.outputHumanReadable(transformedData, options)
  }

  setRequestActionMessage(options: any) {
    debug('setRequestActionMessage()')
    this.requestActionMessage = `Retrieving jobs for ${options.project}`
  }

  transformResponse(result: MixResult) {
    debug('transformResponse()')
    const data = result.data as any
    const {count, jobs, offset, limit, totalSize} = data
    this.context.set('count', count)
    this.context.set('offset', offset)
    this.context.set('limit', limit)
    this.context.set('totalSize', totalSize)

    return jobs
  }
}
