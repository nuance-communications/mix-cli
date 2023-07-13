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
import {MixClient, MixResponse} from '../../mix/types'
import {EnvConfigsDestroyParams} from '../../mix/api/env-configs-types'
import {destroyEnvConfigWithGeo, destroyEnvConfigWithoutGeo} from '../../mix/api/env-configs'
import chalk from 'chalk'

const debug = makeDebug('mix:commands:env-configs:destroy')

export default class EnvConfigsDestroy extends MixCommand {
  static description = `destroy an environment configuration

  Environment configurations provide default values either for the project as a whole
  or for a specific environment geography. If an environment geography doest not have
  a default for a specific configuration, then the default for the project is used.
  
  Using this command with only the 'project' flag deletes the project-level default value
  for the given configuration label. Using this command with the 'env' and 'env-geo' flags
  in addition to the 'project' flag deletes the default value for the given configuration
  label targeting the specified environment geography.
  
  `

  static examples = [
    'Destroy an environment configuration project default',
    'mix env-configs:destroy -P 1922 --label GRAMMAR_BASE_PATH',
    'Destroy an environment configuration for a specific environment geography',
    'mix env-configs:destroy -P 1922 --env=1923 --env-geo=9 --label=GRAMMAR_BASE_PATH',
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
  }

  action = 'destroy'
  shouldConfirmCommand = true

  async buildRequestParameters(options: Partial<FlagOutput>): Promise<EnvConfigsDestroyParams> {
    debug('buildRequestParameters()')
    const {
      env,
      'env-geo': envGeoId,
      label,
      project,
    } = options

    return {
      envId: env,
      envGeoId,
      label,
      projectId: project,
    }
  }

  doRequest(client: MixClient, params: EnvConfigsDestroyParams): Promise<MixResponse> {
    debug('doRequest()')
    const {envId} = params

    if (envId) {
      return destroyEnvConfigWithGeo(client, params)
    }

    return destroyEnvConfigWithoutGeo(client, params)
  }

  get expectedConfirmationValue() {
    debug('get expectedConfirmationValue()')
    return this.options.label
  }

  outputHumanReadable() {
    debug('outputHumanReadable()')

    this.log()

    if (this.options.env) {
      this.log(`Environment configuration ${this.options.label} destroyed successfully for project ${chalk.cyan(this.options.project)}`)
      this.log(`in environment geography ${chalk.cyan(this.options['env-geo'])} of environment ${chalk.cyan(this.options.env)}`)
    } else {
      this.log(`Default environment configuration ${this.options.label} destroyed successfully for project ${chalk.cyan(this.options.project)}`)
    }
  }

  setRequestActionMessage(_options: any) {
    debug('setRequestActionMessage()')

    this.requestActionMessage = `Destroying environment configuration ${chalk.cyan(this.options.label)} for project ${this.options.project}`
    if (this.options.env) {
      this.requestActionMessage += ` in environment geography ${this.options['env-geo']} of environment ${this.options.env}`
    }
  }

  warnBeforeConfirmation() {
    debug('warnBeforeConfirmation()')
    this.warn(chalk.yellow('Destroying an environment configuration cannot be undone. Consider making a backup of your project first.'))
  }
}
