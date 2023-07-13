/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {FlagOutput} from '@oclif/core/lib/interfaces'
import makeDebug from 'debug'

import * as MixFlags from '../../utils/flags'
import MixCommand from '../../utils/base/mix-command'
import {MixClient, MixResponse, MixResult} from '../../mix/types'
import {
  EnvConfigListResponse,
  EnvConfigListTransformedData,
  EnvConfigsListParams,
} from '../../mix/api/env-configs-types'
import {listEnvConfigs} from '../../mix/api/env-configs'
import chalk from 'chalk'

const debug = makeDebug('mix:commands:env-configs:list')

export default class EnvConfigsList extends MixCommand {
  static description = `list environment configurations
  
  Use this command to list all environment configurations for a specific project.`

  static examples = [
    'List environment configurations for project ID 29050',
    'mix env-configs:list -P 29050',
  ]

  static flags = {
    json: MixFlags.jsonFlag,
    ...MixFlags.tableFlags({except: ['extended', 'sort']}),
    project: MixFlags.projectWithDefaultFlag,
    yaml: MixFlags.yamlFlag,
  }

  async buildRequestParameters(
    options: Partial<FlagOutput>,
  ): Promise<EnvConfigsListParams> {
    debug('buildRequestParameters()')
    return {projectId: options.project}
  }

  doRequest(
    client: MixClient,
    params: EnvConfigsListParams,
  ): Promise<MixResponse> {
    debug('doRequest()')
    return listEnvConfigs(client, params)
  }

  get columns() {
    return {
      envId: {header: 'EnvId'},
      envName: {header: 'EnvName'},
      envGeoID: {header: 'EnvGeoId'},
      envGeoName: {header: 'EnvGeoName'},
      label: {header: 'Label'},
      value: {header: 'EnvGeoDefault'},
      defaultValue: {header: 'ProjectDefault'},
    }
  }

  outputHumanReadable(transformedData: EnvConfigListTransformedData) {
    debug('outputHumanReadable()')
    if (transformedData.length === 0) {
      this.log('No environment configurations found.')
    }

    this.outputCLITable(transformedData, this.columns)
  }

  setRequestActionMessage(_options: any) {
    debug('setRequestActionMessage()')
    this.requestActionMessage = `Retrieving environment configurations for project ID ${chalk.cyan(_options.project)}`
  }

  transformResponse(result: MixResult): EnvConfigListTransformedData {
    debug('transformResponse()')
    const transformedData = []
    const data = result.data as EnvConfigListResponse

    const {projectDefaults, environments} = data
    const projectsDefaultsMap: Record<string, string> = {}

    // map each project default's label to its value
    for (const projectDefault of projectDefaults) {
      projectsDefaultsMap[projectDefault.label] = projectDefault.value
    }

    for (const environment of environments) {
      for (const envGeography of environment.environmentGeographies) {
        const item = {
          envId: environment.id,
          envName: environment.name,
          envGeoID: envGeography.id,
          envGeoName: envGeography.name,
        }
        // if there are no environment geography defaults
        if (envGeography.environmentGeographyDefaults.length === 0) {
          // and there are no project defaults, add a single row with empty values
          if (projectDefaults.length === 0) {
            transformedData.push({
              ...item,
              label: '',
              value: '',
              defaultValue: '',
            })
          }

          // if however, there are project defaults, add a row for each project default
          for (const {label, value} of projectDefaults) {
            transformedData.push({
              ...item,
              label,
              value: '',
              defaultValue: value,
            })
          }
        } else {
          // if there are environment geography defaults, add a row for each one
          // also keep track of which project defaults have already been added
          const addedProjectDefaults = new Set<string>()
          for (const envGeoDefault of envGeography.environmentGeographyDefaults) {
            transformedData.push({
              ...item,
              label: envGeoDefault.label,
              value: envGeoDefault.value,
              defaultValue: projectsDefaultsMap[envGeoDefault.label] || '',
            })
            addedProjectDefaults.add(envGeoDefault.label)
          }

          // now add any project defaults that haven't already been added
          for (const projectDefault of projectDefaults) {
            // eslint-disable-next-line max-depth
            if (!addedProjectDefaults.has(projectDefault.label)) {
              transformedData.push({
                ...item,
                label: projectDefault.label,
                value: '',
                defaultValue: projectDefault.value,
              })
            }
          }
        }
      }
    }

    return transformedData
  }
}
