/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

export default {
  botInterfacesGetResponse: {
    interface: {
      id: "52",
      version: 1,
      languageTopic: "gen",
      locales: [
        "en-US"
      ],
      channels: [
        {
          id: "channel1",
          displayName: "Default",
          codeName: "default",
          modes: [
            "TEXT"
          ],
          color: "COLOR_UNSPECIFIED"
        },
        {
          id: "channel2",
          displayName: "text",
          codeName: "text",
          modes: [
            "RICH_TEXT"
          ],
          color: "GREEN"
        }
      ],
      variables: [
        {
          id: "variable1",
          displayName: "resultObject",
          description: "",
          isReserved: true,
          complexVariableTypeId: "c1"
        },
        {
          id: "variable2",
          displayName: "resourceReferences",
          description: "References to external resources",
          isReserved: true,
          simpleVariableType: "STRING_TYPE"
        }
      ],
      transferNodes: [
        {
          id: "transferNode1",
          nodeName: "IGNORE ME",
          nodeType: "END",
          description: "",
          requestVariables: []
        },
        {
          id: "transferNode2",
          nodeName: "End dialog",
          nodeType: "END",
          description: "",
          requestVariables: []
        }
      ],
      createTime: "2022-09-22T15:46:18Z"
    }
  },
  noBotInterfacesResponse: {
    interface: {}
  }
}
