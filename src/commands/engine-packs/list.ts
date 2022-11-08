/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {flags} from '@oclif/command'
import chalk from 'chalk'
import makeDebug from 'debug'

import * as EnginePacksAPI from '../../mix/api/engine-packs'
import * as MixFlags from '../../utils/flags'
import MixCommand from '../../utils/base/mix-command'
import {EnginePacksListParams, MixClient, MixResponse, MixResult} from '../../mix/types'
import {DomainOption} from '../../utils/validations'

const debug = makeDebug('mix:commands:engine-packs:list')

export default class EnginePacksList extends MixCommand {
  static description = `list engine packs
  
Use this command to list the engine packs available to a specific organization.`

  static examples = [
    'mix engine-packs:list -O 64',
  ]

  static flags = {
    json: MixFlags.jsonFlag,
    organization: MixFlags.organizationWithDefaultFlag,
    yaml: MixFlags.yamlFlag,
  }

  get domainOptions(): DomainOption[] {
    debug('get domainOptions()')
    return ['organization']
  }

  async buildRequestParameters(options: Partial<flags.Output>): Promise<EnginePacksListParams> {
    debug('buildRequestParameters()')
    const {organization: orgId} = options
    return {orgId}
  }

  doRequest(client: MixClient, params: EnginePacksListParams): Promise<MixResponse> {
    debug('doRequest()')
    return EnginePacksAPI.listEnginePacks(client, params)
  }

  get columns() {
    debug('get columns()')
    return {
      topic: {header: 'Topic'},
      locale: {header: 'Locale'},
      versions: {header: 'Versions'},
    }
  }

  getDetailsPerTopic(topics: any): any {
    debug('getDetailsPerTopic()')
    const topicDetails: any = []

    for (const topic of Object.keys(topics)) {
      const {locales: topicLocales} = topics[topic]

      for (const [index, locale] of Object.keys(topicLocales).entries()) {
        const topicLocaleVersions = topicLocales[locale].versions
        const joinedLocaleVersions = topicLocaleVersions.map(({version}: any) => version).join(', ')

        topicDetails.push({
          topic: index ? '' : topic, // only first row shows topic
          locale,
          versions: joinedLocaleVersions,
        })
      }
    }

    return topicDetails
  }

  outputHumanReadable(enginePacks: any) {
    debug('outputHumanReadable()')
    const {columns, options} = this
    if (enginePacks.length > 0) {
      for (const pack of enginePacks) {
        this.log(`${chalk.bold('Engine Pack Release')}: ${chalk.cyan(pack.version)}`)
        this.log(`Engine Pack ID: ${chalk.cyan(pack.enginePackId)}`)
        this.log(`ASR version: ${pack.asrVersion}\tNLU version: ${pack.nluVersion}`)
        this.log(`Dialog version: ${pack.dialogVersion}\tTTS version: ${pack.ttsVersion}`)
        this.log()

        const topicDetails = this.getDetailsPerTopic(pack.topics)

        if (topicDetails.length > 0) {
          this.outputCLITable(topicDetails, columns)
          this.log()
        } else {
          this.log('No topics available for engine pack')
        }

        this.log()
      }
    } else {
      this.log(`No engine packs found in organization ${chalk.cyan(options.organization)}`)
    }
  }

  setRequestActionMessage(options: any) {
    debug('setRequestActionMessage()')
    this.requestActionMessage = `Retrieving engine packs for organization ID ${chalk.cyan(options.organization)}`
  }

  transformResponse(result: MixResult) {
    debug('transformResponse()')
    const data = result.data as any
    return data.enginePacks
  }
}
