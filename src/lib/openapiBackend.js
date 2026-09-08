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
 - Juan Correa <code@juancorrea.io>

 --------------
 ******/
'use strict'

const { OpenAPIBackend } = require('openapi-backend')

/**
 * @function assertHandlersRegistered
 *
 * @description Fail fast when the API definition declares an operation with no handler.
 * openapi-backend dispatches an operation it has no handler for to `notFound`, so an
 * operationId added to the definition but never wired into the handlers map would quietly
 * answer 404 at runtime instead of failing at startup.
 *
 * @param {OpenAPIBackend} api Initialised OpenAPIBackend instance
 * @throws {Error} If the definition declares an operation with no registered handler
 */
const assertHandlersRegistered = (api) => {
  const unhandled = api.getOperations()
    .filter(({ operationId }) => typeof api.handlers[operationId] !== 'function')
    .map(({ method, path, operationId }) => `${method.toUpperCase()} ${path} (operationId: ${operationId})`)

  if (unhandled.length > 0) {
    throw new Error(`OpenAPI definition declares operations with no registered handler: ${unhandled.join(', ')}`)
  }
}

/**
 * @function initialise
 *
 * @description Initialise an OpenAPIBackend instance for the given API definition and handlers.
 * Lightweight local equivalent of @mojaloop/central-services-shared Util.OpenapiBackend.initialise,
 * so the sidecar does not need to pull in the full shared library.
 *
 * `strict` makes an invalid definition, or a handler registered against an operationId the
 * definition does not declare, fail at startup instead of emitting a console warning. It does not
 * affect request routing - openapi-backend always matches strictly and falls back to the
 * notFound/methodNotAllowed handlers - so 404 and 405 responses are unchanged.
 *
 * AJV type coercion is deliberately left off. This API validates only the POST /event request
 * body, which is forwarded to Kafka consumers; coercing a string into an integer or number field
 * there would let a malformed event through validation and reshape the payload downstream.
 *
 * @param {string|Object} definitionPath Path to, or contents of, the OpenAPI (3.0.x) definition
 * @param {Object} handlers Map of operationId (and special handlers) to handler functions
 * @returns {Promise<OpenAPIBackend>} Initialised OpenAPIBackend instance
 */
const initialise = async (definitionPath, handlers) => {
  const api = new OpenAPIBackend({
    definition: definitionPath,
    strict: true,
    validate: true,
    handlers
  })
  await api.init()
  assertHandlersRegistered(api)
  return api
}

/**
 * @function validationFail
 *
 * @description Default handler for request validation failures. Returns a 400 with the validation errors.
 *
 * @param {Object} context OpenAPIBackend context
 * @param {Object} request Hapi request object
 * @param {Object} h Hapi response toolkit
 * @returns {Object} Hapi response
 */
const validationFail = async (context, request, h) =>
  h.response({ errors: context.validation.errors }).code(400)

/**
 * @function notFound
 *
 * @description Default handler for requests to unknown paths. Returns a 404.
 *
 * @param {Object} context OpenAPIBackend context
 * @param {Object} request Hapi request object
 * @param {Object} h Hapi response toolkit
 * @returns {Object} Hapi response
 */
const notFound = async (context, request, h) =>
  h.response({ errors: [{ message: `Couldn't find path ${request.method.toUpperCase()} ${request.path}` }] }).code(404)

/**
 * @function methodNotAllowed
 *
 * @description Default handler for known paths called with an unsupported HTTP method. Returns a 405.
 *
 * @param {Object} context OpenAPIBackend context
 * @param {Object} request Hapi request object
 * @param {Object} h Hapi response toolkit
 * @returns {Object} Hapi response
 */
const methodNotAllowed = async (context, request, h) =>
  h.response({ errors: [{ message: `Method ${request.method.toUpperCase()} not allowed on path ${request.path}` }] }).code(405)

module.exports = {
  initialise,
  validationFail,
  notFound,
  methodNotAllowed
}
