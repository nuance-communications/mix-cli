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
import {JobsGetParams, MixClient, MixResponse} from '../../mix/types'
import {DomainOption} from '../../utils/validations'

const debug = makeDebug('mix:commands:jobs:cancel')

export default class JobsCancel extends MixCommand {
  static description = `cancel a job
  
Use this command to cancel a job. Canceling a job does not necessarily
terminate it but allows a similar job to be launched before the completion
of the original one.`

  static examples = ['mix jobs:cancel -P 1922 -J 15d4d4ce-7cc3-45f6-ab38-aad326e6fc20']

  static flags = {
    confirm: MixFlags.confirmFlag,
    job: MixFlags.jobFlag,
    ...MixFlags.machineOutputFlags,
    project: MixFlags.projectWithDefaultFlag,
  }

  action = 'cancel'
  shouldConfirmCommand = true

  async buildRequestParameters(options: Partial<flags.Output>): Promise<JobsGetParams> {
    debug('buildRequestParameters()')
    const {job: jobId, project: projectId} = options

    return {jobId, projectId}
  }

  get domainOptions(): DomainOption[] {
    debug('get domainOptions()')
    return ['job', 'project']
  }

  doRequest(client: MixClient, params: JobsGetParams): Promise<MixResponse> {
    debug('doRequest()')
    return JobsAPI.deleteJob(client, params)
  }

  get expectedConfirmationValue() {
    debug('get expectedConfirmationValue()')
    return this.options.project.toString()
  }

  outputHumanReadable(transformedData: any) {
    debug('outputHumanReadable()')
    const {message} = transformedData
    const {project, job} = this.options
    if (message === 'Job deleted.') {
      this.log(`\nCancel request for job ${job} in project ${project} completed successfully.`)
    } else {
      this.log(`\nCancel request failed for job ${job} in project ${project}.`)
      this.debug(`Failed Response was ${JSON.stringify(transformedData)}`)
    }

    this.log(`\nCanceling a job does not necessarily terminate it but allows a similar job
to be launched before the completion of the original one.`)
  }

  setRequestActionMessage(_options: any) {
    debug('setRequestActionMessage()')
    this.requestActionMessage = 'Attempting to cancel job'
  }
}
