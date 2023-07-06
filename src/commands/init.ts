/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

/* eslint-disable unicorn/prefer-node-protocol */
import chalk from 'chalk'
import {CliUx, Command} from '@oclif/core'
import makeDebug from 'debug'
import path from 'path'

import {Config, MixCLIConfig} from '../utils/config'
import {configurationProblemExitCode} from '../utils/constants'

const debug = makeDebug('mix:commands:init')

export default class Init extends Command {
  static description = `initialize mix-cli configuration
  
Use this command to initialize the mix-cli configuration. Elements of the
configuration can also be overridden using environment variables.`

  static examples = ['mix init']

  mixCLIConfig?: MixCLIConfig

  async run() {
    debug('run()')
    const {configDir} = this.config
    const mixCLIConfigFilePath = path.join(configDir, 'config.json')

    const isMixCLIConfigPresent = Config.isMixCLIConfigPresent(mixCLIConfigFilePath)
    const isAnyMixCLIEnvVariablePresent = Config.isAnyMixCLIEnvVariablePresent()
    const isMixCLIEnvVariableSetComplete = Config.isMixCLIEnvVariableSetComplete()
    const missingMixCLIEnvVars = Config.getMissingEnvironmentVariables()

    debug('isMixCLIConfigPresent:', isMixCLIConfigPresent)
    debug('isAnyMixCLIEnvVariablePresent:', isAnyMixCLIEnvVariablePresent)
    debug('isMixCLIEnvVariableSetComplete:', isMixCLIEnvVariableSetComplete)
    debug('missingMixCLIEnvVars:', missingMixCLIEnvVars)

    // Welcome message
    this.outputLetsCreateNewConfig()

    // Do we already have a central configuration file?
    if (isMixCLIConfigPresent) {
      this.warnAboutOverwritingConfiguration(mixCLIConfigFilePath)
      this.outputAnswerSomeQuestions()
    } else if (isAnyMixCLIEnvVariablePresent) { // Do we have environment variables to worry about?
      if (isMixCLIEnvVariableSetComplete) {
        this.outputHaveCompleteEnvVarSet()
      } else {
        this.outputHaveSomeEnvVarSet()
        this.outputAnswerSomeQuestions()
      }
    } else {
      this.outputAnswerSomeQuestions()
    }

    // Which question do we ask?
    let mixCLIConfig: MixCLIConfig
    try {
      mixCLIConfig = await ((isMixCLIEnvVariableSetComplete && !isMixCLIConfigPresent) ?
        this.confirmUseOfEnvironmentVariables() : this.askConfigurationValues())
    } catch {
      this.outputExitInit()

      process.exitCode = configurationProblemExitCode
      return
    }

    if (isMixCLIEnvVariableSetComplete && !isMixCLIConfigPresent) {
      this.log() // intentional blank line
    }

    // Do we have a previous configuration to back up?
    if (isMixCLIConfigPresent) {
      const backupPathName = Config.moveMixCLIConfigToBackup(configDir)
      this.outputMixCLIConfigurationBackedUp(backupPathName)
    }

    // Store new configuration to file
    const configStoreErrorMessage = Config.storeMixCLIConfig(configDir, mixCLIConfig)
    if (configStoreErrorMessage) {
      this.error(configStoreErrorMessage)
    }

    this.outputMixCLIConfigurationSaved(configDir)

    // Warn about environment variables if applicable
    if (isAnyMixCLIEnvVariablePresent) {
      this.outputVerifyEnvironmentVariables()
    }

    this.outputUserIsAllSet()
  }

  async askConfigurationValues() {
    debug('askConfigurationValues()')
    this.log() // intentional blank line
    const authServer = await CliUx.ux.prompt('Mix authentication server fully-qualified hostname?',
      {default: 'auth.crt.nuance.com'})
    const apiServer = await CliUx.ux.prompt('Mix API server fully-qualified hostname?',
      {default: 'mix.api.nuance.com'})
    const scope = await CliUx.ux.prompt('Mix OAuth scope?',
      {default: 'mix-api'})
    const tenant = await CliUx.ux.prompt('Mix tenant?',
      {default: 'mix'})
    const clientId = await CliUx.ux.prompt('Your client ID?',
      {type: 'mask'})
    const clientSecret = await CliUx.ux.prompt('Your client secret?',
      {type: 'hide'})

    const mixCLIConfig = {authServer, apiServer, scope, tenant, clientId, clientSecret}

    return mixCLIConfig
  }

