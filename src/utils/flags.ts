/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {Flags} from '@oclif/core'

import {
  AnaphoraDefault,
  Anaphoras,
  DataTypeDefault,
  DataTypes,
  Entities,
} from '../mix/types'

// We keep all flag descriptions in a single place to encourage consistency of
// flags across commands.
// Readability in the commands code is not affected if Flags are named properly.

// Flag shortcuts that should not be reused
export const appConfigurationShortcut = 'C'
export const botShortcut = 'B'
export const deploymentFlowIDShortcut = 'D'
export const entityNameShortcut = 'E'
export const intentNameShortcut = 'I'
export const filePathShortucut = 'f'
export const jobIDShortcut = 'J'
export const localeShortcut = 'L'
export const mixApplicationShortcut = 'M'
export const organizationIDShortcut = 'O'
export const projectShortcut = 'P'
export const runtimeApplicationIDShortcut = 'R'
export const userShortcut = 'U'
export const tagShortcut = 'T'

// Environment variables used as default
export const localeEnvVarDefault = 'MIX_LOCALE'
export const organizationEnvVarDefault = 'MIX_ORGANIZATION'
export const projectEnvVarDefault = 'MIX_PROJECT'

// Flag descriptions
export const botIDDesc = 'Bot ID'
export const buildLabelDesc = 'build label (format is <buildType>_<projectId>_<buildVersion>)'
export const buildTypeDesc = 'build type'
export const buildVersionDesc = 'build version'
export const childDataCompliantDesc = 'marks projects as being child-data compliant'
export const deploymentFlowDesc = 'deployment flow ID'
export const envGeoIDDesc = 'environment-geography ID'
export const geoNameDesc = 'geography name'
export const localeDesc = "locale code; use format 'aa-AA'"
export const localeDescWithDefault = `locale code; use format 'aa-AA' (defaults to ${localeEnvVarDefault})`
export const mixApplicationIDDesc = 'Mix application ID'
export const noProjectInfoDesc = 'omit project details in table mode'
export const noChannelsDesc = 'omit channel details in table mode'
export const noDataPacksDesc = 'omit data pack details in table mode'
export const omitOverriddenDesc = 'omit application configurations that are overridden'
export const projectDesc = 'project ID'
export const projectDescriptionDesc = 'project description (for child data compliance)'
export const projectDescWithDefault = `project ID (defaults to ${projectEnvVarDefault})`
export const userDesc = 'user ID'

// Flag options
export const buildTypeOptions = ['asr', 'dialog', 'nlu']

// Flag helpers
export const ignoreDefault = <T>(flag: T): T => ({
  ...flag,
  default: undefined,
})

export const required = <T>(flag: T): T => ({
  ...flag,
  required: true,
})

// Flag objects
export const anaphoraTypeFlag = Flags.string({
  default: AnaphoraDefault,
  description: 'anaphora type',
  options: Object.keys(Anaphoras).sort(),
})

export const appConfigurationFlag = Flags.integer({
  char: appConfigurationShortcut,
  description: 'application configuration ID',
  required: true,
})

export const buildNotesFlag = Flags.string({
  description: 'notes about the build',
})

export const buildTypeFlag = Flags.string({
  description: buildTypeDesc,
  options: buildTypeOptions,
  required: true,
})

export const channelColorFlag = Flags.string({
  description: 'channel color',
})

export const channelFlag = Flags.string({
  char: 'C',
  description: 'channel ID',
})

export const channelMultipleFlag = Flags.string({
  char: 'c',
  description: 'channel',
  multiple: true,
  required: true,
})

export const confirmFlag = Flags.string({
  char: 'c',
  description: 'skip confirmation prompt by pre-supplying value',
})

export const dataTypeFlag = Flags.string({
  default: DataTypeDefault,
  description: 'data type of entity',
  options: Object.keys(DataTypes).sort(),
})

