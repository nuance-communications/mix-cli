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
import {MixClient, MixResponse, ProjectsReplaceParams} from '../../mix/types'

const debug = makeDebug('mix:commands:projects:replace')

export default class ProjectsReplace extends MixCommand {
  static description = `replace the content of a project
  
Use this command to replace the project content with the .zip file provided.

It is recommended to use the projects:export command to create a backup of
the project before using the projects:replace command.

Note that the grammar, transformation, and pronunciation files are restricted
to users with the required permissions. Attempting to replace the content of
a project that contains grammar, transformation, and pronunciation files
without the permissions needed to provide all the expected files may result
in an incomplete project.`

  static examples = [
    'Replace the content of a project',
    '$ mix projects:replace -P 29050 -f myProject.zip',
    '',
    'Replace the content of a project using pre-confirmation',
    '$ mix projects:replace -P 29050 -f myProject.zip -c 29050',
  ]

  static flags = {
    confirm: MixFlags.confirmFlag,
    filepath: MixFlags.inputFilePathFlag,
    ...MixFlags.machineOutputFlags,
    project: MixFlags.projectWithDefaultFlag,
  }

  action = 'replace'
  shouldConfirmCommand = true

  async buildRequestParameters(options: Partial<flags.Output>): Promise<ProjectsReplaceParams> {
    debug('buildRequestParameters()')
    const {filepath: filePath, project: projectId} = options

    return {filePath, projectId}
  }

  doRequest(client: MixClient, params: ProjectsReplaceParams): Promise<MixResponse> {
    debug('doRequest()')
    return ProjectsAPI.replaceProject(client, params)
  }

  get expectedConfirmationValue() {
    debug('get expectedConfirmationValue()')
    return this.options.project.toString()
  }

  outputHumanReadable(transformedData: any) {
    debug('outputHumanReadable()')
    const {id} = transformedData

    if (id) {
      this.log(`Project replace job ${id} successfully queued.`)
      this.log(`Use 'mix jobs:get -P ${this.options.project} -J ${id} --watch' to monitor progress.`)
    }
  }

  setRequestActionMessage(options: any) {
    debug('setRequestActionMessage()')
    this.requestActionMessage = (options.isWatching ?? false) ?
      `Waiting for job to replace ${options.project} to complete` :
      `Replacing project ${options.project}`
  }

  warnBeforeConfirmation() {
    debug('warnBeforeConfirmation()')
    this.warn(chalk.yellow(`This command is a destructive operation that cannot be undone.
Consider making a backup of your project first.`))
  }
}
