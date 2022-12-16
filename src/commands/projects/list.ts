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
import MixCommand from '../../utils/base/mix-command'
import {asChannelsList, asDataPackslist} from '../../utils/format'
import {MixClient, MixResponse, MixResult, ProjectsListParams} from '../../mix/types'
import {DomainOption} from '../../utils/validations'
import {defaultLimit} from '../../utils/constants'
import {pluralize as s} from '../../utils/format'

const debug = makeDebug('mix:commands:projects:list')
export default class ProjectsList extends MixCommand {
  static description = `list projects
  
Use this command to list projects across all organizations.
A number of flags can be used to constrain the returned results.`

  static examples = [
    'List projects to which you have access, across all organizations',
    'mix projects:list',
    '',
    'List projects that are part of a particular organization',
    'mix projects:list -O 64',
  ]

  static flags = {
    'include-features': MixFlags.includeFeaturesFlag,
    'exclude-channels': MixFlags.excludeChannelsFlag,
    json: MixFlags.jsonFlag,
    organization: {
      ...MixFlags.organizationWithDefaultFlag,
      required: false,
    },
    ...MixFlags.limitOffsetSortFlags,
    ...MixFlags.tableFlags({except: ['extended', 'sort']}),
    'with-name': MixFlags.withProjectName,
    yaml: MixFlags.yamlFlag,
  }

  get columns() {
    debug('get columns()')
    return {
      id: {header: 'ProjectId'},
      displayName: {header: 'Name'},
      languageTopic: {header: 'LanguageTopic'},
      ...(this.options['exclude-channels'] ? {} : this.channelsColumn),
      datapacks: {
        header: 'DataPacks',
        get: asDataPackslist,
      },
      ...(this.options['include-features'] ? this.featuresColumn : {}),
      createTime: {header: 'CreateTime'},
      updateTime: {header: 'UpdateTime'},
    }
  }

  get channelsColumn() {
    return {
      channels: {
        header: 'Channels',
        get: asChannelsList,
      },
    }
  }

  get featuresColumn() {
    return {
      features: {
        header: 'Features',
        get: ({enginePackFeatures}: any) => enginePackFeatures.join(','),
      },
    }
  }

  get domainOptions(): DomainOption[] {
    debug('get domainOptions()')
    return ['organization']
  }

  async buildRequestParameters(options: Partial<flags.Output>): Promise<ProjectsListParams> {
    debug('buildRequestParameters()')
    const {
      'exclude-channels': excludeChannels,
      'include-features': includeFeatures,
      limit = defaultLimit,
      offset,
      organization: orgId,
      sort: sortBy,
      'with-name': filter,
    } = options

    return {
      excludeChannels,
      includeFeatures,
      ...(typeof filter === 'undefined' ? {} : {filter}),
      ...(typeof limit === 'undefined' ? {} : {limit}),
      ...(typeof offset === 'undefined' ? {} : {offset}),
      ...(typeof orgId === 'undefined' ? {} : {orgId}),
      ...(typeof sortBy === 'undefined' ? {} : {sortBy}),
    }
  }

  doRequest(client: MixClient, params: ProjectsListParams): Promise<MixResponse> {
    debug('doRequest()')
    return ProjectsAPI.listProjects(client, params)
  }

  outputHumanReadable(transformedData: any, options: any) {
    debug('outputHumanReadable()')
    const {columns, context} = this
    const count: number = context.get('count')
    const offset: number = context.get('offset')
    const totalSize: number = context.get('totalSize')
    const shouldIncludeFeatures = options['include-features']

    if (transformedData.length === 0) {
      this.log('No projects found.')

      return
    }

    const resultInformation = count > 1 ? `${chalk.cyan(offset + 1)}-${chalk.cyan(offset + count)}` : chalk.cyan(count)

    this.outputCLITable(transformedData, columns)
    this.log()
    this.log(`Result${s(count)} ${resultInformation} of ${chalk.cyan(totalSize)} shown.`)
    this.log()

    if (shouldIncludeFeatures) {
      this.log("Run the command again with the 'json' flag to see all engine pack features.")
    }
  }

  setRequestActionMessage(options: any) {
    debug('setRequestActionMessage()')
    const optionalOrganizationInfo = options.organization ? ` for organization ID ${chalk.cyan(options.organization)}` : ''
    this.requestActionMessage = 'Retrieving projects' + optionalOrganizationInfo
  }

  transformResponse(result: MixResult) {
    debug('transformResponse()')
    const data = result.data as any
    const {count, totalSize, offset, limit, projects} = data
    this.context.set('count', count)
    this.context.set('offset', offset)
    this.context.set('limit', limit)
    this.context.set('totalSize', totalSize)

    return projects
  }
}
