/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {Expand} from './shared-types'

/** @hidden */
export type LiteralsExportPathParams = {
  /** Case-sensitive name of the entity for which to export literal-value pairs. */
  entityName: string,

  /** ID of project for which to export literal-value pairs. */
  projectId: string
}

/** @hidden */
export type LiteralsExportSearchParams = {
  /** List of locales for which to export literal-value pairs.  */
  locales: string[]
}

/** @hidden */
export type LiteralsExportParams = Expand<LiteralsExportPathParams & LiteralsExportSearchParams>

/** @hidden */
export type LiteralsImportPathParams = {
  /** Case-sensitive name of the entity to import the literal-value pairs into */
  entityName: string,

  /** ID of project to import literal-value pairs into. */
  projectId: string
}

/** @hidden */
export type LiteralsImportSearchParams = {
  /** Locale into which the literal-value pairs will be imported. */
  locale: string
}

/** @hidden */
export type LiteralsImportFileParams = {
  /** Entity literals content file. Can be .trsx, .nmlist or .list. */
  filePath: string
}

/** @hidden */
export type LiteralsImportParams = Expand<LiteralsImportPathParams & LiteralsImportSearchParams & LiteralsImportFileParams>

/** @hidden */
export type LiteralsParams = LiteralsExportParams | LiteralsImportParams

/** @hidden */
export type LiteralsSearchParams = LiteralsExportSearchParams | LiteralsImportSearchParams
