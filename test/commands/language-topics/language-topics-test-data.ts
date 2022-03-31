/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

module.exports = {
  params: {
    orgId: 1,
  },
  response: {
    json: {
      languageTopics: [
        {
          id: "1",
          name: "gen",
          locales: [
            { locale: "en-US", versions: ["4.1.0","4.2.0"] },
            { locale: "en-CA", versions: ["4.1.0"] },
            { locale: "fr-FR", versions: ["4.1.0"] },
          ],
        },
        {
          id: "3",
          name: "flo",
          locales: [{ locale: "he-IS", versions: ["4.1.0"] }],
        },
      ],
    },
  },
};
  