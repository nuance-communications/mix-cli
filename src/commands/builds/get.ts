/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {Flags} from '@oclif/core'
import {FlagOutput} from '@oclif/core/lib/interfaces'
import makeDebug from 'debug'

import * as BuildsAPI from '../../mix/api/builds'
import * as MixFlags from '../../utils/flags'
import MixCommand, {Columns} from '../../utils/base/mix-command'
import {asValueOrNA} from '../../utils/format'
import {BuildsGetParams, MixClient, MixResponse} from '../../mix/types'
import {DomainOption} from '../../utils/validations'
import {eNoBuildInfo} from '../../utils/errors'

const debug = makeDebug('mix:commands:builds:get')

export default class BuildsGet extends MixCommand {
  static description = `get details about a build

Use this command to get details about a particular build. The build can be
specified using the build label or the combination of project ID, build type
and build version.`

  static examples = [
    'mix builds:get -P 1922 --build-type nlu --build-version 1',
  ]

  static flags = {
    'build-label': Flags.string({
      description: MixFlags.buildLabelDesc,
      exclusive: ['build-type', 'project', 'build-version'],
    }),
    'build-type': Flags.string({
      description: MixFlags.buildTypeDesc,
      dependsOn: ['build-version', 'project'],
      exclusive: ['build-label'],
      options: MixFlags.buildTypeOptions,
    }),
    'build-version': Flags.integer({
      dependsOn: ['build-type', 'project'],
      description: MixFlags.buildVersionDesc,
      exclusive: ['build-label'],
    }),
    json: MixFlags.jsonFlag,
    project: Flags.integer({
      char: MixFlags.projectShortcut,
      dependsOn: ['build-version', 'build-type'],
      description: MixFlags.projectDesc,
      exclusive: ['build-label'],
    }),
    ...MixFlags.tableFlags({
      except: ['extended', 'no-header', 'filter', 'sort'],
      useColumnsWithCSVOnly: true,
    }),
    yaml: MixFlags.yamlFlag,
  }

  get columns() {
    debug('get columns()')
    return {
      projectId: {header: 'ProjectId'},
      buildId: {header: 'BuildId'},
      status: {header: 'BuildLabel'},
      buildType: {header: 'BuildType'},
      buildVersion: {header: 'BuildVersion'},
      languageTopic: {header: 'LanguageTopic'},
      datapack: {
        header: 'DataPack',
        get: (row: any) => asValueOrNA('datapack', row.datapack),
      },
      modelType: {header: 'ModelType'},
      dataSources: {
        header: 'DataSources',
        get: (row: any) => row.dataSources.join(','),
      },
      createTime: {header: 'CreateTime'},
      notes: {header: 'Notes'},
    } as Columns
  }

  get domainOptions(): DomainOption[] {
    debug('get domainOptions()')
    return ['build-label', 'build-version', 'project']
  }

  async buildRequestParameters(options: Partial<FlagOutput>): Promise<BuildsGetParams> {
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
    return BuildsAPI.getBuild(client, params)
  }

  outputHumanReadable(transformedData: any) {
    debug('outputHumanReadable()')
    if (transformedData === undefined) {
      this.log('No build found.')

      return
    }

    this.outputAsKeyValuePairs(transformedData, this.columns)
  }

  setRequestActionMessage(_options: any) {
    debug('setRequestActionMessage()')
    this.requestActionMessage = 'Retrieving build details'
  }

  // There is the possibility that users provide no flags at all
  // as no single flag is actually marked 'required'
  tryDomainOptionsValidation(options: Partial<FlagOutput>, domainOptions: DomainOption[]) {
    debug('tryDomainOptionsValidation()')
    super.tryDomainOptionsValidation(options, domainOptions)

    const {project, 'build-type': buildType, 'build-version': buildVersion, 'build-label': buildLabel} = options
    if (buildLabel || (project && buildType && buildVersion)) {
      return // all good
    }

    this.error(eNoBuildInfo())
  }
}
