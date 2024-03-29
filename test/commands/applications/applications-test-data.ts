/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */
export default {
  applicationsListResponse: {
    applications: [
      {
        id: '1',
        applicationName: 'Sample App',
        organizationId: '3',
        organizationName: 'name@company.com',
        configs: [],
        createTime: 'later'
      },
      {
        id: '2',
        applicationName: 'Sample App',
        organizationId: '4',
        organizationName: 'name@company.com',
        configs: [],
        createTime: 'now'
      }
    ],
    count: 2,
    totalSize: 600,
    limit: 2,
    offset: 0
  },
  fullApplicationsListResponse: {
    applications: [
      {
        id: '1',
        applicationName: 'Sample App',
        organizationId: '3',
        organizationName: 'name@company.com',
        configs: [
          {
            id: '58',
            tag:'A58',
            deployments: [],
            parentId: '',
            deploymentFlowId: '6',
            builds: {},
            projectDetails: {
              projectId: '61',
              projectName: 'Test Project',
              isChildDataCompliant: true,
              projectDescription: 'Test Project.'
            },
            createTime: 'later'
          },
        ],
        createTime: 'later'
      }
    ],
    count: 1,
    totalSize: 1,
    limit: 2,
    offset: 0
  },
  applicationsGetResponse: {
    applications: [
      {
        id: '1',
        applicationName: 'Sample App',
        organizationId: '3',
        organizationName: 'name@company.com',
        configs: [
          {
            id: '58',
            tag:'A58',
            deployments: [],
            parentId: '',
            deploymentFlowId: '6',
            builds: {},
            projectDetails: {
              projectId: '61',
              projectName: 'Test Project',
              isChildDataCompliant: true,
              projectDescription: 'Test Project.'
            },
            createTime: 'later'
          },
        ],
        createTime: 'later'
      },
      {
        id: '15',
        applicationName: 'Sample App 1',
        organizationId: '3',
        organizationName: 'name@company.com',
        configs: [
          {
            id: '54',
            tag:'A54',
            deployments: [],
            parentId: '',
            deploymentFlowId: '6',
            builds: {},
            projectDetails: {
              projectId: '36',
              projectName: 'Test Project',
              isChildDataCompliant: true,
              projectDescription: 'Test Project.'
            },
            createTime: 'later'
          },
        ],
        createTime: 'later'
      }
    ],
    count: 2,
    totalSize: 15,
    limit: 2,
    offset: 0
  },
  applicationsGetJsonResponse: {
    application: {
        id: '1',
        applicationName: 'Sample App',
        organizationId: '3',
        organizationName: 'name@company.com',
        configs: [
          {
            id: '58',
            tag:'A58',
            deployments: [],
            parentId: '',
            deploymentFlowId: '6',
            builds: {},
            projectDetails: {
              projectId: '61',
              projectName: 'Test Project',
              isChildDataCompliant: true,
              projectDescription: 'Test Project.'
            },
            createTime: 'later'
          },
        ],
        createTime: 'later'
      }
  },
  noApplicationsResponse: {
    applications: [],
    count: 0,
    limit: 25,
    offset: 0
  }
}
