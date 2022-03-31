/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

/* eslint-disable unicorn/prefer-node-protocol */
import * as fs from 'fs'
import dotenv from 'dotenv'
import {format} from 'date-fns'
import {IConfig} from '@oclif/config'
import makeDebug from 'debug'
import path from 'path'

const debug = makeDebug.debug('mix:utils:config')
dotenv.config()

let mixCLIConfig: MixCLIConfig | undefined

const evNames = [
  'MIX_API_SERVER',
  'MIX_AUTH_SERVER',
  'MIX_CLIENT_ID',
  'MIX_CLIENT_SECRET',
  'MIX_SCOPE',
  'MIX_TENANT',
]

export interface MixCLIConfig {
  apiServer: string
  authServer: string
  clientId: string
  clientSecret: string
  scope: string
  tenant: string
}

export const Config = {
  getMixCLIConfig(config?: IConfig): MixCLIConfig {
    debug('getMixCLIConfig()')

    if (mixCLIConfig !== undefined) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const {clientId, clientSecret, ...safeToShow} = mixCLIConfig
      debug('existing mix.cli configuration: %O', safeToShow)
      return mixCLIConfig
    }

    const fileConfig = config ?
      loadMixCLIConfig(process.env.MIX_CONFIG_DIR || config.configDir) : {}
    mixCLIConfig = overrideConfigUsingEnvVars(fileConfig)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {clientId, clientSecret, ...safeToShow} = mixCLIConfig
    debug('resulting mix.cli configuration loaded: %O', safeToShow)

    return mixCLIConfig
  },

  getMissingEnvironmentVariables(): string[] {
    debug('getMissingEnvironmentVariables()')
    const missingEnvVars = evNames.filter(evName => process.env[evName] === undefined)
    return missingEnvVars
  },

  isAnyMixCLIEnvVariablePresent(): boolean {
    debug('isAnyMixCLIEnvVariablePresent()')
    return evNames.some(evName => process.env[evName] !== undefined)
  },

  isMixCLIEnvVariableSetComplete(): boolean {
    debug('isMixCLIEnvVariableSetComplete()')
    const missingEnvVars = Config.getMissingEnvironmentVariables()
    return missingEnvVars.length === 0
  },

  isMixCLIConfigPresent(configFilePath: string): boolean {
    debug('isMixCLIConfigPresent() configFilePath; %s', configFilePath)
    return fs.existsSync(configFilePath)
  },

  moveMixCLIConfigToBackup(configDir: string): string {
    debug('moveMixCLIConfigToBackup()')
    const source = path.join(configDir, 'config.json')
    debug('source: %s', source)
    const dateTimeStamp = format(new Date(), 'yyyyMMddHHmmssSSS')

    const destination = path.join(configDir, `config-${dateTimeStamp}.json`)
    debug('destination: %s', destination)
    fs.renameSync(source, destination)

    return destination
  },

  storeMixCLIConfig(configDir: string, mixConfig: MixCLIConfig) {
    debug('storeMixCLIConfig() configDir: %s', configDir)
    let errorMessage: string | undefined

    if (!fs.existsSync(configDir)) {
      try {
        fs.mkdirSync(configDir, {
          recursive: true,
          mode: '0700',
        }) // rwx mode for user only
      } catch (error) {
        const errMessage = error.message ? `: ${error.message}` : ''
        errorMessage = `Failed to create directory ${configDir}: ${errMessage}`
        return errorMessage
      }
    }

    const tokenFilePath = path.join(configDir, 'config.json')

    try {
      fs.writeFileSync(tokenFilePath, JSON.stringify(mixConfig, null, 2), {
        encoding: 'utf8',
        mode: '0600', // rw mode for user only
        flag: 'w',
      })
    } catch (error) {
      const errMessage = error.message ? `: ${error.message}` : ''
      errorMessage = `Failed to write token file${errMessage}`
      return errorMessage
    }

    return errorMessage
  },
}

function loadMixCLIConfig(configDir: string) {
  debug('loadMixCLIConfig() configDir: %s', configDir)
  const fileContent = fs.readFileSync(path.join(configDir, 'config.json'))
  const config = JSON.parse(fileContent.toString())

  return config
}

function overrideConfigUsingEnvVars(config: MixCLIConfig): MixCLIConfig {
  debug('overrideConfigUsingEnvVars()')
  const {
    MIX_API_SERVER,
    MIX_AUTH_SERVER,
    MIX_CLIENT_ID,
    MIX_CLIENT_SECRET,
    MIX_SCOPE,
    MIX_TENANT,
  } = process.env

  debug('MIX_API_SERVER: %s', MIX_API_SERVER)
  debug('MIX_AUTH_SERVER: %s', MIX_AUTH_SERVER)
  debug('MIX_CLIENT_ID: %s', MIX_CLIENT_ID ? '******' : '')
  debug('MIX_CLIENT_SECRET: %s', MIX_CLIENT_SECRET ? '******' : '')
  debug('MIX_SCOPE: %s', MIX_SCOPE)
  debug('MIX_TENANT: %s', MIX_TENANT)

  const envOverriddenConfig = {
    ...config,
    ...(MIX_API_SERVER ? {apiServer: MIX_API_SERVER} : {}),
    ...(MIX_AUTH_SERVER ? {authServer: MIX_AUTH_SERVER} : {}),
    ...(MIX_CLIENT_ID ? {clientId: MIX_CLIENT_ID} : {}),
    ...(MIX_CLIENT_SECRET ? {clientSecret: MIX_CLIENT_SECRET} : {}),
    ...(MIX_SCOPE ? {scope: MIX_SCOPE} : {}),
    ...(MIX_TENANT ? {tenant: MIX_TENANT} : {}),
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {clientId, clientSecret, ...safeToShow} = envOverriddenConfig
  debug('envOverriddenConfig: %O', safeToShow)

  return envOverriddenConfig
}
