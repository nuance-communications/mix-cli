/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import chalk from 'chalk'
import cli from 'cli-ux'
import {flags} from '@oclif/command'
import makeDebug from 'debug'

import {AuthServerAndCreds, oAuth} from '../utils/auth'
import Command from '../utils/base/base-command'
import {Config, MixCLIConfig} from '../utils/config'
import {configurationProblemExitCode, tokenFileName} from '../utils/constants'

const SUCCESS = 'Token was retrieved and stored successfully.\n' +
  'You are now ready to use mix.cli! 🚀\n\n' +
  'If you are a first time user, you can start by looking\n' +
   'at the organizations you are part of by typing:\n\n' +
  'mix organizations:list\n\n' +
  'Your organization ID is needed for a number of mix commands.'

const debug = makeDebug('mix:commands:auth')
export default class Auth extends Command {
  static description = `obtain Mix access token
  
Use this command to retrieve an access token. Once Mix.cli has acquired the
access token, it takes care of refreshing it automatically.`

  static examples = ['mix auth']

  static flags = {
    help: flags.help({char: 'h'}),
  }

  mixCLIConfig?: MixCLIConfig

  private authError: {message: string; code: string; suggestions?: string[]} | undefined
  options: Partial<flags.Output> = {}

  async init() {
    debug('init()')
    // turn off debugging in underlying dependencies so tokens don't get displayed
    const debugSpace = makeDebug.disable()
    makeDebug.enable(`${debugSpace},-follow-redirects,-simple-oauth2*`)
  }

  captureOptions() {
    const {flags} = this.parse(Auth)
    this.options = flags
  }

  async runWithClientCredentialsGrant() {
    debug('runWithClientCredentialsGrant()')
    const {authServer, clientId, clientSecret, scope} = this.mixCLIConfig!

    cli.action.start('Retrieving access token using Client Credentials Grant')

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
        suggestions: ['Verify your client credentials.',
          'Verify your network connectivity.',
          'Verify the values provided for the authentication and API servers in your configuration.'],
      }

      cli.action.stop(chalk.red('failed'))
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
      cli.action.stop(chalk.red('failed'))
    } else {
      cli.action.stop(chalk.green('done'))
    }
  }

  async run() {
    debug('run()')
    try {
      this.mixCLIConfig = Config.getMixCLIConfig(this.config)
    } catch {
      this.log(`
mix.cli now requires a central configuration file.
Please run the "mix init" command and mix.cli will help you create
that configuration file swiftly.`)
      process.exitCode = configurationProblemExitCode
      return
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
    }
  }
}
