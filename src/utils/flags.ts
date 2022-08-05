/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {flags} from '@oclif/command'

import {
  AnaphoraDefault,
  Anaphoras,
  DataTypeDefault,
  DataTypes,
  Entities,
} from '../mix/types'

// We keep all flag descriptions in a single place to encourage consistency of
// flags across commands.
// Readability in the commands code is not affected if flags are named properly.

// Flag shortcuts that should not be reused
export const appConfigurationShortcut = 'C'
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
export const tagShortcut = 'T'

// Environment variables used as default
export const localeEnvVarDefault = 'MIX_LOCALE'
export const organizationEnvVarDefault = 'MIX_ORGANIZATION'
export const projectEnvVarDefault = 'MIX_PROJECT'

// Flag descriptions
export const buildLabelDesc = 'build label (format is <buildType>_<projectId>_<buildVersion>'
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
export const omitOverriddenDesc = 'omit application configurations that are overriden'
export const projectDesc = 'project ID'
export const projectDescriptionDesc = 'project description (for child data compliance)'
export const projectDescWithDefault = `project ID (defaults to ${projectEnvVarDefault})`

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
export const anaphoraTypeFlag = flags.string({
  default: AnaphoraDefault,
  description: 'anaphora type',
  options: Object.keys(Anaphoras).sort(),
})

export const appConfigurationFlag = flags.integer({
  char: appConfigurationShortcut,
  description: 'application configuration ID',
  required: true,
})

export const buildNotesFlag = flags.string({
  description: 'notes about the build',
})

export const buildTypeFlag = flags.string({
  description: buildTypeDesc,
  options: buildTypeOptions,
  required: true,
})

export const channelColorFlag = flags.string({
  description: 'channel color',
})

export const channelMultipleFlag = flags.string({
  char: 'c',
  description: 'channel',
  multiple: true,
  required: true,
})

export const confirmFlag = flags.string({
  char: 'c',
  description: 'skip confirmation prompt by pre-supplying value',
})

export const dataTypeFlag = flags.string({
  default: DataTypeDefault,
  description: 'data type of entity',
  options: Object.keys(DataTypes).sort(),
})

export const deploymentFlowFlag = flags.integer({
  char: deploymentFlowIDShortcut,
  description: 'deployment flow ID',
  required: true,
})

export const dataPackFlag = flags.string({
  description: 'data pack name, including version (use aa-AA@x.y.z format)',
  required: true,
})

export const dataPackTopicFlag = flags.string({
  char: 't',
  description: "data pack topic, e.g. 'gen'",
  required: true,
})

export const dynamicFlag = flags.boolean({
  default: false,
  description: 'make list entity dynamic',
})

export const enginePackFlag = flags.string({
  description: 'engine pack ID (UUID format)',
})

export const entityTypeFlag = flags.string({
  description: 'entity type',
  options: Object.keys(Entities).sort(),
  required: true,
})

export const envGeoIDFlag = flags.integer({
  description: envGeoIDDesc,
})

export const envGeoIDMultipleFlag = flags.integer({
  description: envGeoIDDesc,
  multiple: true,
})

export const entityFlag = flags.string({
  char: entityNameShortcut,
  description: 'entity name',
  required: true,
})

export const entityNameFlag = flags.string({
  description: 'new entity name',
  required: true,
})

export const excludeOverridesFlag = flags.boolean({
  description: 'exclude application configurations that are overridden',
  default: false,
})

export const geoNameFlag = flags.string({
  description: geoNameDesc,
})

export const hasAFlag = flags.string({
  description: 'define hasA relationship for relational entity',
  multiple: true,
})

export const inputFilePathFlag = flags.string({
  char: filePathShortucut,
  description: 'input file path',
  required: true,
})

export const intentNameFlag = flags.string({
  description: 'new intent name',
  required: true,
})

export const intentFlag = flags.string({
  char: intentNameShortcut,
  description: 'intent name',
  required: true,
})

export const isAFlag = flags.string({
  description: 'define isA relationship for relational entity',
})

export const jobFlag = flags.string({
  char: jobIDShortcut,
  description: 'job ID',
  required: true,
})

export const jsonFlag = flags.boolean({
  default: false,
  description: 'output raw data in JSON format',
  exclusive: ['csv', 'yaml'],
})

export const limitFlag = flags.integer({
  description: 'limit maximum results returned (defaults to Mix API behavior)',
})

export const liveOnlyFlag = flags.boolean({
  description: 'include only the application configurations that are currently deployed',
  default: false,
})

export const localeFlag = flags.string({
  char: localeShortcut,
  description: localeDesc,
  required: true,
})

export const localeWithDefaultFlag = flags.string({
  char: localeShortcut,
  description: localeDescWithDefault,
  env: localeEnvVarDefault,
  required: true,
})

export const localeMultipleFlag = flags.string({
  char: localeShortcut,
  description: localeDesc,
  multiple: true,
  required: true,
})

export const localeMultipleWithDefaultFlag = flags.string({
  char: localeShortcut,
  description: localeDescWithDefault,
  env: localeEnvVarDefault,
  multiple: true,
  required: true,
})

export const projectMetadataOnlyFlag = flags.boolean({
  default: false,
  description: 'export project metadata JSON file only',
})

export const mixApplicationFlag = flags.integer({
  char: mixApplicationShortcut,
  description: 'Mix application ID',
  required: true,
})

export const modesFlag = flags.string({
  char: 'm',
  description: 'channel modes (audioscript|dtmf|interactivity|richtext|tts)',
  multiple: true,
  required: true,
})

export const projectNameFlag = flags.string({
  char: 'n',
  description: 'project name',
  required: true,
})

export const nluModelTypeFlag = flags.string({
  default: 'fast',
  description: 'build version',
  options: ['accurate', 'fast'],
})