export const deploymentFlowFlag = Flags.integer({
  char: deploymentFlowIDShortcut,
  description: 'deployment flow ID',
  required: true,
})

export const dataPackFlag = Flags.string({
  description: 'data pack name, including version (use aa-AA@x.y.z format)',
  required: true,
})

export const dataPackTopicFlag = Flags.string({
  char: 't',
  description: "data pack topic, e.g. 'gen'",
  required: true,
})

export const dynamicFlag = Flags.boolean({
  default: false,
  description: 'make list entity dynamic',
})

export const enginePackFlag = Flags.string({
  description: 'engine pack ID (UUID format)',
})

export const entityTypeFlag = Flags.string({
  description: 'entity type',
  options: Object.keys(Entities).sort(),
  required: true,
})

export const envGeoIDFlag = Flags.integer({
  description: envGeoIDDesc,
})

export const envGeoIDMultipleFlag = Flags.integer({
  description: envGeoIDDesc,
  multiple: true,
})

export const entityFlag = Flags.string({
  char: entityNameShortcut,
  description: 'entity name',
  required: true,
})

export const entityNameFlag = Flags.string({
  description: 'new entity name',
  required: true,
})

export const excludeChannelsFlag = Flags.boolean({
  description: 'exclude project channels from the list',
  default: false,
})

export const excludeOverridesFlag = Flags.boolean({
  description: 'exclude application configurations that are overridden',
  default: false,
})

export const geoNameFlag = Flags.string({
  description: geoNameDesc,
})

export const hasAFlag = Flags.string({
  description: 'define hasA relationship for relational entity',
  multiple: true,
})

export const includeFeaturesFlag = Flags.boolean({
  description: "include the list of features supported by project's engine pack",
  default: false,
})

export const inputFilePathFlag = Flags.string({
  char: filePathShortucut,
  description: 'input file path',
  required: true,
})

export const intentNameFlag = Flags.string({
  description: 'new intent name',
  required: true,
})

export const intentFlag = Flags.string({
  char: intentNameShortcut,
  description: 'intent name',
  required: true,
})

export const isAFlag = Flags.string({
  description: 'define isA relationship for relational entity',
})

export const jobFlag = Flags.string({
  char: jobIDShortcut,
  description: 'job ID',
  required: true,
})

export const jsonFlag = Flags.boolean({
  default: false,
  description: 'output raw data in JSON format',
  exclusive: ['csv', 'yaml'],
})

export const limitFlag = Flags.integer({
  description: 'limit maximum results returned (defaults to Mix API behavior)',
})

export const liveOnlyFlag = Flags.boolean({
  description: 'include only the application configurations that are currently deployed',
  default: false,
})

export const localeFlag = Flags.string({
  char: localeShortcut,
  description: localeDesc,
  required: true,
})

export const localeWithDefaultFlag = Flags.string({
  char: localeShortcut,
  description: localeDescWithDefault,
  env: localeEnvVarDefault,
  required: true,
})

export const localeMultipleFlag = Flags.string({
  char: localeShortcut,
  description: localeDesc,
  multiple: true,
  required: true,
})

export const localeMultipleWithDefaultFlag = Flags.string({
  char: localeShortcut,
  description: localeDescWithDefault,
  env: localeEnvVarDefault,
  multiple: true,
  required: true,
})

export const projectMetadataOnlyFlag = Flags.boolean({
  default: false,
  description: 'export project metadata JSON file only',
})

export const mixApplicationFlag = Flags.integer({
  char: mixApplicationShortcut,
  description: 'Mix application ID',
  required: true,
})

export const botFlag = Flags.integer({
  char: botShortcut,
  description: 'Bot ID',
  required: true,
})

export const modesFlag = Flags.string({
  char: 'm',
  description: 'channel modes (audioscript|dtmf|interactivity|richtext|tts)',
  multiple: true,
  required: true,
})

