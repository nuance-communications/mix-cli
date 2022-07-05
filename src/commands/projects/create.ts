/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import chalk from 'chalk'
import {flags} from '@oclif/command'
import makeDebug from 'debug'

import * as MixFlags from '../../utils/flags'
import * as ProjectsAPI from '../../mix/api/projects'
import {asArray} from '../../utils/as-array'
import {DomainOption} from '../../utils/validations'
import {MixClient, MixResponse, MixResult, ProjectsCreateParams} from '../../mix/types'
import MixCommand from '../../utils/base/mix-command'
import {pluralize as s} from '../../utils/format'

const debug = makeDebug('mix:commands:projects:create')

export default class ProjectsCreate extends MixCommand {
  static description = `create a new project

Use this command to create a new project. Many parameters are needed to
create a project. In particular, channels and modes go hand in hand. A --channel
flag must be matched by a --modes flag. Use a comma-separated list (no spaces)
of mode names to specify multiple modes for a channel.

Given the right user permissions, it is possible to specify an engine pack using
the --engine-pack flag.

${chalk.bold('Nuance’s Child Data Policy')}
Nuance’s Child Data Policy is related to online services that are subject to
applicable child data privacy laws, such as, but not limited to, the Children’s
Online Privacy Protection Act (COPPA) and Article 8 of GDPR. Nuance’s Child
Data Policy prohibits providing hosted services to websites or online services
that are primarily directed towards children under the age of 16.

When you create a project, you are required to acknowledge whether or not the
builds for this project will be used in an application that is deployed in a
Nuance hosted service in connection with an online site, service, application
or product that is primarily directed to children under 16.

This acknowledgement must be completed for any projects that are intended
for use in the Nuance SaaS cloud.

To acknowledge such a project, use the --child-data-compliant flag and also
provide a description of your project using the --description flag.`

  static examples = [
    'Create a project with one channel and two modes',
    '$ mix projects:create -c Channel1 -L en-US -m "dtmf,tts" -O 64 -t gen -n "ACME Project"',
    '',
    'Create a project with two channels: one with two modes, the other with a single mode',
    '$ mix projects:create -c Channel1 -L en-US -m "dtmf,tts" -c Channel2 -m interactivity \\',
    '  -O 64 -t gen -n "ACME Project"',
    '',
    'Create a child-data-compliant project',
    '$ mix projects:create -c Channel1 -L en-US -m "dtmf,tts" -O 64 -t gen -n "ACME Project" \\',
    '  --child-data-compliant --description "ACME project description"',
    '',
    'Create a project with a specific engine-pack',
    '$ mix projects:create -c Channel1 -L en-US -m "dtmf,tts" -O 64 -t gen \\',
    '  -n "ACME Project" --engine-pack 995f6e23-07ff-4f89-9e42-97d0398da7fc',
    '',
  ]

  static flags = {
    channel: MixFlags.channelMultipleFlag,
    'child-data-compliant': flags.boolean({
      description: MixFlags.childDataCompliantDesc,
      default: false,
    }),
    description: flags.string({
      description: MixFlags.projectDescriptionDesc,
    }),
    'engine-pack': MixFlags.enginePackFlag,
    locale: MixFlags.localeMultipleWithDefaultFlag,
    modes: MixFlags.modesFlag,
    name: MixFlags.projectNameFlag,
    ...MixFlags.machineOutputFlags,
    organization: MixFlags.organizationWithDefaultFlag,
    topic: MixFlags.dataPackTopicFlag,
  }

  get domainOptions(): DomainOption[] {
    debug('get domainOptions()')
    return ['locale[]', 'organization']
  }

  async buildRequestParameters(options: Partial<flags.Output>): Promise<ProjectsCreateParams> {
    debug('buildRequestParameters()')
    const {
      channel: channels,
      'child-data-compliant': isChildDataCompliant,
      'engine-pack': enginePackId,
      locale: languages,
      modes,
      name: displayName,
      organization: orgId,
      description: projectDescription = '',
      topic: languageTopic,
    } = options

    return {
      channels,
      displayName,
      enginePackId,
      isChildDataCompliant,
      languages,
      languageTopic,
      modes,
      orgId,
      projectDescription,
    }
  }

  captureOptions() {
    super.captureOptions()
    this.options.locale = asArray(this.options.locale)
  }

  doRequest(client: MixClient, params: ProjectsCreateParams): Promise<MixResponse> {
    debug('doRequest()')
    return ProjectsAPI.createProject(client, params)
  }

  outputHumanReadable(transformedData: any) {
    debug('outputHumanReadable()')
    const {displayName, id} = transformedData
    this.log(`Project ${chalk.cyan(displayName)} with ID ${chalk.cyan(id)} created.`)
  }

  setRequestActionMessage(options: any) {
    debug('setRequestActionMessage()')
    this.requestActionMessage = `Creating project in organization ID ${options.organization} ` +
      `with locale${s(options.locale.length)} ${options.locale}`
  }

  transformResponse(result: MixResult): any {
    debug('transformResponse()')
    const data = result.data as any
    return data.project
  }

  tryDomainOptionsValidation(options: Partial<flags.Output>, domainOptions: DomainOption[]) {
    debug('tryDomainOptionsValidation()')
    super.tryDomainOptionsValidation(options, domainOptions)

    const channels = asArray(options.channel)
    const modes = asArray(options.modes)
    this.validateChannelsAndModes(channels, modes)

    const {
      'child-data-compliant': isChildDataCompliant,
      description,
    } = options

    this.validateChildDataCompliantAndDescription(isChildDataCompliant, description)
  }

  validateChannelsAndModes(channels: string[], modes: string[]) {
    debug('validateChannelsAndModes()')
    if (channels.length !== modes.length) {
      this.error('Expected number of channels to match number of modes lists')
    }
  }

  validateChildDataCompliantAndDescription(isChildDataCompliant: string, description: string): void {
    debug('validateChildDataCompliantAndDescription()')
    if (isChildDataCompliant &&
    (typeof description === 'undefined' || description.trim() === '')) {
      this.error('Expected project description for child-data-compliant project')
    }
  }
}
