/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import chalk from 'chalk'
import cli from 'cli-ux'
import Command from '@oclif/command'
import makeDebug from 'debug'

import {AuthServerAndCreds, oAuth} from '../../utils/auth'
import {MixCLIConfig} from '../config'
import {tokenFileName} from '../constants'

const debug = makeDebug('mix:base:base-command')

export default abstract class BaseCommand extends Command {
  static description: string

  accessToken: any = null
  mixCLIConfig?: MixCLIConfig
  oAuthClient: any = null

  async doAuth() {
    debug('doAuth()')
    const {clientId, clientSecret, ...safeToPrintConfig} = this.mixCLIConfig!
    debug('mix-cli configuration: %O', safeToPrintConfig)

    const authServerAndCreds: AuthServerAndCreds = {
      authServerHost: this.mixCLIConfig!.authServer,
      id: clientId,
      secret: clientSecret,
    }

    this.oAuthClient = oAuth.getOAuthAPI(authServerAndCreds)

    // try to retrieve access token stored from previous interaction
    const tokenDir = process.env.MIX_CONFIG_DIR || this.config.configDir
    const {parsedToken, error} = this.oAuthClient.retrieveAccessToken(tokenDir, tokenFileName)

    if (error !== null) {
      this.error(error.message, error.options)
    }

    debug('retrieved access token')
    this.accessToken = parsedToken

    // check to see if token is expired or nearly expired
    const {scope} = this.mixCLIConfig!
    if (this.oAuthClient.isAccessTokenExpired(this.accessToken)) {
      debug('access token is expired or close to expiring')
      cli.action.start('Renewing access token')
      const {renewedToken, error} = await this.renewAccessToken(scope)
      if (error) {
        debug('access token renewal failed')
        this.error(error.message, error.options)
        cli.action.stop(chalk.red('failed'))
      }

      debug('access token successfully renewed')
      this.accessToken = renewedToken
      cli.action.stop(chalk.green('OK'))
    }
  }

  async init() {
    debug('init()')

    // make sure there is no debugging from underlying dependencies
    // so tokens don't get displayed
    const debugSpace = makeDebug.disable()
    makeDebug.enable(`${debugSpace},-follow-redirects,-simple-oauth2*`)
  }

  async renewAccessToken(scope: string): Promise<{renewedToken: any; error: any}> {
    debug('renewAccessToken()')
    const tokenDir = process.env.MIX_CONFIG_DIR || this.config.configDir

    return this.oAuthClient.renewAccessToken(scope, tokenDir, tokenFileName)
  }

  retrieveAccessToken(): any {
    debug('retrieveAccessToken()')
    const tokenDir = process.env.MIX_CONFIG_DIR || this.config.configDir
    return this.oAuthClient.retrieveAccessToken(tokenDir, tokenFileName)
  }

  storeAccessToken(token: any): string | null {
    debug('storeAccessToken()')
    const tokenDir = process.env.MIX_CONFIG_DIR || this.config.configDir
    return this.oAuthClient.storeAccessToken(token, tokenDir, tokenFileName)
  }
}