export const projectNameFlag = Flags.string({
  char: 'n',
  description: 'project name',
  required: true,
})

export const nluModelTypeFlag = Flags.string({
  default: 'fast',
  description: 'build version',
  options: ['accurate', 'fast'],
})

export const noCanonicalizeFlag = Flags.boolean({
  default: false,
  description: 'prevent canonicalization',
})

export const offsetFlag = Flags.integer({
  description: 'to exclude e.g., the first 10 (sorted) results, set --offset=10',
})

export const organizationFlag = Flags.integer({
  char: organizationIDShortcut,
  description: 'organization ID',
  required: true,
})

export const organizationWithDefaultFlag = Flags.integer({
  char: organizationIDShortcut,
  description: `organization ID (defaults to ${organizationEnvVarDefault})`,
  env: organizationEnvVarDefault,
  required: true,
})

export const outputFilePathFlag = Flags.string({
  char: filePathShortucut,
  description: 'output file path',
  required: true,
})

export const overwriteFileFlag = Flags.boolean({
  default: false,
  description: 'overwrite output file if it exists',
})

export const patternFlag = Flags.string({
  description: 'regular expression for regex entity',
})

export const projectFlag = Flags.integer({
  char: projectShortcut,
  description: projectDesc,
  required: true,
})

export const projectWithDefaultFlag = Flags.integer({
  char: projectShortcut,
  description: projectDescWithDefault,
  env: projectEnvVarDefault,
  required: true,
})

export const projectTableFlag = Flags.string({
  description: "data table to output (with 'csv' flag only)",
  dependsOn: ['csv'],
  exclusive: ['json', 'yaml'],
  options: ['channels', 'data-packs', 'project'],
})

export const regexLocaleFlag = Flags.string({
  char: localeShortcut,
  description: 'locale for regex entity',
})

export const replaceEntityFlag = Flags.boolean({
  default: false,
  description: 'replace, rather than append, existing entity literals',
})

export const replaceSamplesFlag = Flags.boolean({
  default: false,
  description: 'replace, rather than append, existing samples',
})

export const runtimeApplicationFlag = Flags.string({
  char: runtimeApplicationIDShortcut,
  description: 'fully-qualified runtime application ID',
  required: true,
})

export const sensitiveUserDataFlag = Flags.boolean({
  default: false,
  description: 'mask user sentitive data in logs',
})

export const showAllOrganizationsFlag = Flags.boolean({
  default: false,
  description: 'show all organizations',
})

export const showFullApplicationDetailsFlag = Flags.boolean({
  description: 'show all application details (permissions allowing)',
})

export const showFullAppCredentialsDetailsFlag = Flags.boolean({
  default: false,
  description: 'show all application credentials details',
})

export const showFullOrganizationDetailsFlag = Flags.boolean({
  default: false,
  description: 'display all organization details, including members count',
})

export const showFullBotDetailsFlag = Flags.boolean({
  description: 'show all bot details',
})

export const showFullBotCredentialsDetailsFlag = Flags.boolean({
  default: false,
  description: 'show all bot credentials details',
})

export const sortFlag = Flags.string({
  description:
    'comma-separated properties to sort by (prepend \'+\'/\'-\' for ascending/descending)',
})

export const systemFlag = Flags.string({
  char: 'S',
  description: 'Mix system',
})

export const userFlag = Flags.integer({
  char: userShortcut,
  description: userDesc,
})

export const useProjectDataHostsFlag = Flags.boolean({
  default: false,
  description: 'use data hosts defined in project',
})

