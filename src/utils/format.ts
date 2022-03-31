/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {BuildType} from './types'

export function asBuildLabel(buildType: BuildType, project: string, buildVersion: number) {
  return `${buildType.toUpperCase()}_${project}_${buildVersion}`
}

export function asChannelsList({channels}: any) {
  return channels
    .map(({channel}: any) => channel.displayName)
    .sort((a: string, b: string) => a.localeCompare(b))
    .join(',')
}

export function asDataPackslist({datapacks}: any) {
  return datapacks
    .map(({displayName, version}: any) => `${displayName}@${version}`)
    .sort((a: string, b: string) => a.localeCompare(b))
    .join(',')
}

export function asGeographiesList({geographies}: any) {
  return geographies
    .map(({geography}: any) => geography.displayName)
    .sort((a: string, b: string) => a.localeCompare(b))
    .join(',')
}

export function asLocalesList({locales}: any) {
  return locales
    .map(({locale}: any) => `${locale}`)
    .sort((a: string, b: string) => a.localeCompare(b))
    .join('\n')
}

export function asVersionsList({locales}: any) {
  return locales
    .map(({versions}: any) => `${versions.join(', ')}`)
    .sort((a: string, b: string) => a.localeCompare(b))
    .join('\n')
}

// Coverts the seconds time into min and sec
export function asMinutesAndSeconds(sec: string) {
  const portions: string[] = []
  let duration = Number(sec.replace('s', '').trim())
  const minutes = Math.trunc(duration / 60)
  if (minutes > 0) {
    portions.push(minutes + 'm')
    duration -= (minutes * 60)
  }

  const seconds = Math.trunc(duration)
  if (seconds >= 0) {
    portions.push(seconds + 's')
  }

  return portions.join(' ')
}

export function asModesList({modes}: any) {
  return modes
    .map((mode: string) => mode.toLowerCase())
    .sort((a: string, b: string) => a.localeCompare(b))
    .join(',')
}

export function asValueOrNA(key: string, value: any): string {
  if (typeof value === 'undefined' || value === '') {
    return 'n/a'
  }

  let formattedValue

  switch (key) {
    case 'datapack':
      formattedValue = `${value.displayName}@${value.version}`
      break

    case 'duration':
      formattedValue = asMinutesAndSeconds(value)
      break

    default:
      formattedValue = value
  }

  return formattedValue
}

export function pluralize(count: number, singularSuffix = '', pluralSuffix = 's') {
  return count > 1 ? pluralSuffix : singularSuffix
}

export function wasWere(count: number) {
  return count > 1 ? 'were' : 'was'
}
