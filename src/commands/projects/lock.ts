/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import chalk from 'chalk'
import {Flags} from '@oclif/core'
import {FlagOutput} from '@oclif/core/lib/interfaces'
import makeDebug from 'debug'

import * as MixFlags from '../../utils/flags'
import * as ProjectsAPI from '../../mix/api/projects'
import {DomainOption} from '../../utils/validations'
import {MixClient, MixResponse, ProjectsLockParams} from '../../mix/types'
import MixCommand from '../../utils/base/mix-command'

const debug = makeDebug('mix:commands:projects:lock')

export default class ProjectsLock extends MixCommand {
  static description = `lock a project

Use this command to lock a project.
A project cannot be edited while it is locked.`

  static examples = [
    'Lock a project with project lock notes',
    '$ mix projects:lock -P 1922 --notes="Project lock notes"',
  ]

  static flags = {
    project: MixFlags.projectWithDefaultFlag,
    notes: Flags.string({
      required: true,
      description: 'project lock notes',
    }),
    ...MixFlags.machineOutputFlags,
  }

  get domainOptions(): DomainOption[] {
    debug('get domainOptions()')
    return ['project']
  }

  async buildRequestParameters(options: Partial<FlagOutput>): Promise<ProjectsLockParams> {
    debug('buildRequestParameters()')
    const {
      project: projectId,
      notes,
    } = options

    return {projectId, notes}
  }

  doRequest(client: MixClient, params: ProjectsLockParams): Promise<MixResponse> {
    debug('doRequest()')
    return ProjectsAPI.lockProject(client, params)
  }

  outputHumanReadable(_transformedData: any) {
    debug('outputHumanReadable()')
    this.log(`Project ${chalk.cyan(this.options.project)} is locked.`)
  }

  setRequestActionMessage(options: any) {
    debug('setRequestActionMessage()')
    this.requestActionMessage = `Locking project ${chalk.cyan(options.project)}`
  }
}
