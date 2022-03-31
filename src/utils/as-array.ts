/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

// Takes a value and returns it as an array.
// Returns the value if it already his an array.
export function asArray(value: string|string[]): string[] {
  if (Array.isArray(value)) {
    return value
  }

  return [value]
}
