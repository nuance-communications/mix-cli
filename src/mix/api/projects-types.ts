/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {Expand} from './shared-types'

/** @hidden */
export type ProjectsGetPathParams = {
  projectId: string
}

/** @hidden */
export type ProjectsGetParams = Expand<ProjectsGetPathParams>

/** @hidden */
export type ProjectsBuildPathParams = {
  /** ID of the project to build. */
  projectId: string
}

/** @hidden */
export type ProjectsBuildBodyParams = {

  /**
   * Build types to include.
   *
   * - nlu: NLU build
   * - asr: ASR build
   * - dialog: Dialog build
   */
  buildTypes: string[]

  /** Locales to include in build. */
  locales: string[]

  /**
   * NLU Model Type to use in build, if NLU build is requested.
   *
   * - FAST
   * - ACCURATE
   */
  nluModelType?: string

  /** Notes to include with the build. */
  notes?: string
}

/** @hidden */
export type ProjectsBuildParams = Expand<ProjectsBuildPathParams & ProjectsBuildBodyParams>

/** @hidden */
export type ProjectsConfigurePathParams = {
  /** ID of the project to configure. */
  projectId: string
}

/** @hidden */
export type ProjectsConfigureBodyParams = {
  /** Locale to update. */
  locale: string,

  /** New version to update to. */
  version: string
}

/** @hidden */
export type ProjectsConfigureParams = Expand<ProjectsConfigurePathParams & ProjectsConfigureBodyParams>

/** @hidden */
export type ProjectsCreatePathParams = {
  /** ID of the organization under which the project will be created. */
  orgId: string
}

/** @hidden */
export type ProjectsCreateBodyParams = {

  /** Channels to create the project with. */
  channels: string[]

  /** Name of the project. */
  displayName: string

  /** ID of engine pack to create the project with. */
  enginePackId: string

  /** Compliant with Nuance’s Child Data Policy when set to "YES". */
  isChildDataCompliant: string

  /** Locales with which to create the project. */
  languages: string[]

  /** Language topic with which to create the project. */
  languageTopic: string

  /** Modes associated to channels. Follow same order used for channels. */
  modes: string[]

  /** ID of the organization under which the project will be created. */
  orgId: string

  /** Description of the project. Must be filled for to comply with Nuance’s Child Data Policy. */
  projectDescription: string
}

/** @hidden */
export type ProjectsCreateParams = Expand<ProjectsCreatePathParams & ProjectsCreateBodyParams>

/** @hidden */
export type ProjectsListPathParams = {
  /** ID of the organization for which to get the list of projects. */
  orgId: string
}

/** @hidden */
export type ProjectsListParams = Expand<ProjectsListPathParams>

/** @hidden */
export type ProjectsRenamePathParams = {
  /** ID of the project to rename. */
  projectId: string
}

/** @hidden */
export type ProjectsRenameBodyParams = {
  /** New project name. */
  displayName: string
}

/** @hidden */
export type ProjectsRenameParams = Expand<ProjectsRenamePathParams & ProjectsRenameBodyParams>

/** @hidden */
export type ProjectsReplacePathParams =  {
  /** ID of project to replace. */
  projectId: string
}

/** @hidden */
export type ProjectsReplaceBodyParams =  {
  /** Path to zip file of the project content to replace. */
  filePath: string
}

/** @hidden */
export type ProjectsReplaceParams = Expand<ProjectsReplacePathParams & ProjectsReplaceBodyParams>

/** @hidden */
export type ProjectsParams =
  | ProjectsGetParams
  | ProjectsBuildParams
  | ProjectsConfigureParams
  | ProjectsCreateParams
  | ProjectsListParams
  | ProjectsRenameParams
  | ProjectsReplaceParams
