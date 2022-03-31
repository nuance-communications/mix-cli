/*
 * Copyright 2022, Nuance, Inc. and its contributors.
 * All rights reserved.
 *
 * This source code is licensed under the Apache-2.0 license found in
 * the LICENSE file in the root directory of this source tree.
 */

import axios, {AxiosRequestHeaders} from 'axios'
import makeDebug from 'debug'

import {
  MixClient,
  MixClientOptions,
  RequestArgs,
  MixResponse} from './types'

const debug = makeDebug('mix:client')

/**
 * Returns an initialized HTTP client to be used with the Mix API.
 */
export function createMixClient(options: MixClientOptions) {
  debug('createMixClient()')
  const {
    userAgent = 'mix-js-client',
    server,
  } = options

  let bearerToken = ''

  // In order to ease unit testing, we prevent axios from rejecting
  // its promise. So instead of dealing with an AxiosError, we will
  // receive an AxiosResponse and be able to look at the 'status' property.
  const axiosInstance = axios.create({
    validateStatus: function (status) {
      return status >= 200 && status <= 503
    },
  })

  const client: MixClient = ({
    /** Returns the fully-qualified domain name of the Mix V4 API server */
    getServer: () => {
      debug('getServer()')
      return server
    },

    request: async (params: RequestArgs): Promise<MixResponse> => {
      debug('request()')
      const {method, url, data, headers, options: requestOptions} = params
      try {
        debug(`request method: ${method}`)
        debug(`request url: ${url}`)
        debug('request body: %O', data)
        const augmentedHeaders: AxiosRequestHeaders = {
          Authorization: bearerToken,
          'User-Agent': userAgent,
          ...headers}

        const response = await axiosInstance.request({
          method,
          url: url.toString(),
          data,
          headers: augmentedHeaders,
          ...requestOptions,
        })

        debug('response status: %d', response.status)
        debug('response statusText: %s', response.statusText)
        if (requestOptions?.responseType !== 'stream') {
          debug('response data: %O', response?.data)
        }

        if (response.status === 200) {
          return {
            _state: 'success',
            data: response.data,
          }
        }

        return {
          _state: 'mixFailure',
          code: response?.data?.code,
          details: response?.data?.details,
          message: response?.data?.message,
          statusCode: response.status,
        }
      } catch (error) {
        debug('(unexpected) response error code: %s', error.code)
        debug('(unexpected) response error message: %s', error.message)
        const message = error instanceof Error ? error.message : ''
        return {
          _state: 'connectionFailure',
          code: error.code,
          message: message ?? '',
        }
      }
    },

    setToken: (accessToken: string) => {
      debug('setToken()')
      bearerToken = `Bearer ${accessToken}`
    },
  })

  return client
}