  async collectAnswers() {
    debug('collectAnswers()')
    const authServer = await CliUx.ux.prompt('Mix authentication server fully-qualified hostname?',
      {default: 'auth.crt.nuance.com'})
    const apiServer = await CliUx.ux.prompt('Mix API server fully-qualified hostname?',
      {default: 'mix.api.nuance.com'})
    const scope = await CliUx.ux.prompt('Mix OAuth scope?',
      {default: 'mix-api'})
    const tenant = await CliUx.ux.prompt('Mix tenant?',
      {default: 'mix'})
    const clientId = await CliUx.ux.prompt('Your client ID?',
      {type: 'mask'})
    const clientSecret = await CliUx.ux.prompt('Your client secret?',
      {type: 'hide'})

    const mixCLIConfig = {authServer, apiServer, scope, tenant, clientId, clientSecret}
    return mixCLIConfig
  }

  async confirmUseOfEnvironmentVariables(): Promise<MixCLIConfig> {
    debug('confirmUseOfEnvironmentVariables()')
    const useMixCLIEnvVars = await CliUx.ux.prompt('\nCreate the new configuration file using your Mix environment variables?',
      {default: 'Y', type: 'single'})

    if (useMixCLIEnvVars.toUpperCase() !== 'Y') {
      throw new Error('init command aborted')
    }

    return {
      apiServer: process.env.MIX_API_SERVER || '',
      authServer: process.env.MIX_AUTH_SERVER || '',
      clientId: process.env.MIX_CLIENT_ID || '',
      clientSecret: process.env.MIX_CLIENT_SECRET || '',
      scope: process.env.MIX_SCOPE || '',
      tenant: process.env.MIX_TENANT || '',
    }
  }

  outputAnswerSomeQuestions() {
    debug('outputAnswerSomeQuestions()')
    this.log(`
Answer the few questions below to configure mix-cli.
Simply accept defaults if you plan on using the Production US environment.`)
  }

  outputCanUseEnvironmentVariables() {
    debug('outputCanUseEnvironmentVariables()')
    this.log(`
You can use environment variables or a .env file in the current working
directory to override values from the central configuration.`)
  }

  outputExitInit() {
    debug('outputExitInit()')
    this.log('\n\n\'init\' command aborted. You can run the command later.')
  }

  outputHaveCompleteEnvVarSet() {
    debug('outputHaveCompleteEnvVarSet()')
    this.log(`
mix-cli has detected that you have the environment variables relevant
to mix-cli set. These are the values needed to create the central
configuration file.`)
  }

  outputHaveSomeEnvVarSet() {
    debug('outputHaveSomeEnvVarSet()')
    this.log(`
mix-cli has detected that you have a partial set of Mix environment variables
currently set. We will create a brand new configuration to get a complete
and consistent set of configuration values.`)
  }

  outputLetsCreateNewConfig() {
    debug('outputLetsCreateNewConfig()')
    this.log('Let\'s create a new configuration file for mix-cli.')
  }

  outputMixCLIConfigurationBackedUp(backupPathName: string) {
    debug('outputMixCLIConfigurationBackedUp()')
    this.log(`\nPrevious configuration file backed up in ${chalk.yellow(backupPathName)}`)
  }

  outputMixCLIConfigurationSaved(configDir: string) {
    debug('outputMixCLIConfigurationSaved()')
    const filePath = path.join(configDir, 'config.json')
    this.log(`\nNew configuration file created in ${chalk.cyan(filePath)}`)
  }

  outputUserIsAllSet() {
    debug('outputUserIsAllSet()')
    this.log(`\nYour mix-cli configuration is ready! Next, get authenticated by typing:

mix auth`)
  }

  outputVerifyEnvironmentVariables() {
    debug('outputVerifyEnvironmentVariables()')
    this.log(`
${chalk.yellow('Note')}: You have Mix environment variables set currently.
Verify them as they take precedence over the central configuration file.`)
  }

  warnAboutOverwritingConfiguration(mixCLIConfigFilePath: string) {
    debug('warnAboutOverwritingConfiguration(')
    this.log(`
${chalk.yellow('Note')}: A configuration file already exists in:
${mixCLIConfigFilePath}

It will be backed up before the new configuration file gets created, after you answer the
question(s) that follow. You can use ${chalk.cyan('CTRL-C')} to exit the 'init' command.`)
  }
}
