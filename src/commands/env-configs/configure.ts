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

import * as MixFlags from '../../utils/flags'
import MixCommand from '../../utils/base/mix-command'
import {MixClient, MixResponse} from '../../mix/types'
import {EnvConfigsConfigureParams} from '../../mix/api/env-configs-types'
import {configureEnvConfigWithGeo, configureEnvConfigWithoutGeo} from '../../mix/api/env-configs'

const debug = makeDebug('mix:commands:env-configs:configure')

export default class EnvConfigsList extends MixCommand {
  static description = `configure an environment configuration

  Environment configurations provide default values either for the project as a whole
  or for a specific environment geography. If an environment geography doest not have
  a default for a specific configuration, then the default for the project is used.
  
  Using this command with only the 'project' flag configures the project-level default value
  for the given configuration label. Using this command with the 'env' and 'env-geo' flags
  in addition to the 'project' flag configures the default value for the given configuration
  label targeting the specified environment geography.
  `

  static examples = [
    'Configure an environment configuration project default',
    'mix env-configs:configure -P 1922 --label=GRAMMAR_BASE_PATH --value=https://www.example.com/grammars',
    'Configure an environment configuration for a specific environment geography',
    'mix env-configs:configure -P 1922 --env=1923 --env-geo=9 --label=GRAMMAR_BASE_PATH --value=https://www.example.com/grammars',
  ]

  static flags = {
    project: MixFlags.projectFlag,
    env: {
      ...MixFlags.envIDFlag,
      dependsOn: ['env-geo'],
    },
    'env-geo': {
      ...MixFlags.envGeoIDFlag,
      dependsOn: ['env'],
    },
    label: MixFlags.labelFlag,
    value: MixFlags.valueFlag,
  }

  async buildRequestParameters(options: Partial<FlagOutput>): Promise<EnvConfigsConfigureParams> {
    debug('buildRequestParameters()')
    const {
      env,
      'env-geo': envGeoId,
      label,
      project,
      value,
    } = options

    return {
      envId: env,
      envGeoId,
      label,
      projectId: project,
      value,
    }
  }

  doRequest(client: MixClient, params: EnvConfigsConfigureParams): Promise<MixResponse> {
    debug('doRequest()')
    const {envId} = params

    if (envId) {
      return configureEnvConfigWithGeo(client, params)
    }

    return configureEnvConfigWithoutGeo(client, params)
  }

  outputHumanReadable() {
    debug('outputHumanReadable()')

    this.log()
    if (this.options.env) {
      this.log(`Environment configuration ${this.options.label} configured successfully for project ${chalk.cyan(this.options.project)}`)
      this.log(`in environment geography ${chalk.cyan(this.options['env-geo'])} of environment ${chalk.cyan(this.options.env)}`)
    } else {
      this.log(`Environment configuration ${this.options.label} default configured successfully for project ${chalk.cyan(this.options.project)}`)
    }

    // this.log()
  }

  setRequestActionMessage(_options: any) {
    debug('setRequestActionMessage()')

    this.requestActionMessage = `Configuring environment configuration ${chalk.cyan(this.options.label)} for project ${this.options.project}`
    if (this.options.env) {
      this.requestActionMessage += ` in environment geography ${this.options['env-geo']} of environment ${this.options.env}`
    }
  }
}
