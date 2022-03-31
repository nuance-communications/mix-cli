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

import * as AppConfigsAPI from '../../mix/api/app-configs'
import * as MixFlags from '../../utils/flags'
import MixCommand from '../../utils/base/mix-command'
import {AppConfigsUpgradeParams, MixClient, MixResponse, MixResult} from '../../mix/types'
import {DomainOption} from '../../utils/validations'

const debug = makeDebug('mix:commands:app-configs:upgrade')

export default class AppConfigsUpgrade extends MixCommand {
  static description = `update an application configuration to latest build versions
 
Use this command to upgrade an application configuration to the latest build
versions. The configuration ID can be retrieved using the app-configs:list command.`

  static examples = [
    'Upgrade an application configuration using latest builds from project without data hosts information',
    '$ mix app-configs:upgrade -C 334',
    '',
    'Upgrade an application configuration using latest builds from project including data hosts defined in project',
    '$ mix app-configs:upgrade -C 334 --use-project-data-hosts',
  ]

  static flags = {
    config: MixFlags.appConfigurationFlag,
    ...MixFlags.machineOutputFlags,
    'use-project-data-hosts': MixFlags.useProjectDataHostsFlag,
  }

  get domainOptions(): DomainOption[] {
    debug('get domainOptions()')
    return ['config']
  }

  async buildRequestParameters(options: Partial<flags.Output>): Promise<AppConfigsUpgradeParams> {
    debug('buildRequestParameters()')
    const {
      config: configId,
      'use-project-data-hosts': useProjectDefault,
    } = options

    return {configId, useProjectDefault}
  }

  captureOptions() {
    debug('captureOptions()')
    const {flags} = this.parse(AppConfigsUpgrade)
    this.options = flags
  }

  doRequest(client: MixClient, params: AppConfigsUpgradeParams): Promise<MixResponse> {
    debug('doRequest()')
    return AppConfigsAPI.ugpradeAppConfig(client, params)
  }

  outputHumanReadable(transformedData: any) {
    debug('outputHumanReadable()')
    const {builds = {}, id, tag} = transformedData
    const theAppConfig = `Application configuration with tag "${chalk.cyan(tag)}" and ID ${chalk.cyan(id)}`

    if (Object.keys(builds).length === 0) {
      this.log(`${theAppConfig} has no builds.`)
      return
    }

    this.log(`${theAppConfig} is upgraded.`)
    for (const buildType of ['asr', 'dialog', 'nlu']) {
      if (builds[buildType]) {
        const typeBuilds = buildType === 'dialog' ? [builds[buildType]] : builds[buildType].builds
        const buildsList = typeBuilds.map((build: any) => {
          const locale = buildType === 'dialog' ? '' : ` (${build.locale})`
          return `${build.buildLabel}${locale}`
        })

        this.log(`${buildType.toUpperCase()} is now at ${buildsList.join(',')}`)
      }
    }
  }

  setRequestActionMessage(_options: any) {
    debug('setRequestActionMessage()')
    this.requestActionMessage = 'Upgrading application configuration to latest versions'
  }

  transformResponse(result: MixResult): any {
    debug('transformResponse()')
    const data = result.data as any
    return data.config
  }
}
