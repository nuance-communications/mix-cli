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
import * as SystemAPI from '../../mix/api/system'
import {Config} from '../../utils/config'
import {DomainOption} from '../../utils/validations'
import {MixClient, MixRequestParams, MixResponse, SystemVersionParams} from '../../mix/types'
import MixCommand from '../../utils/base/mix-command'
import { Output } from '@oclif/parser/lib/flags'

const debug = makeDebug('mix:commands:channels:rename')

export default class ChannelsRename extends MixCommand {
    static description = `rename a channel in Mix project
    
    Use this command to change the name of a channel in a project.`

    static examples = ['mix channels:rename -P 1922 --channel ivr --new-name voice']

    
}