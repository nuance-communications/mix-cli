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
import * as OrganizationsAPI from '../../mix/api/organizations'
import MixCommand from '../../utils/base/mix-command'
import {DomainOption} from '../../utils/validations'

import {
  MixClient,
  MixResponse,
  MixResult,
  OrganizationsListParams,
  OrganizationsListView,
  Organization} from '../../mix/types'
import {defaultLimit} from '../../utils/constants'

const debug = makeDebug('mix:commands:organizations:list')

export default class OrganizationsList extends MixCommand {
  static description = `list available Mix organizations
  
Use this command to list the organizations you are part of.`

  static examples = ['mix organizations:list']

  static flags = {
    all: MixFlags.showAllOrganizationsFlag,
    full: MixFlags.showFullOrganizationDetailsFlag,
    ...MixFlags.limitOffsetSortFlags,
    json: MixFlags.jsonFlag,
    ...MixFlags.tableFlags({except: ['extended']}),
    'with-organization-type': MixFlags.withOrganizationTypeFlag,
    yaml: MixFlags.yamlFlag,
  }

  get columns() {
    debug('get columns()')
    const fullViewOnlyColumns = {
      members: {
        header: 'MembersCount',
        get: (row: any) => row.members?.length,
      },
    }

    return {
      id: {header: 'OrganizationId'},
      displayName: {header: 'Name'},
      type: {header: 'Type'},
      ...(this.options.full ? fullViewOnlyColumns : {}),
    }
  }

  get domainOptions(): DomainOption[] {
    debug('get domainOptions()')
    return ['limit', 'offset']
  }

  async buildRequestParameters(options: Partial<flags.Output>): Promise<OrganizationsListParams> {
    debug('buildRequestParameters()')
    const {all: showAll, full, limit = defaultLimit, offset, sort: sortBy} = options
    const type = (options['with-organization-type']?.toUpperCase() ?? 'TYPE_UNSPECIFIED') as Organization
    const view: OrganizationsListView = full ? 'FULL' : 'VIEW_UNSPECIFIED' as OrganizationsListView

    return {
      showAll,
      ...(typeof limit === 'undefined' ? {} : {limit}),
      ...(typeof offset === 'undefined' ? {} : {offset}),
      ...(typeof sortBy === 'undefined' ? {} : {sortBy}),
      type,
      view,
    }
  }

  captureOptions() {
    debug('captureOptions()')
    const {flags} = this.parse(OrganizationsList)
    this.options = flags
  }

  doRequest(client: MixClient, params: OrganizationsListParams): Promise<MixResponse> {
    debug('doRequest()')
    return OrganizationsAPI.listOrganizations(client, params)
  }

  outputHumanReadable(transformedData: any) {
    debug('outputHumanReadable()')
    if (transformedData.length === 0) {
      this.log('No organizations found.')

      return
    }

    this.outputCLITable(transformedData, this.columns)
  }

  setRequestActionMessage(_options: any) {
    debug('setRequestActionMessage()')
    this.requestActionMessage = 'Retrieving organizations'
  }

  transformResponse(result: MixResult) {
    debug('transformResponse()')
    const data = result.data as any
    const {count, organizations, offset, limit, totalSize} = data
    this.context.set('count', count)
    this.context.set('offset', offset)
    this.context.set('limit', limit)
    this.context.set('totalSize', totalSize)
    return organizations
  }
}
