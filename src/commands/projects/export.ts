/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {flags} from '@oclif/command'
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

Use the --metadata-only flag to export the project metadata JSON file only.`

  static examples = [
    'Export the project package to a zip file',
    '$ mix projects:export -P 29050 -f project.zip --overwrite',
    '',
    'Export the projecte metadata JSON file only',
    '$ mix projects:export -P 29050 -f metadata.json --metadata-only --overwrite',
  ]

  static flags = {
    filepath: MixFlags.outputFilePathFlag,
    'metadata-only': MixFlags.projectMetadataOnlyFlag,
    overwrite: MixFlags.overwriteFileFlag,
    project: MixFlags.projectWithDefaultFlag,
  }

  shouldDownloadFile = true

  get domainOptions(): DomainOption[] {
    debug('get domainOptions()')
    return ['project']
  }

  async buildRequestParameters(options: Partial<flags.Output>): Promise<ProjectsGetParams> {
    debug('buildRequestParams()')
    const {project: projectId} = options

    return {projectId}
  }

  captureOptions() {
    debug('captureOptions()')
    const {flags} = this.parse(ProjectsExport)
    this.options = flags
  }

  doRequest(client: MixClient, params: ProjectsGetParams): Promise<MixResponse> {
    debug('doRequest()')

    return this.options['metadata-only'] ?
      ProjectsAPI.exportProjectMetadata(client, params) :
      ProjectsAPI.exportProject(client, params)
  }

  outputHumanReadable(_transformedData: any, options: Partial<flags.Output>) {
    debug('outputHumanReadable()')
    const exportSource = options['metadata-only'] ?
      'Project metadata' : 'Project package'
    this.log(`${exportSource} exported to file ${this.options.filepath}`)
  }

  setRequestActionMessage(options: any) {
    debug('setRequestActionMessage()')
    this.requestActionMessage = (options['metadata-only'] ?
      'Exporting project metadata' : 'Exporting project package') + ` for project ${options.project}`
  }
}