export const noCanonicalizeFlag = flags.boolean({
  default: false,
  description: 'prevent canonicalization',
})

export const offsetFlag = flags.integer({
  description: 'to exclude e.g., the first 10 (sorted) results, set --offset=10',
})

export const organizationFlag = flags.integer({
  char: organizationIDShortcut,
  description: 'organization ID',
  required: true,
})

export const organizationWithDefaultFlag = flags.integer({
  char: organizationIDShortcut,
  description: `organization ID (defaults to ${organizationEnvVarDefault})`,
  env: organizationEnvVarDefault,
  required: true,
})

export const outputFilePathFlag = flags.string({
  char: filePathShortucut,
  description: 'output file path',
  required: true,
})

export const overwriteFileFlag = flags.boolean({
  default: false,
  description: 'overwrite output file if it exists',
})

export const patternFlag = flags.string({
  description: 'regular expression for regex entity',
})

export const projectFlag = flags.integer({
  char: projectShortcut,
  description: projectDesc,
  required: true,
})

export const projectWithDefaultFlag = flags.integer({
  char: projectShortcut,
  description: projectDescWithDefault,
  env: projectEnvVarDefault,
  required: true,
})

export const projectTableFlag = flags.string({
  description: 'data table to output (with --csv only)',
  dependsOn: ['csv'],
  exclusive: ['json', 'yaml'],
  options: ['channels', 'data-packs', 'project'],
})

export const regexLocaleFlag = flags.string({
  char: localeShortcut,
  description: 'locale for regex entity',
})

export const replaceEntityFlag = flags.boolean({
  default: false,
  description: 'replace, rather than append, existing entity literals',
})

export const replaceSamplesFlag = flags.boolean({
  default: false,
  description: 'replace, rather than append, existing samples',
})

export const runtimeApplicationFlag = flags.string({
  char: runtimeApplicationIDShortcut,
  description: 'fully-qualified runtime application ID',
  required: true,
})

export const sensitiveUserDataFlag = flags.boolean({
  default: false,
  description: 'mask user sentitive data in logs',
})

export const showAllOrganizationsFlag = flags.boolean({
  default: false,
  description: 'show all organizations',
})

export const showFullApplicationDetailsFlag = flags.boolean({
  default: false,
  description: 'show all application details (permissions allowing)',
})

export const showFullAppCredentialsDetailsFlag = flags.boolean({
  default: false,
  description: 'show all application credentials details',
})

export const showFullOrganizationDetailsFlag = flags.boolean({
  default: false,
  description: 'display all organization details, including members count',
})

export const sortFlag = flags.string({
  description:
    'comma-separated properties to sort by (prepend \'+\'/\'-\' for ascending/descending)',
})

export const useProjectDataHostsFlag = flags.boolean({
  default: false,
  description: 'use data hosts defined in project',
})

export const tableFlags = (options: any) => {
  const columns = {columns: flags.string({
    exclusive: ['extended', 'json', 'yaml'],
    description: 'only show provided columns (comma-separated)',
  })}
  const columnsCSV = {columns: flags.string({
    dependsOn: ['csv'],
    description: 'only show provided columns (comma-separated) (with --csv only)',
    exclusive: ['extended', 'json', 'yaml'],
  })}
  const columnsTableCSV = {columns: flags.string({
    dependsOn: ['csv', 'table'],
    description: 'only show provided columns (comma-separated) (with --csv only)',
    exclusive: ['extended', 'json', 'yaml'],
  })}
  const tableCSV = {csv: flags.boolean({
    dependsOn: ['table'],
    exclusive: ['json', 'no-truncate', 'yaml'],
    description: 'output to csv format (with --table only)',
  })}

  const csv = {csv: flags.boolean({exclusive: ['json', 'no-truncate', 'yaml'], description: 'output to csv format'})}
  const extended = {extended: flags.boolean({exclusive: ['columns', 'json', 'yaml'], char: 'x', description: 'show extra columns'})}
  const filter = {filter: flags.string({exclusive: ['json', 'yaml'], description: 'filter property by partial string matching, ex: name=foo'})}
  const noHeader = {'no-header': flags.boolean({exclusive: ['json', 'yaml'], description: 'hide table header from output'})}
  const noTruncate = {'no-truncate': flags.boolean({exclusive: ['csv', 'json', 'yaml'], description: 'do not truncate output to fit screen'})}
  const sort = {sort: flags.string({description: 'property to sort by (prepend \'-\' for descending)'})}

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

export const tagFlag = flags.string({
  char: tagShortcut,
  description: 'context tag',
  required: true,
})

export const toEntityTypeFlag = flags.string({
  description: 'new entity type',
  options: ['base', 'freeform', 'list', 'regex', 'relational', 'rule-based'],
})

export const watchFlag = flags.boolean({
  default: false,
  description: 'poll status of job every minute',
})

export const withBuildTypeMultipleFlag = flags.string({
  description: 'build types to include',
  options: buildTypeOptions,
  multiple: true,
})

export const withDeploymentFlowFlag = flags.integer({
  char: deploymentFlowIDShortcut,
  description: 'deployment flow ID',
})

export const withEntityTypeFlag = flags.string({
  description: 'entity type',
  options: Object.keys(Entities).sort(),
})

export const withLocaleMultipleFlag = flags.string({
  description: localeDesc,
  multiple: true,
})

export const withOrganizationTypeFlag = flags.string({
  description: 'organization type',
  options: ['personal', 'standard'],
})

export const withRuntimeApp = flags.string({
  description: 'filter results by fully-qualified runtime app ID',
})

export const withTag = flags.string({
  description: 'filter results by context tag',
})

export const yamlFlag = flags.boolean({
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
