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
    } catch (error) {
      this.outputExitInit(error.message)

      process.exitCode = configurationProblemExitCode
      return
    }

    if (isMixCLIEnvVariableSetComplete && !isMixCLIConfigPresent) {
      this.log() // intentional blank line
    }

    let currentConfig : MixCLIConfig | undefined
    // Do we have a previous configuration to back up?
    if (isMixCLIConfigPresent) {
      const config = Config.getMixCLIConfig(this.config)
      currentConfig = Config.isOldConfig(config) ? Config.convertOldConfigToNew(config) : config

      const backupPathName = Config.moveMixCLIConfigToBackup(configDir)
      this.outputMixCLIConfigurationBackedUp(backupPathName)
    }

    // Store new configuration to file
    const combinedConfig = Config.combineConfigSystems({
      newConfig: mixCLIConfig,
      oldConfig: currentConfig,
    })
    const configStoreErrorMessage = Config.storeMixCLIConfig(configDir, combinedConfig)
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

  async askClientCredentialsConfigurationValues(): Promise<any> {
    const authServer = await CliUx.ux.prompt('Mix authentication server fully-qualified hostname?',
      {default: 'auth.crt.nuance.com'})
    const apiServer = await CliUx.ux.prompt('Mix API server fully-qualified hostname?',
      {default: 'mix.api.nuance.com'})
    const scope = await CliUx.ux.prompt('Mix OAuth scope?',
      {default: 'mix-api'})
    const clientId = await CliUx.ux.prompt('Your client ID?',
      {type: 'mask'})
    const clientSecret = await CliUx.ux.prompt('Your client secret?',
      {type: 'hide'})
    const suggestedSystem = Config.getSystemFromApiServer(apiServer)
    const system = await CliUx.ux.prompt('Mix system name?',
      {default: suggestedSystem})

    const values = {
      authFlow: 'credentials',
      authServer,
      apiServer,
      scope,
      clientId,
      clientSecret,
      tenant: 'mix',
    }

    return [values, system]
  }

  async askDeviceCodeConfigurationValues(): Promise<any> {
    const authServer = await CliUx.ux.prompt('Authority URL?')

    if (!authServer.startsWith('https://')) {
      throw new Error(`Authority URL must start with ${chalk.green('https://')}.`)
    }

    const apiServer = await CliUx.ux.prompt('Mix API server fully-qualified hostname?')
    const scope = await CliUx.ux.prompt('Scope?')
    const clientId = await CliUx.ux.prompt('Your client ID?',
      {type: 'mask'})
    const suggestedSystem = Config.getSystemFromApiServer(apiServer)
    const system = await CliUx.ux.prompt('Mix system name?',
      {default: suggestedSystem})

    const values = {
      authFlow: 'device',
      authServer, // used to hold authority URL with Client Credentials flow
      apiServer,
      scope,
      clientId,
      clientSecret: '', // not used with Client Credentials flow
      tenant: '', // not used with Device Code flow
    }

    return [values, system]
  }

  async askConfigurationValues(): Promise<MixCLIConfig> {
    debug('askConfigurationValues()')
    this.log() // intentional blank line

    const authFlow = await CliUx.ux.prompt('Authentication flow (credentials, device)?',
      {default: 'credentials'})

    let values
    let system

    switch (authFlow) {
      case 'credentials':
        [values, system] = await this.askClientCredentialsConfigurationValues()
        break
      case 'device':
        [values, system] = await this.askDeviceCodeConfigurationValues()
        break
      default:
        throw new Error(`${chalk.red(authFlow)} is not a valid or supported flow.`)
    }

    const mixCLIConfig = {
      ...values,
      currentSystem: system.toLowerCase(),
      systems: {
        [system]: {
          ...values,
        },
      },
    }

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
Answer the few questions below to configure mix-cli.`)
  }

  outputCanUseEnvironmentVariables() {
    debug('outputCanUseEnvironmentVariables()')
    this.log(`
You can use environment variables or a .env file in the current working
directory to override values from the central configuration.`)
  }

  outputExitInit(errorMessage: string) {
    debug('outputExitInit()')
    if (errorMessage) {
      this.log(errorMessage)
    }

    this.log()
    this.log('\'init\' command aborted. Verify your configuration values and run the command again.')
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
    this.log('Let\'s configure a Mix system for mix-cli to use.')
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
    this.log()
    this.log('Your mix-cli configuration is ready!')
    this.log()
    this.log('Next, you can:')
    this.log(`  - get authenticated to the newly added Mix system by typing: ${chalk.cyan('mix auth')}`)
    this.log(`  - see your list of configured Mix systems by typing: ${chalk.cyan('mix system:list')}`)
    this.log(`  - switch to a different Mix system by typing: ${chalk.cyan('mix auth --system <system name>')}`)
    this.log()
  }

  outputVerifyEnvironmentVariables() {
    debug('outputVerifyEnvironmentVariables()')
    this.log(`
${chalk.yellow('Note')}: You have Mix environment variables set currently.
Verify them as they take precedence over the central configuration file.`)
  }
}
