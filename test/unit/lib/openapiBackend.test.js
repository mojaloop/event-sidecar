/*****
 License
 --------------
 Copyright © 2020-2025 Mojaloop Foundation
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
const CreateServer = require('../../../src/server').createServer

const getPort = async () => (await import('get-port')).default()

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
