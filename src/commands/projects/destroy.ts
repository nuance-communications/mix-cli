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
import {MixClient, MixResponse, ProjectsGetParams} from '../../mix/types'
import {DomainOption} from '../../utils/validations'

const debug = makeDebug('mix:commands:projects:destroy')

export default class ProjectsDestroy extends MixCommand {
  static description = `destroy a project

Use this command to permanently delete a specific project.
Unless a backup exists, there is no way to restore a project that
has been destroyed.

The deletion needs to be confirmed by re-typing the project ID when prompted.
It can also be pre-confirmed by using the --confirm flag.`

  static examples = [
    'Destroy a project',
    '$ mix projects:destroy -P 1922',
    '',
    'Destroy a project and provide automatic confirmation',
    '$ mix projects:destroy -P 1922 -c 1922',
  ]

  static flags = {
    confirm: MixFlags.confirmFlag,
    ...MixFlags.machineOutputFlags,
    project: MixFlags.projectFlag,
  }

  action = 'destroy'
  shouldConfirmCommand = true

  get domainOptions(): DomainOption[] {
    debug('get domainOptions()')
    return ['project']
  }

  async buildRequestParameters(options: Partial<flags.Output>): Promise<ProjectsGetParams> {
    debug('buildRequestParameters()')
    const {project: projectId} = options

    return {projectId}
  }

  doRequest(client: MixClient, params: ProjectsGetParams): Promise<MixResponse> {
    debug('doRequest()')
    return ProjectsAPI.deleteProject(client, params)
  }

  get expectedConfirmationValue() {
    debug('get expectedConfirmationValue()')
    return this.options.project.toString()
  }

  outputHumanReadable(_transformedData: any) {
    debug('outputHumanReadable()')
    // Add project ID as endpoint response does not provide it
    this.log(`Project ${this.options.project} was deleted.`)
  }

  setRequestActionMessage(_options: any) {
    debug('setRequestActionMessage()')
    this.requestActionMessage = 'Destroying project'
  }

  warnBeforeConfirmation() {
    debug('warnBeforeConfirmation()')
    this.warn(chalk.yellow('Destroying a project cannot be undone. Consider making a backup of your project first.'))
  }
}
