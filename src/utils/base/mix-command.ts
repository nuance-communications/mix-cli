/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import makeDebug from 'debug'
import chalk from 'chalk'
import {CliUx} from '@oclif/core'
import {FlagOutput} from '@oclif/core/lib/interfaces'
import {Input} from '@oclif/core/lib/interfaces'
import {table} from '@oclif/core/lib/cli-ux/styled/table'
import YAML from 'yaml'

import * as JobsAPI from '../../mix/api/jobs'
import {asValueOrNA} from '../format'
import BaseCommand from './base-command'
import {Config} from '../config'
import {configurationProblemExitCode} from '../constants'
import {Confirmation} from '../types'
import {downloadFile} from '../download-file'
import {validateDomainOptions, DomainOption} from '../validations'
import {pluralize as s} from '../../utils/format'

import {
  ConnectionError,
  MixClient,
  MixError,
  MixRequestParams,
  MixResponse,
  MixResult} from '../../mix/types'

import {
  eConflict,
  eDownloadFailed,
  eException,
  eForbidden,
  eInvalidColumn,
  eInvalidValue,
  eNotConfirmed,
  eNotFound,
  eUnauthorized,
  eUnexpectedStatus,
  MixCLIError} from '../errors'

import {createMixClient} from '../../mix/client'
import {OutputFormat} from '../types'
import {saveFile} from '../save-file'

export type Columns = table.Columns<Record<string, unknown>>

const DEFAULT_FILEPATH = 'outputfile'
const WATCH_JOB_WAIT_TIME_MS = 10 * 1000

const debug = makeDebug.debug('mix:base:mix-command')

export default abstract class MixCommand extends BaseCommand {
  // The command is an action that may need to be confirmed.
  // Provide a relevant action in actual command classes.
  action = ''
  client: MixClient | undefined
  context = new Map()
  options: Partial<FlagOutput> = {}
  requestActionMessage = 'Fetching'
  requestCompleteMessage = chalk.green('OK')
  selectedFormat: OutputFormat = 'human-readable'
  shouldConfirmCommand = false
  shouldDownloadFile = false
  shouldSaveBody = false;
  shouldWatchJob = false
  tries = 0

  abstract doRequest(client: MixClient, params: MixRequestParams): Promise<MixResponse> | void

  async run() {
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

    await this.captureOptions()
    debug('this.options: %O', this.options)

    const options = {
      authFlow: this.mixCLIConfig?.authFlow ?? '',
      userAgent: this.config.userAgent,
      server: this.mixCLIConfig?.apiServer ?? '',
    }

    await this.doAuth()
    this.client = createMixClient(options)
    this.client.setToken(this.accessToken?.access_token)

    this.shouldWatchJob = this.options.watch ?? false
    this.captureOutputFormat(this.options)
    this.tryDomainOptionsValidation(this.options, this.domainOptions)
    this.setRequestActionMessage(this.options)
    const requestParams = await this.buildRequestParameters(this.options)
    debug('requestParams: %O', requestParams)

    if (this.shouldConfirmCommand) {
      const isActionConfirmed = await this.obtainActionConfirmation(this.action,
        this.expectedConfirmationValue!)

      if (!isActionConfirmed) {
        this.log('Operation was not confirmed. Aborting...')
        return
      }

      debug(`Confirmation acquired. Starting import from ${this.constructor.name}`)
    }

    CliUx.ux.action.start(this.requestActionMessage)

    const response = await this.doSafeRequest(this.client, requestParams)
    await this.handleResponse(response)

    if (!this.options.json && !this.options.csv && !this.options.yaml) {
      this.log(`Command executed against ${chalk.green(this.mixCLIConfig?.currentSystem)} Mix system.`)
    }
  }

  // ------------------------------------------------------------------------
  /** Options treatment
   * Explanation:
   * When creating an oclif command that needs to
   * parse/validate its flag inputs, you normally need to pass in
   * the name of the command class as an argument to `this.parse`
   * (e.g., `const {flags} = this.parse(SampleCommand)`).
   * In JS, this classname is little more than a reference to a
   * constructor, a function which also possesses an attribute
   * called `name`, which can be accessed generically using
   * `this.constructor` in a superclass. This behaviour is
   * guaranteed on all non-null objects.
   */

