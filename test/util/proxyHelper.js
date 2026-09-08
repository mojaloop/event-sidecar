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

 * Miguel de Barros <miguel.debarros@modusbox.com>

 --------------
 ******/

'use strict'
const { EventEmitter } = require('events')
const Proxyquire = require('proxyquire')
const Path = require('path')
const Hapi = require('@hapi/hapi')

const eventSDK = require('@mojaloop/event-sdk')
const Logger = require('@mojaloop/central-services-logger')

const Config = require('../../src/lib/config')

// Stubbed EventLoggingServiceServer class
class EventLoggingServiceServerMock extends EventEmitter {
  constructor (host, port) {
    super()
    this.host = host
    this.port = port
    Logger.isInfoEnabled && Logger.info(`STUB-EventLoggingServiceServer::constructor(${host},${port})`)
  }

  start () {
    Logger.isInfoEnabled && Logger.info('STUB-EventLoggingServiceServer::start')
  }

  logEventReceivedHandler (call, callback) {
    Logger.isInfoEnabled && Logger.info(`STUB-EventLoggingServiceServer::logEventReceivedHandler(${call},${callback})`)
    callback(null, new eventSDK.LogResponse(eventSDK.LogResponseStatus.accepted))
  }
}

const createServerOnlyWithEventSDKProxy = (sandbox) => {
  const EventSDKStub = {
    EVENT_RECEIVED: eventSDK.EVENT_RECEIVED,
    EventLoggingServiceServer: EventLoggingServiceServerMock
  }

  const ServerProxy = Proxyquire('../../src/server', {
    '@hapi/hapi': Hapi,
    path: Path,
    './lib/config': Config,
    '@mojaloop/event-sdk': EventSDKStub
  })
  return {
    EventSDKStub,
    ServerProxy
  }
}

const createServerFullProxy = (sandbox) => {
  const ServerStub = {
    register: sandbox.stub().resolves(),
    method: sandbox.stub().resolves(),
    start: sandbox.stub().resolves(),
    stop: sandbox.stub().resolves(),
    log: sandbox.stub().resolves(),
    route: sandbox.stub(),
    info: {
      port: Config.PORT
    },
    ext: sandbox.spy()
  }
  const HapiStub = {
    Server: sandbox.stub().returns(ServerStub)
  }
  const PathStub = Path
  const ConfigStub = Config

  const EventSDKStub = {
    EVENT_RECEIVED: eventSDK.EVENT_RECEIVED,
    EventLoggingServiceServer: EventLoggingServiceServerMock
  }

  const ServerProxy = Proxyquire('../../src/server', {
    '@hapi/hapi': HapiStub,
    path: PathStub,
    './lib/config': ConfigStub,
    '@mojaloop/event-sdk': EventSDKStub
  })
  return {
    ServerStub,
    HapiStub,
    PathStub,
    ConfigStub,
    EventSDKStub,
    ServerProxy
  }
}

module.exports = {
  EventLoggingServiceServerMock,
  createServerFullProxy,
  createServerOnlyWithEventSDKProxy
}
