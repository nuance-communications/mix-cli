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

import {defaultLimit} from '../../utils/constants'
import * as MixFlags from '../../utils/flags'
import * as ProjectsAPI from '../../mix/api/projects'
import {DomainOption} from '../../utils/validations'
import {MixClient, MixResponse, MixResult, ProjectsLocksListParams} from '../../mix/types'
import MixCommand from '../../utils/base/mix-command'

const debug = makeDebug('mix:commands:locks:list')

export default class LocksList extends MixCommand {
  static description = `list project locks

Use this command to get a list of all project locks.
The list can be constrained using the project, organization
and/or user flags.

A project cannot be edited while it is locked.`

  static examples = [
    'list project locks',
    '$ mix locks:list -P 249 -U 32',
  ]

  static flags = {
    json: MixFlags.jsonFlag,
    project: {
      ...MixFlags.projectWithDefaultFlag,
      required: false,
    },
    user: MixFlags.userFlag,
    organization: {
      ...MixFlags.organizationWithDefaultFlag,
      required: false,
    },
    ...MixFlags.limitOffsetSortFlags,
    ...MixFlags.tableFlags({except: ['extended', 'sort']}),
    yaml: MixFlags.yamlFlag,
  }

  get columns() {
    debug('get columns()')
    return {
      lockId: {header: 'LockId'},
      projectId: {header: 'ProjectId'},
      name: {
        header: 'LockOwnerName',
        get: (locks: any) => locks.lockOwner.name,
      },
      email: {
        header: 'LockOwnerEmail',
        get: (locks: any) => locks.lockOwner.email,
      },
      id: {
        header: 'LockUserId',
        get: (locks: any) => locks.lockOwner.id,
      },
      createTime: {header: 'CreateTime'},
      notes: {header: 'Notes'},
    }
  }

  get domainOptions(): DomainOption[] {
    debug('get domainOptions()')
    return ['limit', 'offset', 'organization', 'project', 'user']
  }

  async buildRequestParameters(options: Partial<flags.Output>): Promise<ProjectsLocksListParams> {
    debug('buildRequestParameters()')
    const {limit = defaultLimit, offset, organization: orgId, project: projectId, user: userId, sort: sortBy} = options

    return {
      ...(typeof limit === 'undefined' ? {} : {limit}),
      ...(typeof offset === 'undefined' ? {} : {offset}),
      ...(typeof orgId === 'undefined' ? {} : {orgId}),
      ...(typeof projectId === 'undefined' ? {} : {projectId}),
      ...(typeof userId === 'undefined' ? {} : {userId}),
      ...(typeof sortBy === 'undefined' ? {} : {sortBy}),
    }
  }

  doRequest(client: MixClient, params: ProjectsLocksListParams): Promise<MixResponse> {
    debug('doRequest()')
    return ProjectsAPI.listProjectLocks(client, params)
  }

  outputHumanReadable(transformedData: any) {
    debug('outputHumanReadable()')

    super.outputHumanReadable(transformedData, this.options)
  }

  setRequestActionMessage(options: any) {
    debug('setRequestActionMessage()')

    const filters = []
    for (const option of ['user', 'project', 'organization']) {
      if (options[option]) {
        filters.push(`${option}=${chalk.cyan(options[option])}`)
      }
    }

    this.requestActionMessage = filters.length === 0 ?
      'Retrieving locks' : `Searching for locks with: ${filters.join(', ')}`
  }

  transformResponse(result: MixResult) {
    debug('transformResponse()')
    const data = result.data as any

    const {count, limit, locks, offset,  totalSize} = data

    this.context.set('count', count)
    this.context.set('offset', offset)
    this.context.set('limit', limit)
    this.context.set('totalSize', totalSize)
    this.context.set('topic', 'locks')

    return locks
  }
}
