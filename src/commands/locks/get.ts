/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import chalk from 'chalk'
import {FlagOutput} from '@oclif/core/lib/interfaces'
import makeDebug from 'debug'

import * as MixFlags from '../../utils/flags'
import * as ProjectsAPI from '../../mix/api/projects'
import {DomainOption} from '../../utils/validations'
import {MixClient, MixResponse, MixResult, ProjectsLockGetParams} from '../../mix/types'
import MixCommand from '../../utils/base/mix-command'

const debug = makeDebug('mix:commands:locks:get')

export default class LocksGet extends MixCommand {
  static description = `get details about a project lock

Use this command to get details about a project lock.
A project cannot be edited while it is locked.`

  static examples = [
    'Get details about a project lock',
    '$ mix locks:get -P 1922"',
  ]

  static flags = {
    json: MixFlags.jsonFlag,
    project: MixFlags.projectWithDefaultFlag,
    yaml: MixFlags.yamlFlag,
  }

  get domainOptions(): DomainOption[] {
    debug('get domainOptions()')
    return ['project']
  }

  async buildRequestParameters(options: Partial<FlagOutput>): Promise<ProjectsLockGetParams> {
    debug('buildRequestParameters()')
    const {
      project: projectId,
    } = options

    return {projectId}
  }

  doRequest(client: MixClient, params: ProjectsLockGetParams): Promise<MixResponse> {
    debug('doRequest()')
    return ProjectsAPI.getProjectLock(client, params)
  }

  outputHumanReadable(transformedData: any) {
    debug('outputHumanReadable()')

    if (transformedData === undefined) {
      this.log('No lock found.')

      return
    }

    this.log(`${chalk.bold('LockId')}: ${transformedData.lockId}`)
    this.log(`${chalk.bold('ProjectId')}: ${transformedData.projectId}`)
    this.log(`${chalk.bold('LockOwnerName')}: ${transformedData.lockOwner.name}`)
    this.log(`${chalk.bold('LockOwnerEmail')}: ${transformedData.lockOwner.email}`)
    this.log(`${chalk.bold('LockUserId')}: ${transformedData.lockOwner.id}`)
    this.log(`${chalk.bold('CreateTime')}: ${transformedData.createTime}`)
    this.log(`${chalk.bold('Notes')}: ${transformedData.notes}`)
  }

  setRequestActionMessage(options: any) {
    debug('setRequestActionMessage()')
    this.requestActionMessage = `Retrieving lock information for project ${chalk.cyan(options.project)}`
  }

  transformResponse(result: MixResult) {
    debug('transformResponse()')
    const data = result.data as any
    return data.lock
  }
}
