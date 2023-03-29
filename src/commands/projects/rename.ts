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
import {MixClient, MixResponse, ProjectsRenameParams} from '../../mix/types'
import MixCommand from '../../utils/base/mix-command'

const debug = makeDebug('mix:commands:projects:rename')
export default class ProjectsRename extends MixCommand {
  static description = `rename a project
  
Use this command to rename a project.`

  static examples = ['$ mix projects:rename -P 1922 --new-name ACME']

  static flags = {
    'new-name': Flags.string({
      required: true,
      description: 'new project name',
    }),
    ...MixFlags.machineOutputFlags,
    project: MixFlags.projectWithDefaultFlag,
  }

  get domainOptions(): DomainOption[] {
    debug('get domainOptions()')
    return ['project']
  }

  async buildRequestParameters(options: Partial<FlagOutput>): Promise<ProjectsRenameParams> {
    debug('buildRequestParameters()')
    const {
      'new-name': displayName,
      project: projectId,
    } = options

    return {displayName, projectId}
  }

  doRequest(client: MixClient, params: ProjectsRenameParams): Promise<MixResponse> {
    debug('doRequest()')
    return ProjectsAPI.renameProject(client, params)
  }

  outputHumanReadable(transformedData: any) {
    debug('outputHumanReadable()')
    const {displayName} = transformedData
    this.log(`Project renamed to ${chalk.cyan(displayName)}.`)
  }

  setRequestActionMessage(options: any) {
    debug('setRequestActionMessage()')
    this.requestActionMessage = `Renaming project ID ${chalk.cyan(options.project)}`
  }
}
