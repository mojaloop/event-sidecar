/*****
 License
 --------------
 Copyright © 2017 Bill & Melinda Gates Foundation
 The Mojaloop files are made available by the Bill & Melinda Gates Foundation under the Apache License, Version 2.0 (the "License") and you may not use these files except in compliance with the License. You may obtain a copy of the License at
 http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, the Mojaloop files are distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 Contributors
 --------------
 This is the official list of the Mojaloop project contributors for this file.
 Names of the original copyright holders (individuals or organizations)
 should be listed with a '*' in the first column. People who have
 contributed from an organization can be listed under the organization
 that actually holds the copyright for their contributions (see the
 Gates Foundation organization for an example). Those individuals should have
 their names indented and be marked with a '-'. Email address can be added
 optionally within square brackets <email>.
 * Gates Foundation

 * ModusBox
 - Rajiv Mothilal <rajiv.mothilal@modusbox.com>
 --------------
 ******/

'use strict'

const Hapi = require('@hapi/hapi')
const HapiOpenAPI = require('hapi-openapi')
const Path = require('path')
const Config = require('./lib/config.js')
const Logger = require('@mojaloop/central-services-logger')
const Plugins = require('./plugins')
const RequestLogger = require('./lib/requestLogger')
const eventSDK = require('@mojaloop/event-sdk')
const eventHandler = require('./domain/event/handler')

const openAPIOptions = {
  api: Path.resolve(__dirname, './interface/swagger.json'),
  handlers: Path.resolve(__dirname, './handlers')
}

const LOG_ENABLED = process.env.LOG_ENABLED | false

/**
 * @function createServer
 *
 * @description Create HTTP Server
 *
 * @param {number} port Port to register the Server against
 * @returns {Promise<Server>} Returns the Server object
 */
const createServer = async (port) => {
  const server = await new Hapi.Server({
    port
  })
  await Plugins.registerPlugins(server)
  await server.register([
    {
      plugin: HapiOpenAPI,
      options: openAPIOptions
    }
  ])
  await server.ext([
    {
      type: 'onPreHandler',
      method: (request, h) => {
        RequestLogger.logResponse(request)
        return h.continue
      }
    },
    {
      type: 'onPreResponse',
      method: (request, h) => {
        if (!request.response.isBoom) {
          RequestLogger.logResponse(request.response)
        } else {
          const error = request.response
          error.message = {
            errorInformation: {
              errorCode: error.statusCode,
              errorDescription: error.message,
              extensionList: [{
                key: '',
                value: ''
              }]
            }
          }
          error.reformat()
        }
        return h.continue
      }
    }
  ])
  await server.start()
  return server
}

/**
 * @function createRPCServer
 *
 * @description Create gRPC Server
 *
 * @returns {Promise<Server>} Returns the Server object
 */
const createRPCServer = async () => {
  const grpcServer = new eventSDK.EventLoggingServiceServer(Config.EVENT_LOGGER_GRPC_HOST, Config.EVENT_LOGGER_GRPC_PORT)
  Logger.info(`GRPC Server started at host: ${grpcServer.host}, port: ${grpcServer.port}`)
  grpcServer.on(eventSDK.EVENT_RECEIVED, async (eventMessage) => {
    Logger.debug('Received eventMessage:', JSON.stringify(eventMessage, null, 2))
    if (!eventMessage.metadata && eventMessage.content && eventMessage.content.trace && eventMessage.content) {
      eventMessage.metadata = eventMessage.content
    }
    if (LOG_ENABLED) {
      let logOutput = 'Received Event :: '
      if (eventMessage.metadata && eventMessage.metadata.trace && eventMessage.metadata.trace.service) {
        logOutput += `service: ${eventMessage.metadata.trace.service} :: `
      } if (eventMessage.metadata && eventMessage.metadata.trace && eventMessage.metadata.trace.tags) {
        if (eventMessage.metadata.trace.tags.trancastionId) {
          logOutput += `trancastionId: ${eventMessage.metadata.trace.tags.transactionId} :: `
        }
        if (eventMessage.metadata.trace.tags.transactionType) {
          logOutput += `type: ${eventMessage.metadata.trace.tags.transactionType} :: `
        }
        if (eventMessage.metadata.trace.tags.transactionAction) {
          logOutput += `action: ${eventMessage.metadata.trace.tags.transactionAction}`
        }
      } if (eventMessage.metadata && eventMessage.metadata.trace) {
        if (eventMessage.metadata.trace.traceId) {
          logOutput += `*** Span :: traceId: ${eventMessage.metadata.trace.traceId} :: `
        } if (eventMessage.metadata.trace.spanId) {
          logOutput += `spanId: ${eventMessage.metadata.trace.spanId} :: `
        } if (eventMessage.method.trace.tags.tracestate) {
          logOutput += `tracestate: ${eventMessage.metadata.trace.tags.tracestate}`
        }
      }
      Logger.info(logOutput)
    }
    await eventHandler.logEvent(eventMessage)
  })
  grpcServer.on('error', async (error) => {
    Logger.error('Error', JSON.stringify(error, null, 2))
  })
  grpcServer.start()
  return grpcServer
}

const initialize = async (port = Config.PORT) => {
  const grpcServer = await createRPCServer()
  const server = await createServer(port)
  server.plugins.openapi.setHost(server.info.host + ':' + server.info.port)
  Logger.info(`Server running on ${server.info.host}:${server.info.port}`)
  return {
    server,
    grpcServer
  }
}

module.exports = {
  initialize
}
