/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import chalk from 'chalk'
import makeDebug from 'debug'
import {Config} from '../../utils/config'
import {CliUx} from '@oclif/core'

const debug = makeDebug('mix:commands:system:list')
import BaseCommand from '../../utils/base/base-command'

export default class SystemVersionList extends BaseCommand {
  static description = `list configured Mix systems
  
  Use this command to list the Mix systems you have configured
  to use with mix-cli.`

  static examples = [
    'list configured Mix systens',
    'mix system:list',
    'Equivalent command',
    'mix systems:list',
  ]

  static aliases = ['systems:list', 'system:list']

  get columns() {
    return {
      systemName: {header: 'System'},
      apiServer: {header: 'APIServer'},
      authServer: {header: 'AuthServer'},
      scope: {header: 'Scope'},
      tenant: {header: 'Tenant'},
    }
  }

  async run() {
    debug('run()')
    const config = Config.getMixCLIConfig(this.config)
    if (!config) {
      this.log('No Mix systems configured. Run "mix init" to add a Mix system to your configuration.')
      return
    }

    this.mixCLIConfig = config
    if (!config.systems) {
      this.log(chalk.yellow('Old configuration file detected'))
      CliUx.ux.action.start('Upgrading configuration file')
      this.mixCLIConfig = Config.convertOldConfigToNew(this.mixCLIConfig!)
      this.writeConfigToDisk()
      CliUx.ux.action.stop(chalk.green('done'))
    }

    this.log(chalk.bold('Configured Mix systems:'))
    this.log()
    const {systems} = this.mixCLIConfig
    const systemsTable = []
    for (const [name, config] of Object.entries(systems!)) {
      systemsTable.push({
        systemName: name,
        apiServer: config.apiServer,
        authServer: config.authServer,
        scope: config.scope,
        tenant: config.tenant,
      })
    }

    CliUx.ux.table(systemsTable, this.columns, {})
    this.log()
    this.log(`To switch to a different Mix system, run: ${chalk.cyan('mix auth --system <system>')}`)
    this.log(`To add a new Mix system to your configuration, run: ${chalk.cyan('mix init')}`)
  }
}
