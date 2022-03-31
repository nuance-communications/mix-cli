/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

module.exports = {
  request: {
    params: {
      orgId: "1",
      limit: 25,
      offset: 1,
    },
  },
  response: {
    json: { flows: [ { id: "262", displayName: "Default Promotion Flow", steps: [ { id: "338", step: 1, requiresApproval: false, environments: [ { id: "300", displayName: "Sandbox", geographies: [ { id: "337", geography: { id: "9", displayName: "Azure East US", }, envType: "SANDBOX", envHost: "api.nuance.com", }, ], }, ], }, ], }, { id: "263", displayName: "Multi-Stage Pipeline", steps: [ { id: "339", step: 1, requiresApproval: false, environments: [ { id: "301", displayName: "Development", geographies: [ { id: "338", geography: { id: "14", displayName: "US", }, envType: "SANDBOX", envHost: "api.nuance.com", }, ], }, ], }, { id: "340", step: 2, requiresApproval: false, environments: [ { id: "302", displayName: "QA", geographies: [ { id: "339", geography: { id: "14", displayName: "US", }, envType: "SANDBOX", envHost: "api.nuance.com", }, ], }, ], }, { id: "341", step: 3, requiresApproval: false, environments: [ { id: "303", displayName: "Staging", geographies: [ { id: "340", geography: { id: "14", displayName: "US", }, envType: "PRODUCTION", envHost: "api.nuance.com", }, { id: "343", geography: { id: "16", displayName: "Canada", }, envType: "PRODUCTION", envHost: "api.nuance.com", }, ], }, ], }, { id: "342", step: 4, requiresApproval: true, environments: [ { id: "304", displayName: "Production", geographies: [ { id: "341", geography: { id: "14", displayName: "US", }, envType: "PRODUCTION", envHost: "api.nuance.com", }, { id: "342", geography: { id: "16", displayName: "Canada", }, envType: "PRODUCTION", envHost: "api.nuance.com", }, ], }, ], }, ], }, ], totalSize: 2, count: 2, limit: 10, offset: 0, },
  }
}