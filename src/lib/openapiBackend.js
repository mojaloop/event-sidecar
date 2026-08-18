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

const { OpenAPIBackend } = require('openapi-backend')

/**
 * @function initialise
 *
 * @description Initialise an OpenAPIBackend instance for the given API definition and handlers.
 * Lightweight local equivalent of @mojaloop/central-services-shared Util.OpenapiBackend.initialise,
 * so the sidecar does not need to pull in the full shared library.
 *
 * @param {string} definitionPath Path to the OpenAPI (3.0.x) definition file
 * @param {Object} handlers Map of operationId (and special handlers) to handler functions
 * @returns {Promise<OpenAPIBackend>} Initialised OpenAPIBackend instance
 */
const initialise = async (definitionPath, handlers) => {
  const api = new OpenAPIBackend({
    definition: definitionPath,
    strict: false,
    validate: true,
    ajvOpts: {
      coerceTypes: true
    },
    handlers
  })
  await api.init()
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