  async captureOptions(): Promise<void> {
    debug('captureOptions()')
    const options = this.constructor as Input<MixCommand, MixCommand>
    const {flags} = await this.parse(options)

    this.options = flags
  }

  captureOutputFormat(options: Partial<FlagOutput>): void {
    debug('captureOutputFormat()')
    const {csv, json, output = 'human-readable', yaml} = options
    if (csv) {
      this.selectedFormat = 'csv'
    } else if (json) {
      this.selectedFormat = 'json'
    } else if (yaml) {
      this.selectedFormat = 'yaml'
    } else {
      const outputFormats = new Set<OutputFormat>(['csv', 'human-readable', 'json', 'yaml'])
      this.selectedFormat = outputFormats.has(output as OutputFormat) ? output as OutputFormat : 'human-readable'
    }
  }

  // must be implemented in actual command
  get domainOptions(): DomainOption[] {
    return []
  }

  // ------------------------------------------------------------------------
  // Validation
  //
  tryDomainOptionsValidation(options: any, domainOptions: DomainOption[]) {
    debug('tryDomainOptionsValidation()')
    try {
      validateDomainOptions(options, domainOptions)
    } catch (error) {
      debug('validation error object: %O', error)
      debug('validation error: %s', error?.issues[0]?.message)
      this.error(error?.issues[0]?.message)
    }
  }

  // ------------------------------------------------------------------------
  // Command setup
  //
  get columns() {
    debug('get columns()')
    return {}
  }

  setRequestActionMessage(_options: any) {
    debug('setRequestActionMessage()')
    this.requestActionMessage = 'Fetching' // default
  }

  // ------------------------------------------------------------------------
  // Endpoint request setup
  //
  abstract buildRequestParameters(options: Partial<FlagOutput>): Promise<MixRequestParams>

  get headers() {
    debug('get headers()')
    return {
      Authorization: `Bearer ${this.accessToken?.access_token}`,
      'User-Agent': this.config.userAgent,
    }
  }

  // ------------------------------------------------------------------------
  // Confirmation treatment
  //
  checkPreConfirmation(preConfirmationValue: string): void {
    debug('checkPreConfirmation()')
    if (preConfirmationValue !== this.expectedConfirmationValue) {
      throw eNotConfirmed(preConfirmationValue, this.expectedConfirmationValue!)
    }
  }

  // Confirmable commands need to provide their own implementation
  get expectedConfirmationValue(): Confirmation {
    debug('getExpectedConfirmationValue()')
    return null
  }

  async doInteractiveConfirmation(action: string, expectedConfirmationValue: string) {
    debug('doInteractiveConfirmation()')
    this.log()
    this.warnBeforeConfirmation()
    this.log()
    const answer = await CliUx.ux.prompt(`Confirm ${action} action by typing ${chalk.red(expectedConfirmationValue)} ('no' to abort)`)

    // Treat 'no' answer first as to not confuse it with, say, a project named 'no'
    if (answer === 'no') {
      return false
    }

    if (answer !== this.expectedConfirmationValue) {
      return false
    }

    return true
  }

  async obtainActionConfirmation(action: string, expectedConfirmationValue: string): Promise<boolean> {
    debug('obtainActionConfirmation()')
    // Only happens if expectedConfirmationValue is not implemented in command
    if (expectedConfirmationValue === null) {
      throw eException('Internal error: expected confirmation value is null')
    }

    const preConfirmationValue: string = this.options.confirm

    if (preConfirmationValue) {
      this.checkPreConfirmation(preConfirmationValue)
      return true
    }

    const confirmation = await this.doInteractiveConfirmation(action, expectedConfirmationValue)
    return confirmation
  }

  // Implement this method in the actual command class
  // to provide a warning message specific to the command.
  warnBeforeConfirmation() {
    debug('warnBeforeConfirmation()')
    this.warn(chalk.yellow('This command is a destructive operation.'))
  }

  // ------------------------------------------------------------------------
  // Endpoint request
  //
  doSafeRequest(client: MixClient|undefined, params: MixRequestParams, requestFunc?: any): Promise<MixResponse> {
    debug('doSafeRequest()')
    const doRequest = requestFunc ?? this.doRequest.bind(this)

    if (client) {
      debug(`Starting request from ${this.constructor.name}`)
      return doRequest(client, params)
    }

    const connectionError: ConnectionError = {
      _state: 'connectionFailure',
      code: 'ENOCLIENT',
      message: 'Internal error: client undefined',
    }

    return Promise.resolve(connectionError)
  }

