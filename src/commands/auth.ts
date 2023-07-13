/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import chalk from 'chalk'
import {CliUx} from '@oclif/core'
import {FlagOutput} from '@oclif/core/lib/interfaces'
import makeDebug from 'debug'
import * as MixFlags from '../utils/flags'

import {AuthServerAndCreds, oAuth} from '../utils/auth'
import Command from '../utils/base/base-command'
import {Config, MixCLIConfig} from '../utils/config'
import {configurationProblemExitCode, tokenFileName} from '../utils/constants'

const SUCCESS = 'Token was retrieved and stored successfully.\n' +
  'You are now ready to use mix-cli! 🚀'

const SUCCESS_NEW_USER = 'If you are a first time user, you can start by looking\n' +
  'at the organizations you are part of by typing:\n\n' +
  'mix organizations:list\n\n' +
  'Your organization ID is needed for a number of mix commands.'

const debug = makeDebug('mix:commands:auth')
export default class Auth extends Command {
  static description = `obtain a Mix access token
  
Use this command to retrieve an access token. Once mix-cli has acquired the
access token, it takes care of refreshing it automatically.

Use the 'system' flag to authenticate with a specific Mix system. mix-cli executes
commands against the last Mix system it successfully authenticated with.

Run the 'system:list' command to see your list of configured Mix systems.`

  static examples = [
    'Authenticate with last Mix system used',
    '$ mix auth',
    'Authenticate with and switch to the "us" Mix system',
    '$ mix auth --system us',
  ]

  static flags = {
    system: MixFlags.systemFlag,
  }

  mixCLIConfig?: MixCLIConfig

  private authError: {message: string; code: string; suggestions?: string[]} | undefined
  options: Partial<FlagOutput> = {}

  async init() {
    debug('init()')
    // turn off debugging in underlying dependencies so tokens don't get displayed
    const debugSpace = makeDebug.disable()
    makeDebug.enable(`${debugSpace},-follow-redirects,-simple-oauth2*`)
  }

  async runWithClientCredentialsGrant() {
    debug('runWithClientCredentialsGrant()')
    const {authServer, clientId, clientSecret, scope} = this.mixCLIConfig!

    CliUx.ux.action.start('Retrieving access token using Client Credentials Grant')
    if (this.authError) {
      CliUx.ux.action.stop(chalk.red('failed'))
    }

    const authServerAndCreds: AuthServerAndCreds = {
      authServerHost: authServer,
      id: clientId,
      secret: clientSecret,
    }

    const oAuth2Client = oAuth.getOAuthAPI(authServerAndCreds)

    const {accessToken, errorMessage} = await oAuth2Client.getAccessToken(scope)
    if (errorMessage !== null) {
      this.authError = {
        code: 'EAUTHFAILURE',
        message: `Failed to obtain access token: ${errorMessage}`,
        suggestions: [
          'Make sure you are using valid service credentials; default credentials will not work.',
          'Verify your network connectivity.',
          'Verify the values provided for the authentication and API servers in your configuration.',
        ],
      }

      CliUx.ux.action.stop(chalk.red('failed'))
      return
    }

    const tokenDir = process.env.MIX_CONFIG_DIR || this.config.configDir
    const errorMessage2 = oAuth2Client.storeAccessToken(accessToken, tokenDir, tokenFileName)

    if (errorMessage2) {
      this.authError = {
        code: 'ETOKENSTORAGEFAILURE',
        message: errorMessage2 || '',
        suggestions: ['Verify permissions on your working directory.',
          'Verify permissions on file .mix-token in your working directory.'],
      }
      CliUx.ux.action.stop(chalk.red('failed'))
    } else {
      CliUx.ux.action.stop(chalk.green('done'))
    }
  }

  async run() {
    const {flags: {system}} = await this.parse(Auth)
    debug('run()')
    try {
      this.mixCLIConfig = Config.getMixCLIConfig(this.config)
    } catch {
      this.log(`
mix-cli now requires a central configuration file.
Please run the "mix init" command and mix-cli will help you create
that configuration file swiftly.`)
      process.exitCode = configurationProblemExitCode
      return
    }

    if (system) {
      try {
        this.mixCLIConfig = Config.switchConfiguration(this.mixCLIConfig, system)
        this.writeConfigToDisk()
        this.log(`Switched to Mix system: ${chalk.green(system.toLowerCase())}`)
        this.log()
      } catch (error) {
        this.authError = {
          code: 'EINVALIDMIXSYSTEM',
          message: `Failed to switch to Mix system: ${error.message}`,
          suggestions: [
            'Verify the value provided for system.',
            'Use "mix init" to add a new system to your configuration.',
          ],
        }
      }
    } else if (this.mixCLIConfig.currentSystem) {
      this.log(`Authenticating with ${chalk.green(this.mixCLIConfig.currentSystem)} Mix system`)
    } else {
      this.log(`Authenticating with authServer: ${chalk.green(this.mixCLIConfig.authServer)}`)
    }

    await this.runWithClientCredentialsGrant()

    if (this.authError) {
      this.error(this.authError.message, {
        code: this.authError.code,
        exit: 1,
        suggestions: this.authError.suggestions,
      })
    } else {
      this.log(SUCCESS)

      if (!this.mixCLIConfig.systems) {
        this.log()
        this.log(SUCCESS_NEW_USER)
      }
    }
  }
}
