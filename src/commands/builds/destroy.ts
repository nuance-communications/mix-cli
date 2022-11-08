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

const debug = makeDebug('mix:commands:builds:destroy')

export default class BuildsDestroy extends MixCommand {
  static description = `destroy a build
  
Use this command to permanently delete a build. The build can be specified
using the build label or the combination of project ID, build type and build
version.

The deletion needs to be confirmed by re-typing the build label when prompted.
It can also be pre-confirmed by using the --confirm flag.`

  static examples = [
    'Destroy a build',
    '$ mix builds:destroy -P 1922 --build-type asr --build-version 11',
    '',
    'Destroy a build using a build label',
    '$ mix builds:destroy --build-label ASR_1922_11',
    '',
    'Destroy a project and provide automatic confirmation',
    '$ mix builds:destroy --build-label ASR_1922_11 --confirm ASR_1922_11',
  ]

  static flags = {
    // keep build-label first in the flags list so that the relevant error
    // message is given to user when mixing build-label with other flags.
    'build-label': flags.string({
      description: MixFlags.buildLabelDesc,
      exclusive: ['build-type', 'project', 'build-version'],
    }),
    'build-type': flags.string({
      dependsOn: ['build-version', 'project'],
      description: MixFlags.buildTypeDesc,
      exclusive: ['build-label'],
      options: MixFlags.buildTypeOptions,
    }),
    'build-version': flags.integer({
      dependsOn: ['build-type', 'project'],
      description: MixFlags.buildVersionDesc,
      exclusive: ['build-label'],
    }),
    confirm: MixFlags.confirmFlag,
    ...MixFlags.machineOutputFlags,
    project: flags.integer({
      char: MixFlags.projectShortcut,
      description: MixFlags.projectDesc,
      dependsOn: ['build-version', 'build-type'],
      exclusive: ['build-label'],
    }),
  }

  action = 'destroy'
  shouldConfirmCommand = true

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

    let buildLabelValue: string

    if (project && buildType && buildVersion) {
      buildLabelValue = `${buildType.toUpperCase()}_${project}_${buildVersion}`
    } else if (buildLabel) {
      buildLabelValue = buildLabel
    } else {
      this.error(`Required flag(s) missing.
  A build is uniquely identified by its build label
  OR by the combination of its build type, project ID and build version.`,
      {
        suggestions: [
          'Set --build-label flag OR ...',
          'Set --project, --build-type AND -–build-version flags.',
        ],
      })
    }

    this.context.set('buildLabel', buildLabelValue)

    return {buildLabel: buildLabelValue}
  }

  doRequest(client: MixClient, params: BuildsGetParams): Promise<MixResponse> {
    debug('doRequest()')
    return BuildsAPI.deleteBuild(client, params)
  }

  get expectedConfirmationValue() {
    debug('get expectedConfirmationValue()')
    const buildLabel:string = this.context.get('buildLabel')
    return buildLabel
  }

  outputHumanReadable(_transformedData: any) {
    debug('outputHumanReadable()')
    // Add buildLabel as endpoint response does not provide it
    this.log(`Build ${chalk.cyan(this.context.get('buildLabel'))} destroyed.`)
  }

  setRequestActionMessage(_options: any) {
    debug('setRequestActionMessage()')
    this.requestActionMessage = 'Destroying build'
  }

  warnBeforeConfirmation() {
    debug('warnBeforeConfirmation()')
    this.warn(chalk.yellow('Destroying a build cannot be undone.'))
  }
}
