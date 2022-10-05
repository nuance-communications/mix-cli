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

import * as BuildsAPI from '../../mix/api/builds'
import * as MixFlags from '../../utils/flags'
import MixCommand from '../../utils/base/mix-command'
import {BuildsGetParams, MixClient, MixResponse} from '../../mix/types'
import {DomainOption} from '../../utils/validations'
import {eNoBuildInfo} from '../../utils/errors'

const debug = makeDebug('mix:commands:builds:export')

export default class BuildsExport extends MixCommand {
  static description = `export a project build
  
Use this command to export a project build. The build can be specified using
the build label or the combination of project ID, build type and build version.

The contents of the exported zip file depend on the role you have been granted
on the Mix platform.`

  static examples = [
    'Export a build using a build label',
    '$ mix builds:export --build-label ASR_29050_11 -f build.zip',
    '',
    'Export a build using project ID, build type and build version',
    '$ mix builds:export -P 29050 --build-type asr --build-version 11 -f build.zip --overwrite',
  ]

  static flags = {
    'build-label': flags.string({
      description: MixFlags.buildLabelDesc,
      exclusive: ['build-type', 'project', 'build-version'],
    }),
    'build-version': flags.integer({
      description: MixFlags.buildVersionDesc,
      exclusive: ['build-label'],
      dependsOn: ['build-type', 'project'],
    }),
    'build-type': flags.string({
      dependsOn: ['build-version', 'project'],
      description: MixFlags.buildTypeDesc,
      exclusive: ['build-label'],
      options: MixFlags.buildTypeOptions,
    }),
    filepath: MixFlags.outputFilePathFlag,
    overwrite: MixFlags.overwriteFileFlag,
    project: flags.integer({
      char: MixFlags.projectShortcut,
      dependsOn: ['build-version', 'build-type'],
      description: MixFlags.projectDesc,
      exclusive: ['build-label'],
    }),
  }

  shouldDownloadFile = true

  get domainOptions(): DomainOption[] {
    debug('get domainOptions()')
    return ['build-label', 'build-version', 'project']
  }

  async buildRequestParameters(options: Partial<flags.Output>): Promise<BuildsGetParams> {
    debug('buildRequestParameters()')
    const {
      'build-type': buildType,
      'build-version': buildVersion,
      'build-label': buildLabel,
      project,
    } = options

    let buildLabelValue = ''

    if (project && buildType && buildVersion) {
      buildLabelValue = `${buildType.toUpperCase()}_${project}_${buildVersion}`
    } else if (buildLabel) {
      buildLabelValue = buildLabel
    }

    return {buildLabel: buildLabelValue}
  }

  doRequest(client: MixClient, params: BuildsGetParams): Promise<MixResponse> {
    debug('doRequest()')
    return BuildsAPI.exportBuild(client, params)
  }

  outputHumanReadable(_transformedData: any) {
    debug('outputHumanReadable()')
    this.log(`Build exported to file ${chalk.cyan(this.options.filepath)}`)
  }

  setRequestActionMessage(_options: any) {
    debug('setRequestActionMessage()')
    this.requestActionMessage = 'Exporting build'
  }

  // There is the possibility that users provide no flags at all
  // as no single flag is actually marked 'required'
  tryDomainOptionsValidation(options: Partial<flags.Output>, domainOptions: DomainOption[]) {
    debug('tryDomainOptionsValidation()')
    super.tryDomainOptionsValidation(options, domainOptions)

    const {project, 'build-type': buildType, 'build-version': buildVersion, 'build-label': buildLabel} = options
    if (buildLabel || (project && buildType && buildVersion)) {
      return // all good
    }

    this.error(eNoBuildInfo())
  }
}
