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

import * as LanguageTopicsAPI from '../../mix/api/language-topics'
import * as MixFlags from '../../utils/flags'
import MixCommand from '../../utils/base/mix-command'
import {asLocalesList, asVersionsList} from '../../utils/format'
import {LanguageTopicsListParams, MixClient, MixResponse, MixResult} from '../../mix/types'
import {DomainOption} from '../../utils/validations'

const debug = makeDebug('mix:commands:language-topics:list')

export default class LanguageTopicsList extends MixCommand {
  static description = `list language topics for an organization
  
Use this command to list language topics available to a specific organization.`

  static examples = ['mix language-topics:list -O 64']

  static flags = {
    json: MixFlags.jsonFlag,
    organization: MixFlags.organizationWithDefaultFlag,
    ...MixFlags.tableFlags({except: ['extended', 'csv']}),
    yaml: MixFlags.yamlFlag,
  }

  get columns() {
    debug('get columns()')

    return {
      id: {header: 'LanguageTopicId'},
      name: {header: 'Name'},
      locales: {
        header: 'Locale',
        get: asLocalesList,
      },
      versions: {
        header: 'Versions',
        get: asVersionsList,
      },
    }
  }

  get domainOptions(): DomainOption[] {
    debug('get domainOptions()')
    return ['organization']
  }

  async buildRequestParameters(options: Partial<flags.Output>): Promise<LanguageTopicsListParams> {
    debug('buildRequestParameters()')
    const {organization: orgId} = options

    return {orgId}
  }

  doRequest(client: MixClient, params: LanguageTopicsListParams): Promise<MixResponse> {
    debug('doRequest()')
    return LanguageTopicsAPI.listLanguageTopics(client, params)
  }

  outputHumanReadable(transformedData: any) {
    debug('outputHumanReadable()')
    if (transformedData.length === 0) {
      this.log('No language topics found.')

      return
    }

    this.outputCLITable(transformedData, this.columns)
  }

  setRequestActionMessage(options: any) {
    debug('setRequestActionMessage()')
    this.requestActionMessage = `Retrieving language topics for organization ID ${chalk.cyan(options.organization)}`
  }

  transformResponse(result: MixResult) {
    debug('transformResponse()')
    const data = result.data as any
    return data.languageTopics
  }
}
