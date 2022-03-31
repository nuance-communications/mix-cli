/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

module.exports = {
  export: {
    flags: {
      config: '123',
      'runtime-app': 'super long string',
      filepath: 'out.zip',
      'env-geo': '88'
    },
  },
  create: {
    flags: {
      applicationId: 62,
      buildTypes: 'ASR',
      deploymentFlowId: 66,
      tag: 'TAG_22',
      useProjectDefault: false,
      useLatestFromProject: 1922
    },
    response: {
      data: {
        config: {
          id: '3412',
          tag: 'TAG_22',
          deployments: [
            {
              id: '66',
              status: 'PENDING_REQUEST',
              envGeographyDeployments: []
            }
          ],
          parentId: '',
          deploymentFlowId: 66,
          builds: {
            asr: {
              builds: [
                {
                  locale: 'en-US',
                  buildVersion: '18',
                  buildLabel: 'ASR_1922_18',
                  createTime: '2021-11-04T18:15:39Z'
                }
              ],
              projectId: '1922'
            }
          },
          createTime: '2021-11-05T20:12:29Z'
        }
      }
    }
  },

  deploy: {
    flags: {
      config: '456',
      'env-geo': '88'
    },
    response: {
      data: {
        deployments: [
          {
            id: '123',
            configId: '456',
            approved: true,
            comment: '',
            promotionFlowStepId: '789',
            createTime: '2021-11-16T16:04:51Z',
            updateTime: '2021-11-16T16:04:51Z',
          },
        ],
      },
    },
    response400: {
      code: 3,
      message: 'Deployment already completed. No more deployment steps available.',
      details: []
    }
  },

  undeploy: {
    flags: {
      config: '456',
      'env-geo': '88'
    },
    response: {
      data: {
        undeployments: [
          {
            configId: '456',
            applicationConfigDeploymentId: '123',
            environmentGeographyId: '789',
            code: 0,
            message: 'App config undeployed.'
          },
        ],
      },
    },
    response400: {
      code: 3,
      message: 'Cannot undeploy application config. No deployment found.',
      details: []
    }
  },
  upgrade: {
    flags: {
      configId: '3418'
    },
    response: {
      data: {
        config: {
          id: '3410',
          tag: 'TEST_TAG_21',
          deployments: [
            {
              id: '66',
              status: 'PENDING_REQUEST',
              envGeographyDeployments: []
            }
          ],
          parentId: '3385',
          deploymentFlowId: 66,
          builds: {
            asr: {
              builds: [
                {
                  locale: 'en-US',
                  buildVersion: '18',
                  buildLabel: 'ASR_1922_18',
                  createTime: '2021-11-04T18:15:39Z'
                }
              ],
              projectId: '1922'
            },
            nlu: {
              builds: [
                {
                  locale: 'en-US',
                  buildVersion: '19',
                  buildLabel: 'NLU_1922_19',
                  createTime: "221-11-04T18:15:38Z"
                }
              ],
              projectId: '1922'
            }
          },
          createTime: '2021-11-05T19:45:13Z'
        }
      }
    },
  },
  response: {
    json: {
        deployments: [
          {
            id: '2541',
            configId: '123',
            approved: true,
            comment: '',
            promotionFlowStepId: '91',
            createTime: '2021-10-19T10:31:56Z',
            updateTime: '2021-10-19T10:31:56Z',
          },
        ],
      }
  }
}
