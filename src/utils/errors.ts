/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import chalk from 'chalk'

import {authProblemExitCode} from './constants'

type CLIErrorOptions = {
  code: string
  exit: number
  suggestions: string[]
}

export class MixCLIError extends Error {
  options: CLIErrorOptions

  constructor(message: string, options: CLIErrorOptions, ...params: any) {
    const superParams = [message, ...params]
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(...superParams)

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, MixCLIError)
    }

    this.name = 'MixCLIError'
    this.options = options
  }
}

export enum Codes {
  ConfigNotFound = 'ECONFIGNOTFOUND',
  ConflictError = 'ECONFLICTERROR',
  DownloadFailed = 'EDOWNLOADFAILED',
  Exception = 'EEXCEPTION',
  Forbidden = 'EFORBIDDEN',
  InvalidValue = 'EINVALIDVALUE',
  InvalidColumnError = 'EINVALIDCOLUMNERROR',
  MiscNotFound = 'ENOTFOUND',
  MismatchedValues = 'EMISMATCHEDVALUES',
  MissingParameter = 'EMISSINGPARAMETER',
  NoBuildInfo = 'ENOBUILDINFO',
  NotConfirmed = 'ENOTCONFIRMED',
  TokenFileFormat = 'ETOKENFILEFORMAT',
  TokenFileNotFound = 'ETOKENFILENOTFOUND',
  Unauthorized = 'EUNAUTHORIZED',
  UnexpectedStatus = 'EUNEXPECTEDSTATUS',
}

export const eConfigNotFound = (message?: string, suggestions?: string[]) => {
  return new MixCLIError(
    message ?? 'The mix-cli configuration file could not be found.',
    {
      code: Codes.ConfigNotFound,
      exit: 1,
      suggestions: suggestions ?? [
        'Manually create file \'config.json\' under $HOME/.config/mix-cli/',
        'You can find sample configuration files in the project\'s GitLab repository',
        'This situation is temporary until the implementation of the \'mix init\' command',
      ],
    })
}

export const eConflict = (message?: string, suggestions?: string[]) => {
  return new MixCLIError(
    message ?? 'The request conflicts with your project or application configuration.',
    {
      code: Codes.ConflictError,
      exit: 1,
      suggestions: suggestions ? suggestions : ['verify the values passed to the command flags.'],
    })
}

export const eDownloadFailed = (message: string) => {
  return new MixCLIError(
    `Download failed: ${message}` ?? 'No details available.',
    {
      code: Codes.DownloadFailed,
      exit: 1,
      suggestions: [
        'Verify provided file path exists.',
        'Verify permissions on provided file path.',
        "Use 'overwrite' flag to overwrite an existing file.",
      ],
    })
}

export const eException = (message: string, suggestions?: string[]) => {
  return new MixCLIError(
    `Exception: ${message ?? 'No details available.'}`,
    {
      code: Codes.Exception,
      exit: 1,
      suggestions: suggestions ?? ['Try the command later, or', 'Report the error to technical support.'],
    })
}

export const eForbidden = (message: string) => {
  return new MixCLIError(
    message ?? 'Access is denied.',
    {
      code: Codes.Forbidden,
      exit: 1,
      suggestions: [
        'verify that you are given access to the desired resource(s).',
      ],
    })
}

export const eInvalidValue = (message?: string, suggestions?: string[]) => {
  return new MixCLIError(
    message ?? 'One or more flags have invalid values.',
    {
      code: Codes.InvalidValue,
      exit: 1,
      suggestions: suggestions ?? ['verify the values passed to the command flags.'], // default
    })
}

export const eInvalidColumn = (message?: string, suggestions?: string[]) => {
  return new MixCLIError(
    message ?? 'Invalid column name provided.',
    {
      code: Codes.InvalidColumnError,
      exit: 1,
      suggestions: suggestions ? suggestions : ["verify the values passed to the 'columns' flag."],
    })
}

export const eMismatchedValues = (message?: string, suggestions?: string[]) => {
  return new MixCLIError(
    message ?? 'one or more flags have mismatched values.',
    {
      code: Codes.MismatchedValues,
      exit: 1,
      suggestions: suggestions ?? ['verify the values passed to the command flags.'], // default
    })
}

export const eMissingParameter = (message?: string, suggestions?: string[]) => {
  return new MixCLIError(
    message ?? 'one or more flags are missing.',
    {
      code: Codes.MissingParameter,
      exit: 1,
      suggestions: suggestions ?? ['verify the values passed to the command flags.'], // default
    })
}

export const eNoBuildInfo = (message?: string, suggestions?: string[]) => {
  return new MixCLIError(
    message ?? `Required flag(s) missing.
A build is uniquely identified by its build label or
by the combination of its build type, project ID and build version.`,
    {
      code: Codes.NoBuildInfo,
      exit: 1,
      suggestions: suggestions ?? ["Set 'build-label' flag OR ...",
        "Set 'project', 'build-type' AND 'build-version' flags."], // default
    })
}

export const eNotFound = (message?: string, suggestions?: string[]) => {
  return new MixCLIError(
    message ?? 'The data you requested could not be found.',
    {
      code: Codes.MiscNotFound,
      exit: 1,
      suggestions: suggestions ?? ['verify the values passed to the command flags.'],
    })
}

export const eNotConfirmed = (confirm: string, expected: string) => {
  return new MixCLIError(
    `Operation was not confirmed.
Value ${chalk.red(confirm)} supplied to 'confirm' flag does not match expected value ${chalk.cyan(expected)}. Aborting.`,
    {
      code: Codes.NotConfirmed,
      exit: 1,
      suggestions: ["check value supplied to 'confirm' flag and try again."],
    })
}

export const eTokenFileFormat = {
  message: 'Unable to parse access token.',
  options: {
    code: Codes.TokenFileFormat,
    exit: 1,
    suggestions: [
      'Retrieve your access token using "mix auth".',
      'File .mix-token should contain access token JSON data.',
    ],
  },
}

export const eTokenFileNotFound = {
  message: "Token file not found. Use 'mix auth' to retrieve the access token.",
  options: {
    code: Codes.TokenFileNotFound,
    exit: 1,
    suggestions: [
      'Retrieve your access token using "mix auth" before using other mix-cli commands.',
      'File .mix-token must exist and contain access token JSON data.',
    ],
  },
}

export const eUnauthorized = (message?: string | null) => {
  return new MixCLIError(
    message ?? 'Unauthorized request.',
    {
      code: Codes.Unauthorized,
      exit: authProblemExitCode,
      suggestions: [
        'Your access token may have expired; renew it and retry.',
        `You may be trying to access data you do not have access to
  so verify the values you passed to the command flags.`,
      ],
    })
}

export const eUnexpectedStatus = (status: number, message: string) => {
  return new MixCLIError(
    `Backend returned status code ${status}${message ? ', message: ' + message : ''}.`,
    {
      code: Codes.UnexpectedStatus,
      exit: 1,
      suggestions: [
        'Run the command again prefixed with "DEBUG=*" to see debug logs',
        'Try the command later, or',
        'Report the error to technical support.',
      ],
    })
}
