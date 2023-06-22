/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {FlagOutput} from '@oclif/core/lib/interfaces'
import makeDebug from 'debug'
import chalk from 'chalk'

import * as VoicesAPI from '../../mix/api/voices'
import * as MixFlags from '../../utils/flags'
import MixCommand from '../../utils/base/mix-command'
import {VoicesListParams, MixClient, MixResponse, MixResult} from '../../mix/types'

const debug = makeDebug('mix:commands:voices:list')

export default class VoicesList extends MixCommand {
  static description = `list voices in an organization
  
Use this command to list the voices in an organization.
The organization ID can be retrieved using the organizations:list command.
A number of flags can be used to constrain the returned results.`

  static examples = [
    '$ mix voices:list -O 610',
  ]

  static flags = {
    json: MixFlags.jsonFlag,
    organization: {
      ...MixFlags.organizationWithDefaultFlag,
    },
    yaml: MixFlags.yamlFlag,
  }

  get columns() {
    debug('get columns()')

    return {
      name: {header: 'Name'},
      restricted: {header: 'Restricted'},
      gender: {header: 'Gender'},
      model: {header: 'Model'},
      locale: {header: 'Locale'},
      sampleRateHz: {
        header: 'SampleRateHz',
        get: ({sampleRateHz}: any) => sampleRateHz.length === 0 ? 'n/a' :
          sampleRateHz
            .map((s: string) => Number(s))
            .sort((a: number, b: number) => a - b)
            .join(','),
      },
      foreignLanguages: {
        header: 'ForeignLanguages',
        get: ({foreignLanguages}: any) => foreignLanguages.length === 0 ? 'n/a' : foreignLanguages.sort().join(','),
      },
      styles: {
        header: 'Styles',
        get: ({styles}: any) => styles.length === 0 ? 'n/a' : styles.sort().join(','),
      },
    }
  }

  async buildRequestParameters(options: Partial<FlagOutput>): Promise<VoicesListParams> {
    debug('buildRequestParameters()')

    const {
      organization: orgId,
    } = options

    return {
      orgId,
    }
  }

  doRequest(client: MixClient, params: VoicesListParams): Promise<MixResponse> {
    debug('doRequest()')
    return VoicesAPI.listVoices(client, params)
  }

  outputHumanReadable(transformedData: any) {
    debug('outputHumanReadable()')

    if (transformedData.length === 0) {
      this.log('No voices found.')
      return
    }

    this.outputCLITable(transformedData, this.columns)
  }

  setRequestActionMessage(options: any) {
    debug('setRequestActionMessage()')
    const optionalOrganizationInfo = options.organization ? ` for organization ID ${chalk.cyan(options.organization)}` : ''
    this.requestActionMessage = 'Retrieving voices' + optionalOrganizationInfo
  }

  transformResponse(result: MixResult) {
    debug('transformResponse()')
    const data = result.data as any
    return data.voices
  }
}
