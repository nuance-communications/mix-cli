/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import chalk from 'chalk'
import makeDebug from 'debug'
import {z} from 'zod'
import {ChannelModalities} from '../mix/api/channels-types'
import {channelColors} from '../mix/api/utils/channel-colors'

import {eInvalidValue, eMissingParameter} from './errors'

export type DomainOption =
  | 'build-label'
  | 'build-version'
  | 'config'
  | 'data-pack'
  | 'deployment-flow'
  | 'env-geo'
  | 'env-geo[]'
  | 'job'
  | 'limit'
  | 'locale'
  | 'locale[]'
  | 'mix-app'
  | 'offset'
  | 'organization'
  | 'project'
  | 'with-locale'

const debug = makeDebug('mix:utils:validations')

const buildLabelRegEx = /^(ASR|DIALOG|NLU)(?:_[1-9]\d*){2}$/
const dataPackRegEx = /^[a-z]{2}-[A-Z]{2}@[1-9]\d*\.\d+\.\d+$/
const localeRegEx = /^[a-z]{2}-[A-Z]{2}$/

const validationSchemes = {
  'build-label': z.string().regex(buildLabelRegEx, {
    message: `Expected flag 'build-label' to match ${buildLabelRegEx}`}),
  'build-version': z.number().positive({
    message: "Expected flag 'build-version' to have a value greater than 0"}),
  config: z.number().positive({
    message: "Expected flag 'config' to have a value greater than 0"}),
  'data-pack': z.string().regex(dataPackRegEx, {
    message: `Expected flag 'data-pack' to match ${dataPackRegEx}`}),
  'deployment-flow': z.number().positive({
    message: "Expected flag 'deployment-flow' to have a value greater than 0"}),
  'env-geo': z.number().positive({
    message: "Expected flag 'env-geo' to have a value greater than 0"}),
  'env-geo[]': z.number().positive({
    message: "Expected each env-geo in flag 'env-geo' to have a value greater than 0"}).array(),
  job: z.string().uuid({
    message: "Expected flag 'job' to have UUID format"}),
  limit: z.number().positive({
    message: "Expected flag 'limit' to have a value greater than 0"}),
  locale: z.string().regex(localeRegEx, {
    message: `Expected flag 'locale' to match ${localeRegEx}`}),
  'locale[]': z.string().regex(localeRegEx, {
    message: `Expected each locale in flag 'locale' to match ${localeRegEx}`}).array(),
  'mix-app': z.number().positive({
    message: "Expected flag 'mix-app' to have a value greater than 0"}),
  offset: z.number().nonnegative({
    message: "Expected flag 'offset' to have a value greater than or equal to 0"}),
  organization: z.number().positive({
    message: "Expected flag 'organization' to have a value greater than 0"}),
  project: z.number().positive({
    message: "Expected flag 'project' to have a value greater than 0"}),
  'with-locale': z.string().regex(localeRegEx, {
    message: `Expected each locale in flag 'with-locale' to match ${localeRegEx}`}).array(),
}

export function validateChannelModeOptions(modes: string[]): void {
  debug('validateChannelModeOptions()')

  const adjustedModes: string[] = modes?.map((mode: string) =>
    mode.toLowerCase().replace(/[_-]/, ''))

  // Check if all modes are valid and appear exactly once
  const modesSeen = Object.fromEntries(Object.keys(ChannelModalities).map((mode: string) => [mode, false]))

  for (const [i, mode] of adjustedModes.entries()) {
    debug('mode: %s', mode)
    if (!(mode in modesSeen)) {
      debug('mode name is not valid')
      throw (eInvalidValue(`Unknown channel mode ${chalk.red(modes[i])} supplied to command.`, [
        `Ensure all --mode flags are one of ${Object.keys(ChannelModalities).sort().join('|')}.`,
      ]))
    } else if (modesSeen[mode]) {
      debug('mode name is duplicate (already seen)')
      throw (eInvalidValue(`Mode ${chalk.red(modes[i])} was supplied more than once.`, [
        'Ensure all values of --mode flags are unique.',
      ]))
    }

    modesSeen[mode] = true
    debug('mode %s is good (%o)', mode, modesSeen)
  }
}

export function validateChannelColor(color: string): void {
  debug('validateChannelColor()')

  // excluding COLOR_UNSPECIFIED
  const allColors = channelColors.slice(1).sort()

  const adjustedColor = color?.toUpperCase().replace('-', '_')

  if (!allColors.includes(adjustedColor)) {
    throw (eInvalidValue(`Unknown channel color ${chalk.red(color)} supplied to command.`, [
      `Ensure value of --color flag is one of:\n${allColors.join('\n')}`,
    ]))
  }
}

export function validateDomainOptions(options: any, validations: Array<DomainOption>): void {
  debug('validateDomainOptions()')
  for (const validation of validations) {
    // some options, like 'locale' sometimes take a single value and
    // multiple values other times, using the same option name.
    // The array variant is specified by suffixing '[]' to the validation name.
    // We remove the '[]' suffix to find the correct option value
    const key = validation.replace('[]', '')
    const value = options[key]

    if (typeof value === 'undefined') {
      debug('skipping optional key:%s', validation)
      continue
    }

    debug(`validating key:${validation} with value:${value}`)
    const scheme = validationSchemes[validation]

    if (!scheme) continue

    scheme.parse(value)
  }
}

export function validateRegexEntityParams(
  locale: string|undefined,
  pattern: string|undefined,
  isLocaleIgnored = false) {
  debug('validateRegexEntityParams()')

  if (!isLocaleIgnored && (pattern === undefined || locale === undefined)) {
    throw (eMissingParameter('Regex entities require a pattern and a locale.', [
      'Use --pattern to provide the required regular expression.',
      'Use --locale to provide the locale for which the regular expression applies.',
    ]))
  }

  if (isLocaleIgnored && pattern === undefined) {
    throw (eMissingParameter('Converting to a Regex entity requires a pattern.', [
      'use --pattern to provide the required regular expression.',
    ]))
  }
}

export function validateRuleBasedEntityParams(hasA: string[]|undefined, isA: string|undefined) {
  debug('validateRuleBasedEntityParams()')

  if (hasA === undefined && isA === undefined) {
    throw (eMissingParameter('Relational entities require has-a and/or is-a relation.', [
      'use the --has-a and/or --is-a flags to provide the required relation.',
    ]))
  }
}
