/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import {CliUx} from "@oclif/core"
import sinon from "sinon"

import {oAuth} from '../src/utils/auth'
import {Config} from '../src/utils/config'
import {getMixCLIConfigMock, oAuthMock} from "./mocks"

before(() => {
  sinon.stub(CliUx.ux.action, 'start')
  sinon.stub(oAuth, 'getOAuthAPI').returns(oAuthMock as any)
  sinon.stub(Config, 'getMixCLIConfig').returns(getMixCLIConfigMock)
})
