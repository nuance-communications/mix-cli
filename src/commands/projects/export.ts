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
import MixCommand from '../../utils/base/mix-command'
import {MixClient, MixResponse, ProjectsGetParams} from '../../mix/types'
import {DomainOption} from '../../utils/validations'

const debug = makeDebug.debug('mix:command:projects:export')

export default class ProjectsExport extends MixCommand {
  static description = `export project package

Use this command to export the project package to a zip file.

Note that the grammar, transformation, and pronunciation files are restricted
to Nuance Professional Services users and not available to all users.
As such, the project package exported by regular users will not include
these files. Regular users may end up with an incomplete project after calling
this endpoint.

Use the 'metadata-only' flag to export the project metadata JSON file only.`

  static examples = [
    'Export the project package to a zip file',
    '$ mix projects:export -P 29050 --overwrite',
    '',
    'Export the projecte metadata JSON file only',
    '$ mix projects:export -P 29050 --metadata-only --overwrite',
  ]

  static flags = {
    project: MixFlags.projectWithDefaultFlag,
    filepath: {
      ...MixFlags.outputFilePathFlag,
      description: 'output file path (defaults to "project-<projectId>.zip")',
      required: false,
    },
    'metadata-only': MixFlags.projectMetadataOnlyFlag,
    overwrite: MixFlags.overwriteFileFlag,
  }

  get filepath(): string {
    debug('get filepath()')
    const filePath = this.options.filepath ?? this.defaultFilepath
    return filePath
  }

  get defaultFilepath(): string {
    debug('get defaultFilepath()')
    const defaultFilePath = this.options['metadata-only'] ? `project-metadata-${this.options.project}.json` : `project-${this.options.project}.zip`
    return defaultFilePath
  }

  shouldDownloadFile = true

  get domainOptions(): DomainOption[] {
    debug('get domainOptions()')
    return ['project']
  }

  async buildRequestParameters(options: Partial<FlagOutput>): Promise<ProjectsGetParams> {
    debug('buildRequestParams()')
    const {project: projectId} = options

    return {projectId}
  }

  doRequest(client: MixClient, params: ProjectsGetParams): Promise<MixResponse> {
    debug('doRequest()')

    return this.options['metadata-only'] ?
      ProjectsAPI.exportProjectMetadata(client, params) :
      ProjectsAPI.exportProject(client, params)
  }

  outputHumanReadable(_transformedData: any, options: Partial<FlagOutput>) {
    debug('outputHumanReadable()')
    const exportSource = options['metadata-only'] ?
      'Project metadata' : 'Project package'
    this.log(`${exportSource} exported to file ${options.filepath ? chalk.cyan(options.filepath) : chalk.cyan(this.defaultFilepath)}`)
  }

  setRequestActionMessage(options: any) {
    debug('setRequestActionMessage()')
    this.requestActionMessage = (options['metadata-only'] ?
      'Exporting project metadata' : 'Exporting project package') + ` for project ${chalk.cyan(options.project)}`
  }
}