  // ------------------------------------------------------------------------
  // Endpoint response processing
  //
  handleError(error: MixError) {
    debug('handleError() error.statusCode: %d', error.statusCode)

    CliUx.ux.action.stop(chalk.red('Failed'))
    switch (error.statusCode) {
      case 400: throw eInvalidValue(error.message)
      case 401: throw eUnauthorized(error.message)
      case 403: throw eForbidden(error.message)
      case 404: throw eNotFound(error.message)
      case 409: throw eConflict(error.message)
      default: throw eUnexpectedStatus(error.statusCode, error.message)
    }
  }

  async handleResponse(response: MixResponse) {
    debug('handleResponse()')
    switch (response._state) {
      case 'success': {
        const result = response as MixResult
        const data: any = result.data
        const {id: jobId, projectId, status} = data

        if (this.shouldWatchJob &&
          !['COMPLETED', 'PARTIALLY_COMPLETED'].includes(status)) {
          await this.watchJob(jobId, projectId)
        } else {
          CliUx.ux.action.stop(this.requestCompleteMessage)
          await this.handleSuccess(response)
        }

        break
      }

      case 'connectionFailure':
        throw eException(
          response.message,
          ['Verify the value for apiServer in your configuration file.',
            'Verify Mix platform status at https://status.mix.nuance.com.'])

      case 'mixFailure':
        this.handleError(response)
        break
    }
  }

  async handleSuccess(result: MixResult) {
    debug('handleSuccess()')
    if (this.shouldDownloadFile) {
      try {
        await downloadFile(result, this.filepath, this.options.overwrite)
      } catch (error) {
        throw eDownloadFailed(error instanceof Error ? error.message : '')
      }

      CliUx.ux.action.stop(this.requestCompleteMessage)
    } else if (this.shouldSaveBody) {
      try {
        await saveFile(result, this.filepath, this.options.overwrite)
      } catch (error) {
        throw eDownloadFailed(error instanceof Error ? error.message : '')
      }

      CliUx.ux.action.stop(this.requestCompleteMessage)
    }

    this.output(result as MixResult, this.options)
  }

  // Actual command to override this and provide filepath or relevant default
  get filepath(): string {
    debug('get filepath()')
    return DEFAULT_FILEPATH
  }

  // Called to transform reponse data before handing it over to outputHumanReadable().
  // The default is simply to return the actual data in the MixResult
  transformResponse(result: MixResult): any {
    debug('transformResponse()')
    return result.data
  }

  // ------------------------------------------------------------------------
  // Output to user
  //
  output(result: MixResult, options: Partial<FlagOutput>) {
    debug('output() with format %s', this.selectedFormat)
    switch (this.selectedFormat) {
      case 'csv':
        this.outputCSV(this.transformResponse(result))
        break

      case 'human-readable':
        this.outputHumanReadable(this.transformResponse(result), options)
        break

      case 'json':
        this.outputJSON(result)
        break

      case 'yaml':
        this.outputYAML(result)
        break
    }
  }

  outputAsKeyValuePairs(transformedData: any, columns: Columns, skipNA = false): void {
    debug('outputAsKeyValuePairs()')
    for (const key of Object.keys(columns)) {
      if (transformedData[key] === undefined && skipNA) {
        // skip key-value pairs with undefined value to avoid cluttering the output
        continue
      }

      const col = columns[key]

      this.log(`${chalk.bold(col.header)}: ${asValueOrNA(key, transformedData[key])}`)
    }
  }

  validateColumns(columns: Columns): boolean {
    debug('validateColumns() %o', Object.keys(columns))
    const {columns: columnNames} = this.options
    if (columnNames) {
      for (const columnName of columnNames.split(',')) {
        if (!Object.keys(columns).map(key => columns[key].header).includes(columnName)) {
          this.error(eInvalidColumn(`${columnName} is not valid column name`))
        }
      }
    }

    return true
  }

