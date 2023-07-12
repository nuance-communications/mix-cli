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
import {CliUx, Command} from '@oclif/core'

const debug = makeDebug('mix:commands:system:list')

export default class SystemVersionList extends Command {
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
    this.log(chalk.bold('Configured Mix systems:'))
    this.log()
    const {systems} = Config.getMixCLIConfig(this.config)
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
