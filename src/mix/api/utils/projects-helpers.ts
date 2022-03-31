/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import makeDebug from 'debug'
import {channelColors} from './channel-colors'

const debug = makeDebug.debug('mix:utils:projects-helpers')
interface ModesMap {
  [key: string]: string;
}

const modesMap: ModesMap = {
  audioscript: 'AUDIO_SCRIPT',
  dtmf: 'DTMF',
  interactivity: 'INTERACTIVITY',
  richtext: 'RICH_TEXT',
  tts: 'TTS',
}

export function getMappedMode(mode: string): string|undefined {
  debug('getMappedMode()')
  return modesMap[mode] ?? undefined
}

export function getBackendModes(modes: string): string[] {
  debug('getBackendModes()')
  const backendModes = modes.split(',').map(m => {
    const backendMode = getMappedMode(m)
    if (typeof backendMode === 'undefined') {
      throw (new TypeError(`invalid value for mode: ${m}`))
    }

    return backendMode
  })

  return backendModes
}

export function buildProjectsBuildBody(params: any): any {
  debug('buildProjectsBuildBody()')
  const {buildTypes, locales, notes, nluModelType} = params

  const asr = {
    asr:
      {
        notes: notes ? notes : '',
      },
  }

  const nlu = {
    nlu:
    {
      notes: notes ? notes : '',
      settings: {
        modelType: nluModelType ? nluModelType.toUpperCase() : '', // endpoint needs uppercased
      },
    },
  }

  const dialog = {
    dialog:
    {
      notes: notes ? notes : '',
    },
  }

  const body = {
    locales,
    ...(buildTypes.includes('asr') && asr),
    ...(buildTypes.includes('nlu') && nlu),
    ...(buildTypes.includes('dialog') && dialog),
  }

  return body
}

// Build request body for the backend call to create project
export function buildProjectsCreateBody(params: any): any {
  debug('buildProjectsCreateBody()')
  if (params?.channels.length !== params?.modes.length) {
    throw (new Error('channels and of lists of modes are mismatched'))
  }

  // COLOR_UNSPECIFIED is not permissible as a color
  // on v4 yet, as there are no default values in place.
  const acceptableColors = channelColors.slice(1)

  const body = {
    displayName: params.displayName,
    languages: params.languages,
    languageTopic: params.languageTopic,
    channels: params?.channels.map((channel: string, i: number) => ({
      displayName: channel,
      color: acceptableColors[i % acceptableColors.length],
      modes: getBackendModes(params.modes[i]),
    })),
    ...(params.enginePackId ? {enginePackId: params.enginePackId} : {}),
    isChildDataCompliant: params.isChildDataCompliant ? 'YES' : 'NO',
    projectDescription: params.projectDescription,
  }

  debug('projects:create request body: %s', JSON.stringify(body))

  return body
}

