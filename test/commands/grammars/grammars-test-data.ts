/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

export default {
  grammarsExportResponse: {
    data: {
    }
  },
  grammarsReplaceResponse: {
    entity: {
      ruleBasedEntity: {
        id: 'ca8',
        name: 'D_NUMBER',
        localeBasedGrammars: {
          'en-US': 'grammar.grxml'
        },
        settings: {
          isSensitive: false,
          canonicalize: true
        }
      }
    }
  }
}
