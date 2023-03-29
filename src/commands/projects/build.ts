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
import {asArray} from '../../utils/as-array'
import {DomainOption} from '../../utils/validations'
import {MixClient, MixResponse, ProjectsBuildParams} from '../../mix/types'
import MixCommand from '../../utils/base/mix-command'
import {pluralize as s} from '../../utils/format'

const debug = makeDebug('mix:commands:projects:build')

export default class ProjectsBuild extends MixCommand {
  static description = `build a project
  
Use this command to build a project.`

  static examples = [
    'Build a project to create models for nlu and asr using locale en-US',
    '$ mix projects:build -L en-US -P 1922 --build-type asr --build-type nlu --nlu-model-type fast --notes "Our first build"',
  ]

  static flags = {
    'build-type': Flags.string({
      description: MixFlags.buildTypeDesc,
      default: ['nlu'],
      multiple: true,
      options: MixFlags.buildTypeOptions,
    }),
    locale: MixFlags.localeMultipleWithDefaultFlag,
    notes: MixFlags.buildNotesFlag,
    'nlu-model-type': MixFlags.nluModelTypeFlag,
    ...MixFlags.machineOutputFlags,
    project: MixFlags.projectWithDefaultFlag,
  }

  get domainOptions(): DomainOption[] {
    debug('get domainOptions()')
    return ['locale[]', 'project']
  }

  async buildRequestParameters(options: Partial<FlagOutput>): Promise<ProjectsBuildParams> {
    debug('buildRequestParameters()')
    const {
      'build-type': buildType,
      locale,
      'nlu-model-type': nluModelType,
      notes,
      project: projectId,
    } = options

    return {
      buildTypes: asArray(buildType),
      locales: asArray(locale),
      ...(typeof notes === 'undefined' ? {} : {notes}),
      ...(typeof nluModelType === 'undefined' ? {} : {nluModelType}),
      projectId,
    }
  }

  async captureOptions() {
    await super.captureOptions()
    this.options.locale = asArray(this.options.locale)
  }

  doRequest(client: MixClient, params: ProjectsBuildParams): Promise<MixResponse> {
    debug('doRequest()')
    return ProjectsAPI.buildProject(client, params)
  }

  setRequestActionMessage(options: any) {
    debug('setRequestActionMessage()')
    this.requestActionMessage = `Creating build job for project ID ${chalk.cyan(options.project)} ` +
`with locale${s(options.locale.length)} ${chalk.cyan(options.locale)}`
  }

  outputHumanReadable(transformedData: any) {
    debug('outputHumanReadable()')
    const {id: jobId, projectId} = transformedData
    this.log(`Build job ${chalk.cyan(jobId)} successfully queued.`)
    this.log(`Use 'mix jobs:get -P ${projectId} -J ${jobId} --watch' to monitor progress.`)
  }
}
