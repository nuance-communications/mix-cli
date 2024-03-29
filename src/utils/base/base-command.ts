/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import chalk from 'chalk'
import {CliUx, Command} from '@oclif/core'
import makeDebug from 'debug'

import {AuthServerAndCreds, oAuth} from '../../utils/auth'
import {Config, MixCLIConfig} from '../config'
import {tokenFileName} from '../constants'
import {eUnauthorizedMSAL} from '../errors'
import {
  getMSALClient,
  getMSALTokenDeviceCode,
  getMSALTokenSilent,
} from '../msal-auth'

const debug = makeDebug('mix:base:base-command')

export default abstract class BaseCommand extends Command {
  static description: string

  accessToken: any = null
  mixCLIConfig?: MixCLIConfig
  oAuthClient: any = null

  deviceCodeCallback(response: {message: string}) {
    this.log(response.message)
    CliUx.ux.action.start('Authenticating using device code')
  }

  async doMSALAuth() {
    debug('doMSALAuth()')

    try {
      const pca = getMSALClient({
        authority: this.mixCLIConfig!.authServer,
        configDir: process.env.MIX_CONFIG_DIR || this.config.configDir,
        clientId: this.mixCLIConfig!.clientId,
      })

      const authenticationOptions = {
        pca,
        scope: this.mixCLIConfig!.scope,
        callback: this.deviceCodeCallback.bind(this),
      }

      let acquiredToken = await getMSALTokenSilent(authenticationOptions)

      if (acquiredToken === null) {
        acquiredToken = await getMSALTokenDeviceCode(authenticationOptions)
        if (acquiredToken === null) {
          CliUx.ux.action.stop(chalk.red('failed'))
          this.error(eUnauthorizedMSAL('Failed to authenticate using device code'))
        }
      }

      CliUx.ux.action.stop(chalk.green('OK'))
      this.log()

      this.accessToken = {
        // eslint-disable-next-line camelcase
        access_token: acquiredToken.accessToken,
      }
    } catch (error) {
      debug('failed to perform authentication using device code')
      this.error(eUnauthorizedMSAL(error.message))
    }
  }

  async doOriginalAuth(clientId: string, clientSecret: string) {
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
      CliUx.ux.action.start('Renewing access token')
      const {renewedToken, error} = await this.renewAccessToken(scope)

      if (error) {
        debug('access token renewal failed')
        this.error(error.message, error.options)
        CliUx.ux.action.stop(chalk.red('failed'))
      }

      debug('access token successfully renewed')
      this.accessToken = renewedToken
      CliUx.ux.action.stop(chalk.green('OK'))
    }
  }

  async doAuth() {
    debug('doAuth()')
    const {clientId, clientSecret, ...safeToPrintConfig} = this.mixCLIConfig!
    debug('mix-cli configuration: %O', safeToPrintConfig)

    if (Config.isOldConfig(this.mixCLIConfig!)) {
      this.handleOldConfig()
    }

    switch (this.mixCLIConfig!.authFlow) {
      case 'device':
        await this.doMSALAuth()
        break

      case 'credentials':
      default:
        // using as default to provide backward compatibility
        await this.doOriginalAuth(clientId, clientSecret)
        break
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

  writeConfigToDisk() {
    const {configDir} = this.config
    const configStoreErrorMessage = Config.storeMixCLIConfig(configDir, this.mixCLIConfig!)

    if (configStoreErrorMessage) {
      this.log('Failed to write to configuration file. Exiting.')
      this.error(configStoreErrorMessage)
    }
  }

  handleOldConfig() {
    this.log(chalk.yellow('Old configuration file detected'))
    CliUx.ux.action.start('Upgrading configuration file')
    this.mixCLIConfig = Config.convertOldConfigToNew(this.mixCLIConfig!)
    this.writeConfigToDisk()
    CliUx.ux.action.stop(chalk.green('done'))
  }
}
