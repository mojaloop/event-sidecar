/*****
 License
 --------------
 Copyright © 2020-2026 Mojaloop Foundation
 The Mojaloop files are made available by the Mojaloop Foundation under the Apache License, Version 2.0 (the "License") and you may not use these files except in compliance with the License. You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, the Mojaloop files are distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

 Contributors
 --------------
 This is the official list of the Mojaloop project contributors for this file.
 Names of the original copyright holders (individuals or organizations)
 should be listed with a '*' in the first column. People who have
 contributed from an organization can be listed under the organization
 that actually holds the copyright for their contributions (see the
 Mojaloop Foundation for an example). Those individuals should have
 their names indented and be marked with a '-'. Email address can be added
 optionally within square brackets <email>.

 * Mojaloop Foundation
 - Name Surname <name.surname@mojaloop.io>

 --------------
 ******/

'use strict'

const Test = require('ava').default
const Path = require('path')
const OpenapiBackend = require('../../../src/lib/openapiBackend')
const CreateServer = require('../../../src/server').createServer

const getPort = async () => (await import('get-port')).default()

const definitionPath = Path.resolve(__dirname, '../../../src/interface/swagger.json')

const eventPayload = (stateCode) => ({
  from: 'noresponsepayeefsp',
  to: 'payerfsp',
  id: 'aa398930-f210-4dcd-8af0-7c769cea1660',
  content: { headers: {}, payload: 'data:application/json;base64,e30' },
  type: 'application/json',
  metadata: {
    event: {
      id: '3920382d-f78c-4023-adf9-0d7a4a2a3a2f',
      type: 'trace',
      action: 'start',
      createdAt: '2019-05-29T23:18:32.935Z',
      state: { status: 'success', code: stateCode, description: 'action successful' },
      responseTo: '1a396c07-47ab-4d68-a7a0-7a1ea36f0012'
    },
    trace: {
      service: 'central-ledger-prepare-handler',
      traceId: 'bbd7b2c7-3978-408e-ae2e-a13012c47739',
      parentSpanId: '4e3ce424-d611-417b-a7b3-44ba9bbc5840',
      spanId: 'efeb5c22-689b-4d04-ac5a-2aa9cd0a7e87',
      timestamp: '2015-08-29T11:22:09.815479Z'
    }
  }
})

let server

Test.serial.beforeEach(async () => {
  const port = await getPort()
  server = await CreateServer(port)
})

Test.serial.afterEach(async () => {
  await server.stop()
  server = null
})

Test.serial('test validationFail returns 400 with the validation errors for an invalid request body', async function (t) {
  const response = await server.inject({
    method: 'post',
    url: '/event',
    payload: {
      from: 'payerfsp'
    }
  })

  t.is(response.statusCode, 400, 'Bad request error thrown')
  const body = JSON.parse(response.payload)
  t.true(Array.isArray(body.errors), 'validation errors returned in response body')
  t.true(body.errors.length > 0, 'at least one validation error returned')
})

Test.serial('test notFound returns 404 for an unknown path', async function (t) {
  const response = await server.inject({
    method: 'get',
    url: '/unknown-path'
  })

  t.is(response.statusCode, 404, 'Not found error thrown')
})

Test.serial('test methodNotAllowed returns 405 for an unsupported method on a known path', async function (t) {
  const response = await server.inject({
    method: 'delete',
    url: '/health'
  })

  t.is(response.statusCode, 405, 'Method not allowed error thrown')
})

Test.serial('test initialise rejects when the definition declares an operation with no handler', async function (t) {
  const error = await t.throwsAsync(OpenapiBackend.initialise(definitionPath, {
    GetHealth: () => {},
    validationFail: OpenapiBackend.validationFail,
    notFound: OpenapiBackend.notFound,
    methodNotAllowed: OpenapiBackend.methodNotAllowed
  }))

  t.regex(error.message, /no registered handler/, 'startup fails instead of silently routing to notFound')
  t.regex(error.message, /POST \/event \(operationId: PostEvent\)/, 'the unhandled operation is named')
})

Test.serial('test initialise resolves when every declared operation has a handler', async function (t) {
  const api = await OpenapiBackend.initialise(definitionPath, {
    GetHealth: () => {},
    PostEvent: () => {},
    validationFail: OpenapiBackend.validationFail,
    notFound: OpenapiBackend.notFound,
    methodNotAllowed: OpenapiBackend.methodNotAllowed
  })

  t.is(api.getOperations().length, 2, 'both operations are registered')
})

Test.serial('test a stringified number in the event body is rejected rather than coerced', async function (t) {
  const response = await server.inject({
    method: 'post',
    url: '/event',
    payload: eventPayload('0')
  })

  t.is(response.statusCode, 400, 'AJV type coercion is off, so the string is not cast to a number')
})

Test.serial('test initialise rejects an operation declared without an operationId', async function (t) {
  const definition = {
    openapi: '3.0.3',
    info: { title: 'no operationId', version: '1.0.0' },
    paths: {
      '/thing': {
        get: { responses: { 200: { description: 'ok' } } }
      }
    }
  }

  const error = await t.throwsAsync(OpenapiBackend.initialise(definition, {
    validationFail: OpenapiBackend.validationFail,
    notFound: OpenapiBackend.notFound,
    methodNotAllowed: OpenapiBackend.methodNotAllowed
  }))

  t.regex(error.message, /GET \/thing \(operationId: undefined\)/, 'an operation with no operationId is reported by method and path')
})
