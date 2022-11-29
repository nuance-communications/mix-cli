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
import MixCommand from '../../utils/base/mix-command'
import {MixClient, MixResponse, ProjectsConfigureParams} from '../../mix/types'
import {DomainOption} from '../../utils/validations'

const debug = makeDebug('mix:commands:projects:configure')

export default class ProjectsConfigure extends MixCommand {
  static description =
    `configure a project
    
Use this command to update the data pack for a locale used in a project.
The operation is not carried out immediately. Instead, the Mix backend returns
a job ID that can be used to monitor progress. mix-cli outputs detailed
information on the created job when the --json flag is provided.

Note that you cannot add a new locale with this command.
`

  static examples = [
    '$ mix projects:configure -P 1922 --data-pack en-US@4.7.0',
  ]

  static flags = {
    'data-pack': MixFlags.dataPackFlag,
    ...MixFlags.machineOutputFlags,
    project: MixFlags.projectWithDefaultFlag,
  }

  get domainOptions(): DomainOption[] {
    debug('get domainOptions()')
    return ['data-pack', 'project']
  }

  async buildRequestParameters(options: Partial<flags.Output>): Promise<ProjectsConfigureParams> {
    debug('buildRequestParameters()')
    const dataPack = options['data-pack'] ?? ''
    const [locale, version] = dataPack.split('@')
    const {project: projectId} = options

    return {locale, projectId, version}
  }

  doRequest(client: MixClient, params: ProjectsConfigureParams): Promise<MixResponse> {
    debug('doRequest()')
    return ProjectsAPI.configureProject(client, params)
  }

  outputHumanReadable(transformedData: any) {
    debug('outputHumanReadable()')
    const {id, projectId} = transformedData

    this.log(`Configuration job ${chalk.cyan(id)} successfully queued.`)
    this.log(`Use 'mix jobs:get -P ${projectId} -J ${id} --watch' to monitor progress.`)
  }

  setRequestActionMessage(options: any) {
    debug('setRequestActionMessage()')
    this.requestActionMessage = `Updating project ${chalk.cyan(options.project)}`
  }
}
