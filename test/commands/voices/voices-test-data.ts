/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

export default {
  voicesListResponse: {
    voices: [
      {
        name: 'Maged-Ml',
        restricted: false,
        gender: 'MALE',
        model: 'STANDARD',
        locale: 'arb-001',
        sampleRateHz: [22050],
        foreignLanguages: ['en-GB'],
        styles: [],
      },
      {
        name: 'Petra-Ml',
        restricted: false,
        gender: 'FEMALE',
        model: 'NEURAL',
        locale: 'de-DE',
        sampleRateHz: [8000, 22050],
        foreignLanguages: ['en-GB', 'fr-FR', 'it-IT'],
        styles: ['cheerful', 'excited', 'sad'],
      }
    ]
  },
  emptyVoicesListResponse: {
    voices: []
  }
}