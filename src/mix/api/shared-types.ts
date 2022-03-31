/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

export type EmptyParams = {[k in any]: never}

// expands object types one level deep
/** @hidden */
export type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;

/** @hidden */
export type AllowedHTTPMethod = 'delete'|'get'|'post'|'put'

/** @hidden */
export type True = true
