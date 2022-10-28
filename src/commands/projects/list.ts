/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {flags} from '@oclif/command'
import makeDebug from 'debug'

import * as MixFlags from '../../utils/flags'
import * as ProjectsAPI from '../../mix/api/projects'
import MixCommand from '../../utils/base/mix-command'
import {asChannelsList, asDataPackslist} from '../../utils/format'
import {MixClient, MixResponse, MixResult, ProjectsListParams} from '../../mix/types'
import {DomainOption} from '../../utils/validations'

const debug = makeDebug('mix:commands:projects:list')
export default class ProjectsList extends MixCommand {
  static description = `list projects
  
Use this command to list projects that are part of a particular organization.`

  static examples = ['mix projects:list -O 64']

  static flags = {
    json: MixFlags.jsonFlag,
    organization: MixFlags.organizationWithDefaultFlag,
    ...MixFlags.tableFlags({except: ['extended']}),
    yaml: MixFlags.yamlFlag,
  }

  get columns() {
    debug('get columns()')
    return {
      id: {header: 'ProjectId'},
      displayName: {header: 'Name'},
      languageTopic: {header: 'LanguageTopic'},
      channels: {
        header: 'Channels',
        get: asChannelsList,
      },
      datapacks: {
        header: 'DataPacks',
        get: asDataPackslist,
      },
      createTime: {header: 'CreateTime'},
      updateTime: {header: 'UpdateTime'},
    }
  }

  get domainOptions(): DomainOption[] {
    debug('get domainOptions()')
    return ['organization']
  }

  async buildRequestParameters(options: Partial<flags.Output>): Promise<ProjectsListParams> {
    debug('buildRequestParameters()')
    const {organization: orgId} = options

    return {orgId}
  }

  doRequest(client: MixClient, params: ProjectsListParams): Promise<MixResponse> {
    debug('doRequest()')
    return ProjectsAPI.listProjects(client, params)
  }

  outputHumanReadable(transformedData: any) {
    debug('outputHumanReadable()')
    if (transformedData.length === 0) {
      this.log('No projects found.')

      return
    }

    this.outputCLITable(transformedData, this.columns)
  }

  setRequestActionMessage(options: any) {
    debug('setRequestActionMessage()')
    this.requestActionMessage = `Retrieving projects for organization ID ${options.organization}`
  }

  transformResponse(result: MixResult) {
    debug('transformResponse()')
    const data = result.data as any
    return data.projects
  }
}
