/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {flags} from '@oclif/command'
import makeDebug from 'debug'

import * as DataHostsAPI from '../../mix/api/data-hosts'
import * as MixFlags from '../../utils/flags'
import {DataHostsListParams, MixClient, MixResponse, MixResult} from '../../mix/types'
import {DomainOption} from '../../utils/validations'
import {eNoBuildInfo} from '../../utils/errors'
import MixCommand from '../../utils/base/mix-command'

const debug = makeDebug('mix:commands:data-hosts:list')

export default class DataHostsList extends MixCommand {
  static description = `list data host details
  
Use this command to list data host details for a particular Mix Application ID
and dialog build. The build can be specified using the build label or the
combination of project ID and build version. The Mix Application ID can be
retrieved using the applications:list command.`

  static examples = [
    'mix data-hosts:list -D 66 -M 62 -P 14990 --build-version 1',
  ]

  static flags = {
    'build-label': flags.string({
      description: MixFlags.buildLabelDesc,
      exclusive: ['project', 'build-version'],
    }),
    'build-version': flags.integer({
      dependsOn: ['project'],
      description: MixFlags.buildVersionDesc,
      exclusive: ['build-label'],
    }),
    'deployment-flow': MixFlags.withDeploymentFlowFlag,
    json: MixFlags.jsonFlag,
    'mix-app': MixFlags.mixApplicationFlag,
    project: flags.integer({
      char: MixFlags.projectShortcut,
      dependsOn: ['build-version'],
      description: MixFlags.projectDesc,
      exclusive: ['build-label'],
    }),
    ...MixFlags.tableFlags({except: ['extended']}),
    yaml: MixFlags.yamlFlag,
  }

  get columns() {
    debug('get columns()')

    return {
      id: {header: 'DataHostId'},
      alias: {header: 'Alias'},
      environmentId: {header: 'EnvironmentId'},
      environmentGeographyId: {header: 'EnvironmentGeographyId'},
      value: {header: 'Value'},
    }
  }

  get domainOptions(): DomainOption[] {
    debug('get domainOptions()')
    return ['build-label', 'build-version', 'deployment-flow', 'mix-app', 'project']
  }

  async buildRequestParameters(options: Partial<flags.Output>): Promise<DataHostsListParams> {
    debug('buildRequestParameters()')
    const {
      'build-label': buildLabel,
      'build-version': buildVersion,
      'deployment-flow': deploymentFlowId,
      'mix-app': applicationId,
      project,
    } = options

    let buildLabelValue = ''

    if (project && buildVersion) {
      buildLabelValue = `DIALOG_${project}_${buildVersion}`
    } else if (buildLabel) {
      buildLabelValue = buildLabel
    }

    return {
      applicationId,
      buildLabel: buildLabelValue,
      ...(typeof deploymentFlowId === 'undefined' ? {} : {deploymentFlowId}),
    }
  }

  doRequest(client: MixClient, params: DataHostsListParams): Promise<MixResponse> {
    debug('doRequest()')
    return DataHostsAPI.listDataHosts(client, params)
  }

  outputHumanReadable(transformedData: any) {
    debug('outputHumanReadable()')
    const {context, options} = this
    const count: number = context.get('count')

    if (count === 0) {
      return this.log('No data hosts found for this application build.')
    }

    super.outputHumanReadable(transformedData, options)
  }

  setRequestActionMessage(_options: any) {
    debug('setRequestActionMessage()')
    this.requestActionMessage = 'Retrieving data hosts'
  }

  transformResponse(result: MixResult) {
    debug('transformResponse()')
    const data = result.data as any
    const {dataHosts = []} = data
    const count = dataHosts.length
    this.context.set('count', count)

    return dataHosts
  }

  // There is the possibility that users provide no flags at all
  // as no single flag is actually marked 'required'
  tryDomainOptionsValidation(options: Partial<flags.Output>, domainOptions: DomainOption[]) {
    debug('tryDomainOptionsValidation()')
    super.tryDomainOptionsValidation(options, domainOptions)

    const {project, 'build-version': buildVersion, 'build-label': buildLabel} = options
    if (buildLabel || (project && buildVersion)) {
      return // all good
    }

    this.error(eNoBuildInfo(`Required flag(s) missing.
  A build is uniquely identified by its build label
  OR by the combination of its build type, project ID and build version.
  For this comamnd, build type is assumed to be "dialog" as data hosts
  are relevant to dialog builds only.`,
    [
      "Set 'build-label' flag OR ...",
      "Set 'project' AND 'build-version' flags.",
    ]))
  }
}
