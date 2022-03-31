/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

// A few special exit codes
export const authProblemExitCode = 100
export const configurationProblemExitCode = 99

// Used as default value for limit parameter in commands that support paging
export const defaultLimit = 25

// Name of the file used to store the access token.
export const tokenFileName = 'access-token'
