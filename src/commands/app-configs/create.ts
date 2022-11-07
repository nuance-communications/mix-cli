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
import {AppConfigsCreateParams, MixClient, MixResponse, MixResult} from '../../mix/types'
import {DomainOption} from '../../utils/validations'

const debug = makeDebug('mix:commands:app-configs:create')

export default class AppConfigsCreate extends MixCommand {
  static description = `create an application configuration
 
Use this command to create an application configuration. The Mix Application ID
can be looked up using the applications:list command. The deployment flow ID
can be retrieved using the deployment-flows:list command. The context tag
should be unique.`

  static examples = [
    'Create an application configuration using latest builds from project without data hosts information',
    '$ mix app-configs:create -M 233 -D 32 -T AC_20211028 -P 1922',
    '',
    'Create an application configuration using latest builds from project but only for build type ASR',
    'and locale en-US, without data hosts information',
    '$ mix app-configs:create -M 233 -D 32 -T AC_20211028 -P 1922 --with-locale en-US --with-build-type asr',
    '',
    'Create an application configuration using latest builds from project including data hosts defined in project',
    '$ mix app-configs:create -M 233 -D 32 -T AC_20211028 -P 1922 --use-project-data-hosts',
  ]

  public static flags = {
    'deployment-flow': MixFlags.deploymentFlowFlag,
    'mix-app': MixFlags.mixApplicationFlag,
    ...MixFlags.machineOutputFlags,
    project: MixFlags.projectWithDefaultFlag,
    tag: MixFlags.tagFlag,
    'use-project-data-hosts': MixFlags.useProjectDataHostsFlag,
    'with-build-type': MixFlags.withBuildTypeMultipleFlag,
    'with-locale': MixFlags.withLocaleMultipleFlag,
  }

  get domainOptions(): DomainOption[] {
    debug('get domainOptions()')
    return ['deployment-flow', 'mix-app', 'project', 'with-locale']
  }

  async buildRequestParameters(options: Partial<flags.Output>): Promise<AppConfigsCreateParams> {
    debug('buildRequestParameters()')
    const {
      'deployment-flow': deploymentFlowId,
      'mix-app': applicationId,
      project: useLatestFromProject,
      tag,
      'use-project-data-hosts': useProjectDefault,
      'with-build-type': buildTypesList,
      'with-locale': locales,
    } = options

    let buildTypes
    if (Array.isArray(buildTypesList)) {
      buildTypes = buildTypesList.map((type:string) => type.toUpperCase())
    }

    return {
      applicationId,
      ...(typeof buildTypes === 'undefined' ? {} : {buildTypes}),
      deploymentFlowId,
      ...(typeof locales === 'undefined' ? {} : {locales}),
      tag,
      useLatestFromProject,
      useProjectDefault,
    }
  }

  captureOptions() {
    super.captureOptions()
  }

  doRequest(client: MixClient, params: AppConfigsCreateParams): Promise<MixResponse> {
    debug('doRequest()')
    return AppConfigsAPI.createAppConfig(client, params)
  }

  outputHumanReadable(transformedData: any) {
    debug('outputHumanReadable()')
    const {id, tag} = transformedData
    this.log(`Application configuration with tag "${chalk.cyan(tag)}" and ID ${chalk.cyan(id)} created.`)
  }

  setRequestActionMessage(options: any) {
    debug('setRequestActionMessage()')
    this.requestActionMessage = `Creating application configuration with project ID ${chalk.cyan(options.project)}`
  }

  transformResponse(result: MixResult): any {
    debug('transformResponse()')
    const data = result.data as any
    return data.config
  }
}
