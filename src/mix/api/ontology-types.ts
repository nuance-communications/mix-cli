/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {Expand} from './shared-types'

/** @hidden */
export type OntologyExportPathParams = {
  /** ID of project for which to export the ontology. */
  projectId: string
}

/** @hidden */
export type OntologyExportSearchParams = {
  /** List of locales for which to export the ontology. */
  locales: string[]
}

/** @hidden */
export type OntologyExportParams = Expand<OntologyExportPathParams & OntologyExportSearchParams>

/** @hidden */
export type OntologyImportPathParams = {
  /** Zip file of the ontology content to append. */
  filePath: string,

  /** ID of project to append the ontology to. */
  projectId: string
}

/** @hidden */
export type OntologyImportParams = Expand<OntologyImportPathParams>

/** @hidden */
export type OntologyParams = OntologyExportParams | OntologyImportParams

/** @hidden */
export type OntologySearchParams = OntologyExportSearchParams