  outputCLITable(transformedData: any, columns: Columns) {
    debug('outputCLITable()')
    if (!this.validateColumns(columns)) {
      return
    }

    // CliUx.ux.table() expects an array so turn transformedData into array
    // if passed a standalone record
    const result = Array.isArray(transformedData) ? transformedData : [transformedData]
    CliUx.ux.table(result, columns, this.options)
  }

  explainAbsenceOfResult(options: Partial<FlagOutput>) {
    debug('explainAbsenceOfResult()')

    if (options.offset && this.context.get('offset') >=  this.context.get('totalSize')) {
      this.log()
      this.log(`No result to display as value ${this.context.get('offset')} for offset lies outside the range of the list of items.`)
      this.log(`Use a value lower than ${this.context.get('totalSize')} for offset.`)
    } else {
      this.log(`No ${this.context?.get('topic')} found.`)
    }
  }

  outputPartialListCount() {
    debug('outputPartialListCount()')

    if (this.options.filter) return

    const count = this.context.get('count')
    const offset = this.context.get('offset')
    const totalSize = this.context.get('totalSize')

    const resultInformation = count > 1 ?
      `${chalk.cyan(offset + 1)}-${chalk.cyan(offset + count)}` :
      chalk.cyan(count + offset)

    if (count > 0) {
      this.log()
      this.log(`Item${s(count)} ${resultInformation} of ${chalk.cyan(totalSize)} shown.`)
      if ((this.context?.get('totalSize') ?? 0) >= (this.context?.get('count') ?? 1)) {
        this.log(`Use the ${chalk.cyan("'limit'")} and ${chalk.cyan("'offset'")} flags to view other parts of the list.`)
      }
    }
  }

  // No default implementation as not all commands can offer meaningful CSV output
  outputCSV(transformedData: any) {
    debug('outputCSV()')
    this.outputCLITable(transformedData, this.columns)
  }

  // Every command offers human-readable output
  outputHumanReadable(transformedData: any, options: Partial<FlagOutput>) {
    debug('outputHumanReadable()')

    if (this.context.get('count') > 0) {
      this.outputCLITable(transformedData, this.columns)
    } else {
      this.explainAbsenceOfResult(options)
    }

    if (this.context.has('totalSize') && this.context.has('offset') && this.context.has('count')) {
      this.outputPartialListCount()
    }
  }

  // default implementation here even though some commands do not offer JSON/YAML output
  outputJSON(result: MixResult): void {
    debug('outputJSON()')
    this.log(JSON.stringify(result.data, null, 2))
  }

  outputYAML(result: MixResult): void {
    debug('outputYAML()')
    this.log(YAML.stringify(result.data))
  }

  // ------------------------------------------------------------------------
  // Watchable commands
  //
  async watchJob(jobId: string, projectId: string) {
    debug('watchJob()')

    await CliUx.ux.wait(WATCH_JOB_WAIT_TIME_MS)
    await this.doAuth()
    this.client?.setToken(this.accessToken?.access_token)
    const response = await this.doSafeRequest(this.client, {jobId, projectId}, JobsAPI.getJob)
    const result = response as MixResult
    const resultData: any = result?.data ?? {}
    debug('resultData: %O', resultData)
    const {status} = resultData

    switch (status) {
      case 'COMPLETED':
        debug('status COMPLETED')
        CliUx.ux.action.stop(chalk.green(status))
        this.shouldWatchJob = false
        break

      case 'PARTIALLY_COMPLETED':
        debug('status PARTIALLY_COMPLETED')
        CliUx.ux.action.stop(chalk.green(status))
        this.shouldWatchJob = false
        break

      case 'RUNNING':
        debug('status RUNNING')
        CliUx.ux.action.status = status
        this.shouldWatchJob = true
        break

      case 'FAILED':
        debug('status FAILED')
        this.shouldWatchJob = false
        break

      default:
        // mixFailure, connectionFailure and unexpected states are treated the same
        debug('applying default for status %s', status)
        CliUx.ux.action.stop(chalk.red('Failed to retrieve job details. Please try again.'))
        this.shouldWatchJob = false
        break
    }

    this.handleResponse(response)
  }

  // ------------------------------------------------------------------------
  // Command-wide exception handling
  //
  async catch(error: MixCLIError) {
    debug('catch() caught MixCLIError %O', error)
    this.error(error.message, error.options)
  }
}
