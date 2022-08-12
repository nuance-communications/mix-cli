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

import * as MixFlags from '../../utils/flags'
import * as ProjectsAPI from '../../mix/api/projects'
import MixCommand, {Columns} from '../../utils/base/mix-command'
import {asModesList, asValueOrNA} from '../../utils/format'
import {MixClient, MixResponse, MixResult, ProjectsGetParams} from '../../mix/types'
import {DomainOption} from '../../utils/validations'

const projectColumns = {
  id: {header: 'ProjectId'},
  displayName: {header: 'Name'},
  languageTopic: {header: 'LanguageTopic'},
  baseDatapack: {header: 'BaseDataPack'},
  enginePackId: {header: 'EnginePackId'},
  createTime: {header: 'CreateTime'},
  updateTime: {header: 'UpdateTime'},
  orgId: {header: 'OrganizationId'},
} as Columns

const channelsColumns = {
  id: {header: 'ChannelId'},
  displayName: {header: 'Name'},
  modes: {
    header: 'Modes',
    get: asModesList,
  },
  color: {
    header: 'Color',
    get: ({color}: any) => color.toLowerCase(),
  },
  isActive: {header: 'IsActive'},
} as Columns

const dataPacksColumns = {
  displayName: {
    header: 'Name',
    minWidth: 8,
  },
  version: {header: 'Version'},
  isActive: {header: 'IsActive'},
} as Columns

const debug = makeDebug('mix:commands:projects:get')

export default class ProjectGet extends MixCommand {
  static description = `get details about a project
  
Use this command to get details about a particular project.

CSV output is available for this command but only for one section of project
information at a time. The chosen section is specifed using the --table flag.`

  static examples = ['mix projects:get -P 1922']

  static flags = {
    json: MixFlags.jsonFlag,
    project: MixFlags.projectWithDefaultFlag,
    table: MixFlags.projectTableFlag,
    // given the 3-table output, 'filter' don't apply here
    ...MixFlags.tableFlags({except: ['extended', 'filter'], useColumnsWithCSVAndTableOnly: true}),
    yaml: MixFlags.yamlFlag,
  }

  get domainOptions(): DomainOption[] {
    debug('get domainOptions()')
    return ['project']
  }

  async buildRequestParameters(options: Partial<flags.Output>): Promise<ProjectsGetParams> {
    debug('buildRequestParameters()')
    const {project: projectId} = options

    return {projectId}
  }

  doRequest(client: MixClient, params: ProjectsGetParams): Promise<MixResponse> {
    debug('doRequest()')
    return ProjectsAPI.getProject(client, params)
  }

  outputCSV(transformedData: any) {
    debug('outputCSV()')
    switch (this.options.table) {
      case 'project':
        this.outputCLITable(transformedData, projectColumns)
        break

      case 'channels':
        this.outputChannelsInfo(transformedData)
        break

      case 'data-packs':
        this.outputDataPacksInfo(transformedData)
        break
    }
  }

  outputHumanReadable(transformedData: any) {
    debug('outputHumanReadable()')
    // This outputs the project info using key-value pairs
    // and the channels and data packs using tables.
    this.outputProjectInfo(transformedData)
    this.log(`\n${chalk.cyan.bold('Channels')}`)
    this.outputChannelsInfo(transformedData)
    this.log(`\n${chalk.cyan.bold('Data Packs')}`)
    this.outputDataPacksInfo(transformedData)
  }

  outputProjectInfo(transformedData: any) {
    debug('outputProjectInfo()')
    for (const key of Object.keys(projectColumns)) {
      this.log(`${chalk.bold(projectColumns[key].header)}: ${asValueOrNA(key, transformedData[key])}`)
    }
  }

  outputChannelsInfo(transformedData: any) {
    debug('outputChannelsInfo()')
    const channelsData = transformedData.channels.map(
      (c: any) => ({...c.channel, isActive: c.isActive}))

    this.outputCLITable(channelsData, channelsColumns)
  }

  outputDataPacksInfo(transformedData: any) {
    debug('outputDataPacksInfo()')
    this.outputCLITable(transformedData.datapacks, dataPacksColumns)
  }

  setRequestActionMessage(options: any) {
    debug('setRequestActionMessage()')
    this.requestActionMessage = `Retrieving details for project ${options.project}`
  }

  transformResponse(result: MixResult) {
    debug('transformResponse()')
    const data = result.data as any
    return data.project
  }
}
