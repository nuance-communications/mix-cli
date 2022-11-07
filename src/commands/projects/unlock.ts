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

import * as MixFlags from '../../utils/flags'
import * as ProjectsAPI from '../../mix/api/projects'
import {DomainOption} from '../../utils/validations'
import {MixClient, MixResponse, ProjectsUnlockParams} from '../../mix/types'
import MixCommand from '../../utils/base/mix-command'

const debug = makeDebug('mix:commands:projects:unlock')

export default class ProjectsUnlock extends MixCommand {
  static description = `unlock a project

Use this command to unlock a project.
A project cannot be edited while it is locked.`

  static examples = [
    'Unlock a project',
    '$ mix projects:unlock -P 1922"',
  ]

  static flags = {
    project: MixFlags.projectWithDefaultFlag,
  }

  get domainOptions(): DomainOption[] {
    debug('get domainOptions()')
    return ['project']
  }

  async buildRequestParameters(options: Partial<flags.Output>): Promise<ProjectsUnlockParams> {
    debug('buildRequestParameters()')
    const {
      project: projectId,
    } = options

    return {projectId}
  }

  doRequest(client: MixClient, params: ProjectsUnlockParams): Promise<MixResponse> {
    debug('doRequest()')
    return ProjectsAPI.unlockProject(client, params)
  }

  outputHumanReadable(_transformedData: any) {
    debug('outputHumanReadable()')
    this.log(`Project ${chalk.cyan(this.options.project)} is unlocked.`)
  }

  setRequestActionMessage(options: any) {
    debug('setRequestActionMessage()')
    this.requestActionMessage = `Unlocking project ${chalk.cyan(options.project)}`
  }
}
