/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import chalk from 'chalk'
import {FlagOutput} from '@oclif/core/lib/interfaces'
import makeDebug from 'debug'

import * as AppCredentialsAPI from '../../mix/api/app-credentials'
import * as MixFlags from '../../utils/flags'
import {AppCredentialsListParams, MixClient, MixResponse, MixResult} from '../../mix/types'
import {DomainOption} from '../../utils/validations'
import MixCommand from '../../utils/base/mix-command'

const debug = makeDebug.debug('mix:commands:app-credentials:list')

export default class AppCredentialsList extends MixCommand {
  static description = `list application credentials for a Mix application
  
Use this command to list the application credentials for a Mix application.
This lets you retrieve the runtime application ID that is required in other
commands.`

  static examples = [
    'List application credentials for a Mix application',
    '$ mix app-credentials:list -M 22',
    '',
    'List application credentials for a Mix application that match a specific environment-geography',
    '$ mix app-credentials:list -M 22 --with-geo-name "Production US"',
  ]

  static flags = {
    'with-geo-name': MixFlags.geoNameFlag,
    full: MixFlags.showFullAppCredentialsDetailsFlag,
    'mix-app': MixFlags.mixApplicationFlag,
    ...MixFlags.machineOutputFlags,
  }

  get domainOptions(): DomainOption[] {
    debug('get domainOptions()')
    return ['mix-app']
  }

  async buildRequestParameters(options: Partial<FlagOutput>): Promise<AppCredentialsListParams> {
    debug('buildRequestParameters()')
    const {'with-geo-name': envGeographyName, full, 'mix-app': applicationId} = options

    return {
      applicationId,
      ...(typeof envGeographyName === 'undefined' ? {} : {envGeographyName}),
      view: full ? 'ACV_FULL' : 'ACV_VIEW_UNSPECIFIED',
    }
  }

  doRequest(client: MixClient, params: AppCredentialsListParams): Promise<MixResponse> {
    debug('doRequest()')
    return AppCredentialsAPI.listAppCredentials(client, params)
  }

  outputClientDetails(clients: any) {
    debug('outputClientDetails()')
    for (const [clientIndex, client] of clients.entries()) {
      if (clientIndex > 0) {
        this.log() // leave blank line between client blocks
      }

      const {clientId, clientName, oauthScopes, createTime, updateTime} = client
      this.log('  Client Name: ' + clientName)
      this.log('  Client ID: ' + clientId)
      this.log('  OAuth Scopes: ' + oauthScopes.split(' ').sort().join(' '))
      this.log('  Create Time: ' + createTime)
      if (createTime !== updateTime) {
        this.log('  Update Time: ' + updateTime)
      }
    }
  }

  outputHumanReadable(credentials: any, options: Partial<FlagOutput>) {
    debug('outputHumanReadable()')
    const {'with-geo-name': geographyName, full, 'mix-app': applicationId} = options

    if (credentials.length === 0) {
      const msg = `No credentials found for Mix application ID ${chalk.cyan(applicationId)}` +
        (geographyName ? ` and geography ${chalk.cyan(geographyName)}.` : '.')

      this.log(msg)

      return
    }

    return full ?
      this.outputHumanReadableFull(credentials) :
      this.outputHumanReadableRegular(credentials)
  }

  outputHumanReadableFull(credentials: any) {
    debug('outputHumanReadableFull()')
    for (const [credIndex, cred] of credentials.entries()) {
      if (credIndex > 0) {
        this.log() // leave blank line betweeen runtime application blocks
      }

      this.log(`${chalk.bold('Runtime Application ID (AppID):')} ${chalk.cyan(cred.credential.appId)}`)

      for (const envGeo of cred.geographies) {
        const envType = envGeo.envType
        const geography = envGeo.geography.displayName
        this.log(`${chalk.bold('Environment:')} ${chalk.cyan(envType)} - ${chalk.bold('Geography:')} ${chalk.cyan(geography)}`)
      }

      this.log()

      const {clients} = cred.credential

      if (!Array.isArray(clients) || clients.length === 0) {
        this.log('No clients found for this runtime application.')
      } else {
        this.outputClientDetails(clients)
      }
    }
  }

  outputHumanReadableRegular(credentials: any) {
    debug('outputHumanReadableRegular()')
    const columns = {
      mixAppId: {header: 'Runtime Application ID (AppID)'},
      envType: {header: 'Environment'},
      geography: {header: 'Geography'},
    }

    const tableData = []

    for (const cred of credentials) {
      const mixAppId = cred.credential.appId

      for (const g of cred.geographies) {
        const envType = g.envType
        const geography = g.geography.displayName
        tableData.push({mixAppId, envType, geography})
      }
    }

    this.outputCLITable(tableData, columns)
  }

  setRequestActionMessage(_options: any) {
    debug('setRequestActionMessage()')
    this.requestActionMessage = 'Retrieving application credentials'
  }

  transformResponse(result: MixResult) {
    debug('transformResponse()')
    const data = result.data as any
    return data.credentials
  }
}
