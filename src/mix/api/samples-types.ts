/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {Expand} from './shared-types'

/** @hidden */
export type SamplesExportPathParams = {
  /** Case-sensitive name of intent for which to export the samples. */
  intentName: string,

  /** ID of project for which to export the intent samples. */
  projectId: string
}

/** @hidden */
export type SamplesExportSearchParams = {
  /** List of locales for which to export the samples. */
  locales: string[]
}

/** @hidden */
export type SamplesExportParams = Expand<SamplesExportPathParams & SamplesExportSearchParams>

/** @hidden */
export type SamplesImportPathParams = {
  /** Case-sensitive name of intent for which to import the samples. */
  intentName: string,

  /** ID of project to import the samples into. */
  projectId: string
}

/** @hidden */
export type SamplesImportSearchParams = {
  /** Locale for which the samples will be imported. */
  locale: string
}

/** @hidden */
export type SamplesImportBodyParams = {
  /** Path to the samples content file. Can be .trsx or .txt. */
  filePath: string
}

/** @hidden */
export type SamplesImportParams = Expand<SamplesImportPathParams & SamplesImportSearchParams & SamplesImportBodyParams>

/** @hidden */
export type SamplesParams = SamplesExportParams | SamplesImportParams

/** @hidden */
export type SamplesSearchParams = SamplesExportSearchParams | SamplesImportSearchParams
