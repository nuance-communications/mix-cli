/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {flags} from '@oclif/command'
import makeDebug from 'debug'

import MixCommand from '../../utils/base/mix-command'
import * as BuildsAPI from '../../mix/api/builds'
import * as MixFlags from '../../utils/flags'
import {BuildsLatestParams, MixClient, MixResponse, MixResult} from '../../mix/types'

const debug = makeDebug.debug('mix:commands:builds:latest')

export default class BuildsLatest extends MixCommand {
  static description = `list latest build of each type
  
Use this command to list the latest version for each build type of a particular
project.`

  static examples = [
    'List latest builds',
    '$ mix builds:latest -P 1922',
  ]

  static flags = {
    project: MixFlags.projectWithDefaultFlag,
    ...MixFlags.tableFlags({except: ['extended', 'sort']}),
    ...MixFlags.machineOutputFlags,
  }

  get columns() {
    debug('get columns()')
    return {
      buildType: {header: 'BuildType'},
      locale: {header: 'Locale'},
      buildLabel: {header: 'BuildLabel'},
      buildVersion: {header: 'BuildVersion'},
    }
  }

  async buildRequestParameters(options: Partial<flags.Output>): Promise<BuildsLatestParams> {
    debug('buildRequestParams()')
    const {project} = options
    return {projectId: project}
  }

  doRequest(client: MixClient, params: BuildsLatestParams): Promise<MixResponse> {
    debug('doRequest()')
    return BuildsAPI.getBuildsLatest(client, params)
  }

  setRequestActionMessage(options: any) {
    this.requestActionMessage = `Retrieving builds for project ID ${options.project}`
  }

  transformResponse(result: MixResult) {
    debug('transformResponse()')
    const recentBuilds = []
    const {models} = result.data as any
    let recentBuild: any = {}
    for (const key of Object.keys(models)) {
      if (models[key]?.builds) {
        for (const t of models[key].builds) {
          recentBuild = {}
          recentBuild.buildType = key
          recentBuild.locale = t.locale
          recentBuild.buildLabel = t.buildLabel
          recentBuild.buildVersion = t.buildVersion
          recentBuilds.push(recentBuild)
        }
      } else {
        recentBuild = {}
        recentBuild.buildType = key
        recentBuild.locale = 'n/a'
        recentBuild.buildLabel = models[key].buildLabel
        recentBuild.buildVersion = models[key].buildVersion
        recentBuilds.push(recentBuild)
      }
    }

    return recentBuilds
  }

  outputHumanReadable(transformedData: any) {
    debug('outputHumanReadable()')
    const count = transformedData.length
    if (count === 0) {
      this.log('No builds found.')
      return
    }

    super.outputHumanReadable(transformedData, this.options)
  }
}