export const tableFlags = (options: any) => {
  const columns = {columns: Flags.string({
    exclusive: ['extended', 'json', 'yaml'],
    description: 'only show provided columns (comma-separated)',
  })}
  const columnsCSV = {columns: Flags.string({
    dependsOn: ['csv'],
    description: "only show provided columns (comma-separated) (with 'csv' flag only)",
    exclusive: ['extended', 'json', 'yaml'],
  })}
  const columnsTableCSV = {columns: Flags.string({
    dependsOn: ['csv', 'table'],
    description: "only show provided columns (comma-separated) (with 'csv' flag only)",
    exclusive: ['extended', 'json', 'yaml'],
  })}
  const tableCSV = {csv: Flags.boolean({
    dependsOn: ['table'],
    exclusive: ['json', 'no-truncate', 'yaml'],
    description: "output to csv format (with 'table' flag only)",
  })}

  const csv = {csv: Flags.boolean({exclusive: ['json', 'no-truncate', 'yaml'], description: 'output to csv format'})}
  const extended = {extended: Flags.boolean({exclusive: ['columns', 'json', 'yaml'], char: 'x', description: 'show extra columns'})}
  const filter = {filter: Flags.string({exclusive: ['json', 'yaml'], description: 'filter property by partial string matching, ex: name=foo'})}
  const noHeader = {'no-header': Flags.boolean({exclusive: ['json', 'yaml'], description: 'hide table header from output'})}
  const noTruncate = {'no-truncate': Flags.boolean({exclusive: ['csv', 'json', 'yaml'], description: 'do not truncate output to fit screen'})}
  const sort = {sort: Flags.string({description: 'property to sort by (prepend \'-\' for descending)'})}

  const {except, useColumnsWithCSVOnly = false, useColumnsWithCSVAndTableOnly = false} = options

  return {
    ...(except.includes('columns') ? {} : columns),
    ...(useColumnsWithCSVOnly ? columnsCSV : {}),
    ...(useColumnsWithCSVAndTableOnly ? columnsTableCSV : {}),
    ...(except.includes('csv') ? {} : (useColumnsWithCSVAndTableOnly ? tableCSV : csv)),
    ...(except.includes('extended') ? {} : extended),
    ...(except.includes('filter') ? {} : filter),
    ...(except.includes('no-header') ? {} : noHeader),
    ...(except.includes('no-truncate') ? {} : noTruncate),
    ...(except.includes('sort') ? {} : sort),
  }
}

export const tagFlag = Flags.string({
  char: tagShortcut,
  description: 'context tag',
  required: true,
})

export const toEntityTypeFlag = Flags.string({
  description: 'new entity type',
  options: ['base', 'freeform', 'list', 'regex', 'relational', 'rule-based'],
  required: true,
})

export const watchFlag = Flags.boolean({
  default: false,
  description: 'poll status of job every minute',
})

export const withApplicationName = Flags.string({
  description: 'filter results by Mix application name (case-sensitive)',
})

export const withBuildTypeMultipleFlag = Flags.string({
  description: 'build types to include',
  options: buildTypeOptions,
  multiple: true,
})

export const withDeploymentFlowFlag = Flags.integer({
  char: deploymentFlowIDShortcut,
  description: 'deployment flow ID',
})

export const withEntityTypeFlag = Flags.string({
  description: 'entity type',
  options: Object.keys(Entities).sort(),
})

export const withLocaleMultipleFlag = Flags.string({
  description: localeDesc,
  multiple: true,
})

export const withOrganizationTypeFlag = Flags.string({
  description: 'organization type',
  options: ['personal', 'standard'],
})

export const withProjectName = Flags.string({
  description: 'filter results by project name (case sensitive)',
})

export const withRuntimeApp = Flags.string({
  description: 'filter results by fully-qualified runtime app ID',
})

export const withTag = Flags.string({
  description: 'filter results by context tag',
})

export const yamlFlag = Flags.boolean({
  default: false,
  description: 'output raw data in YAML format',
  exclusive: ['csv', 'json'],
})

// Convenience flag groups below

export const limitOffsetSortFlags = {
  limit: limitFlag,
  offset: offsetFlag,
  sort: sortFlag,
}

export const machineOutputFlags = {
  json: jsonFlag,
  yaml: yamlFlag,
}
