/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import makeDebug from 'debug'

import {createForm} from './utils/create-form'
import buildURL from './utils/build-url'
import {MixClient, MixResponse} from '../types'
import {OntologyExportParams, OntologyImportParams} from './ontology-types'

const debug = makeDebug('mix:api:ontology')

/**
 * Append the content in the provided .zip file to the project ontology.
 *
 * @category ontology
 */
export async function appendOntology(client: MixClient, params: OntologyImportParams): Promise<MixResponse> {
  debug('appendOntology()')
  const {filePath, projectId, ...requestParams} = params
  const form = createForm(filePath)

  return client.request({
    method: 'put',
    url: buildURL(client.getServer(), `/v4/projects/${projectId}/ontology/.append`, requestParams),
    data: form,
    headers: form.getHeaders(),
  })
}

/**
 * Export the project ontology package to a .zip file. Note that the grammar
 * files are restricted to Nuance Professional Services users and not available
 * to all users. As such, the ontology package exported by regular users will
 * not include these files. Regular users may end up with an incomplete ontology
 * after calling this endpoint.
 *
 * @category ontology
 */
export async function exportOntology(client: MixClient, params: OntologyExportParams): Promise<MixResponse> {
  debug('exportOntology()')
  const {projectId, ...requestParams} = params

  return client.request({
    method: 'get',
    url: buildURL(client.getServer(), `/v4/projects/${projectId}/ontology/.export`, requestParams),
    options: {responseType: 'stream'},
  })
}
