/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

module.exports = {
  request: {
    project: '1922',
    entity: 'DrinkSize',
    entityType: 'list',
    invalidEntity: '1234',
    newEntityType: 'freeform',
    newName: 'DrinkFormat',
    unknownEntity: 'NONE',
    unknownProject: '99999',
  },
  configureListEntityBody: {
    listEntity: {
      dataType: 'NOT_SET',
      data: {},
      settings: {},
    }
  },
  configureRelationalEntityBody: {
    relationalEntity: {
      dataType: "NOT_SET",
      settings: {},
    }
  },
  convertEntityBody: {
    newType: 'FREEFORM'
  },
  createListEntityBody: {
    listEntity: {
      anaphora: 'ANAPHORA_NOT_SET',
      data: {},
      dataType: 'NOT_SET',
      isDynamic: false,
      name: '1234',
      settings: { canonicalize: true, isSensitive: false },
    }
  },
  entityNotFoundResponse: { 
    code: 5,
    message: 'No entity found.',
    details: [],
  },
  invalidEntityResponse: { 
    code: 3,
    message: '400 Bad Request: "["Illegal Argument -> Bad Request Exception","Caused by: Name with value: 1234, does not conform to javascript variable name syntax: http://mothereff.in/js-variables"]"',
    details: [],
  },
  projectInvalidResponse: { code: 3, message: 'Project 99999 is not available.', details: [] } ,
  convertEntityResponse: {
    entity: {
      freeformEntity: {
        id: 'some-long-uuid',
        name: 'DrinkSize',
        isDynamic: false,
        settings: {
          isSensitive: false,
          canonicalize: true
        }
      }
    }
  },
  convertEntityToRegexResponse: {
    entity: {
      regexEntity: {
        id: 'some-long-uuid',
        name: 'DrinkSize',
        pattern: '\d{10}',
        settings: {
          isSensitive: false,
          canonicalize: true
        }
      }
    }
  },
  getEntityResponse: {
    entity: {
      listEntity: {
        id: 'some-long-uuid',
        name: 'DrinkSize',
        isDynamic: false,
        numLiterals: 9,
        settings: {
          isSensitive: false,
          canonicalize: true
        }
      }
    }
  },
  listEntityResponse: {
    entities: [
      {
        baseEntity: {
          id: '385a68f5-b2e9-48f2-abe6-a5cfbe4456ea',
          name: 'AND',
          dataType: 'NOT_SET'
        }
      },
      {
        listEntity: {
          id: '8da514c1-20f4-4783-a29d-340fe29ac141',
          name: 'nuance_weather_condition',
          sDynamic: false,
          numLiterals: 0,
          settings: {
            isSensitive: false,
            canonicalize: true
          },
          dataSource: 'nuance_weather',
          dataType: 'NOT_SET'
        }
      },
      {
        freeformEntity: {
          id: 'f745edc1-b13e-4748-9c7e-6dccc0186c3c',
          name: 'DEPARTURE_LOCATION',
          settings: {
            isSensitive: false,
            canonicalize: true
          },
          dataType: 'NOT_SET'
        }
      },
    ],
  },
  renameEntityResponse: {
    entity: {
      listEntity: {
        id: 'some-long-uuid',
        name: 'DrinkSize',
        isDynamic: false,
        numLiterals: 0,
        settings: {
          isSensitive: true,
          canonicalize: true
        }
      }
    }
  },
}
