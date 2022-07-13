
const { EventEmitter } = require('events')
const Proxyquire = require('proxyquire')
const Path = require('path')
const Hapi = require('@hapi/hapi')
const HapiOpenapi = require('hapi-openapi')

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
    'hapi-openapi': HapiOpenapi,
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
    plugins: {
      openapi: {
        setHost: sandbox.spy()
      }
    },
    info: {
      port: Config.PORT
    },
    ext: sandbox.spy()
  }
  const HapiStub = {
    Server: sandbox.stub().returns(ServerStub)
  }
  const HapiOpenAPIStub = sandbox.stub()
  const PathStub = Path
  const ConfigStub = Config

  const EventSDKStub = {
    EVENT_RECEIVED: eventSDK.EVENT_RECEIVED,
    EventLoggingServiceServer: EventLoggingServiceServerMock
  }

  const ServerProxy = Proxyquire('../../src/server', {
    '@hapi/hapi': HapiStub,
    'hapi-openapi': HapiOpenAPIStub,
    path: PathStub,
    './lib/config': ConfigStub,
    '@mojaloop/event-sdk': EventSDKStub
  })
  return {
    ServerStub,
    HapiStub,
    HapiOpenAPIStub,
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
