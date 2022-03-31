/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {flags} from '@oclif/command'
import makeDebug from 'debug'

import * as BuildsAPI from '../../mix/api/builds'
import * as MixFlags from '../../utils/flags'
import MixCommand from '../../utils/base/mix-command'
import {BuildsListParams, MixClient, MixResponse, MixResult} from '../../mix/types'
import {defaultLimit} from '../../utils/constants'
import {DomainOption} from '../../utils/validations'

const debug = makeDebug.debug('mix:commands:builds:list')

const formatDataPacks = ({datapack}: any) =>
  datapack ? `${datapack.displayName}@${datapack.version}` : 'n/a'

const formatModelType = ({modelType}: any) =>
  modelType ? modelType : 'n/a'

const formatDataSource = ({dataSources}: any) =>
  dataSources ? dataSources.map((dataSource: any) => dataSource)
    .sort((a: string, b: string) => a.localeCompare(b))
    .join(',') : 'n/a'

export default class BuildsList extends MixCommand {
  static description = `list builds
  
Use this command to list all versions of a build type for a particular project.`

  static examples = [
    'mix builds:list -P 1922 --build-type nlu',
  ]

  static flags = {
    'build-type': MixFlags.buildTypeFlag,
    json: MixFlags.jsonFlag,
    ...MixFlags.limitOffsetSortFlags,
    project: MixFlags.projectWithDefaultFlag,
    ...MixFlags.tableFlags({except: ['extended', 'sort']}),
    yaml: MixFlags.yamlFlag,
  }

  get columns() {
    debug('get columns()')

    return {
      buildId: {header: 'BuildId'},
      buildLabel: {header: 'BuildLabel'},
      buildVersion: {header: 'Version'},
      buildType: {header: 'BuildType'},
      status: {header: 'Status'},
      languageTopic: {header: 'LanguageTopic'},
      datapack: {
        header: 'DataPack',
        get: formatDataPacks,
      },
      modelType: {
        header: 'ModelType',
        get: formatModelType,
      },
      createTime: {header: 'CreateTime'},
      dataSources: {
        header: 'DataSources',
        get: formatDataSource,
      },
      notes: {header: 'Notes'},
    }
  }

  get domainOptions(): DomainOption[] {
    debug('get domainOptions()')

    return ['limit', 'offset', 'project']
  }

  async buildRequestParameters(options: Partial<flags.Output>): Promise<BuildsListParams> {
    debug('buildRequestParameters()')
    const {'build-type': type, limit = defaultLimit, offset, project, sort: sortBy} = options

    return {
      ...(typeof limit === 'undefined' ? {} : {limit}),
      ...(typeof offset === 'undefined' ? {} : {offset}),
      projectId: project,
      ...(typeof sortBy === 'undefined' ? {} : {sortBy}),
      type: String(type).toUpperCase(),
    }
  }

  captureOptions() {
    debug('caputureOptions()')
    const {flags} = this.parse(BuildsList)
    this.options = flags
  }

  doRequest(client: MixClient, params: BuildsListParams): Promise<MixResponse> {
    debug('doRequest()')
    return BuildsAPI.listBuilds(client, params)
  }

  outputHumanReadable(transformedData: any) {
    debug('outputHumanReadable()')
    const count: number = this.context.get('count')

    if (count === 0) {
      this.log('No builds found.')
      return
    }

    super.outputHumanReadable(transformedData, this.options)
  }

  setRequestActionMessage(options: any) {
    debug('setRequestActionMessage(')
    this.requestActionMessage = `Retrieving builds for project ID ${options.project}`
  }

  transformResponse(result: MixResult) {
    debug('transformResponse()')
    const data = result.data as any
    const {builds, count, offset, limit, totalSize} = data
    this.context.set('count', count)
    this.context.set('offset', offset)
    this.context.set('limit', limit)
    this.context.set('totalSize', totalSize)

    return builds
  }
}
