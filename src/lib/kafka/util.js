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
 - Name Surname <name.surname@gatesfoundation.com>

 * Rajiv Mothilal <rajiv.mothilal@modusbox.com>

 --------------
 ******/

'use strict'

const Config = require('../../lib/config')
const Mustache = require('mustache')
const KafkaConfig = Config.KAFKA_CONFIG
const Logger = require('@mojaloop/central-services-shared').Logger
const Uuid = require('uuid4')
const Kafka = require('./kafka')
const Enum = require('../../lib/enum')

/**
 * The Producer config required
 *
 * @description This ENUM is for the PRODUCER of the topic being created
 *
 * @enum {object} ENUMS~PRODUCER
 * @property {string} PRODUCER - PRODUCER config to be fetched
 */
const PRODUCER = 'PRODUCER'

/**
 * The EVENT config required
 *
 * @description This ENUM is for the topic being created
 *
 * @enum {object} ENUMS~EVENT
 * @property {string} EVENT - event to be used get the config for Kafka
 */
const EVENT = 'event'

/**
 * The STATE constant
 *
 * I believe that this is a temporary solution
 *
 * This ENUM is for the state of the message being created
 *
 * @enum {object} ENUMS~STATE
 * @property {string} STATE - used for the state of the message
 */
const STATE = {
  SUCCESS: {
    status: 'success',
    code: 0,
    description: 'action successful'
  },
  FAILURE: {
    status: 'error',
    code: 999,
    description: 'action failed'
  }
}

/**
 * ENUMS
 *
 * @description Global ENUMS object
 *
 * @enum {string} ENUMS
 * @property {string} PRODUCER - This ENUM is for the PRODUCER
 * @property {string} CONSUMER - This ENUM is for the CONSUMER
 */
const ENUMS = {
  PRODUCER,
  STATE,
  EVENT
}

/**
 * @function GeneralTopicTemplate
 *
 * @description Generates a general topic name from the 2 inputs, which are used in the placeholder general topic template found in the default.json
 *
 * @param {string} functionality - the functionality flow. Example: 'transfer'
 * @param {string} action - the action that applies to the flow. Example: 'prepare'
 *
 * @returns {string} - Returns topic name to be created, throws error if failure occurs
 */
const generalTopicTemplate = (functionality, action) => {
  try {
    return Mustache.render(Config.KAFKA_CONFIG.TOPIC_TEMPLATES.GENERAL_TOPIC_TEMPLATE.TEMPLATE, { functionality, action })
  } catch (e) {
    Logger.error(e)
    throw e
  }
}

/**
 * @function TransformGeneralTopicName
 *
 * @description generalTopicTemplate called which generates a general topic name from the 2 inputs, which are used in the placeholder general topic template found in the default.json
 *
 * @param {string} functionality - the functionality flow. Example: 'transfer'
 * @param {string} action - the action that applies to the flow. Example: 'prepare'
 *
 * @returns {string} - Returns topic name to be created, throws error if failure occurs
 */
const transformGeneralTopicName = (functionality, action) => {
  try {
    if (Enum.topicMap[functionality] && Enum.topicMap[functionality][action]) {
      return generalTopicTemplate(Enum.topicMap[functionality][action].functionality, Enum.topicMap[functionality][action].action)
    }
    return generalTopicTemplate(functionality, action)
  } catch (e) {
    throw e
  }
}

/**
 * @function GetKafkaConfig
 *
 * @description participantTopicTemplate called which generates a participant topic name from the 3 inputs, which are used in the placeholder participant topic template found in the default.json
 *
 * @param {string} flow - This is required for the config for the Stream Processing API. Example: 'CONSUMER' ie: note the case of text
 * @param {string} functionality - the functionality flow. Example: 'TRANSFER' ie: note the case of text
 * @param {string} action - the action that applies to the flow. Example: 'PREPARE' ie: note the case of text
 *
 * @returns {string} - Returns topic name to be created, throws error if failure occurs
 */
const getKafkaConfig = (flow, functionality, action) => {
  try {
    const flowObject = KafkaConfig[flow]
    const functionalityObject = flowObject[functionality]
    const actionObject = functionalityObject[action]
    actionObject.config.logger = Logger
    return actionObject.config
  } catch (e) {
    throw new Error(`No config found for those parameters flow='${flow}', functionality='${functionality}', action='${action}'`)
  }
}

/**
 * @function updateMessageProtocolMetadata
 *
 * @param {object} messageProtocol - The current messageProtocol from kafka
 * @param {string} metadataType - the type of flow. Example: 'notification'
 * @param {string} metadataAction - the action flow. Example: 'prepare'
 * @param {object} state - the state of the message being passed.
 * Example:
 * SUCCESS: {
 *   status: 'success',
 *   code: 0,
 *   description: 'action successful'
 * }
 *
 * @returns {object} - Returns updated messageProtocol
 */
const updateMessageProtocolMetadata = (messageProtocol, metadataType, metadataAction, state) => {
  if (!messageProtocol.metadata) {
    messageProtocol.metadata = {
      event: {
        id: Uuid(),
        type: metadataType,
        action: metadataAction,
        state: state
      }
    }
  } else {
    messageProtocol.metadata.event.responseTo = messageProtocol.metadata.event.id
    messageProtocol.metadata.event.id = Uuid()
    messageProtocol.metadata.event.type = metadataType
    messageProtocol.metadata.event.action = metadataAction
    messageProtocol.metadata.event.state = state
  }
  return messageProtocol
}

/**
 * @function createState
 *
 * @param {string} status - status of message
 * @param {number} code - error code
 * @param {string} description - description of error
 * @example:
 * errorInformation: {
 *   status: 'error',
 *   code: 3100,
 *   description: 'error message'
 * }
 *
 * @returns {object} - Returns errorInformation object
 */
const createState = (status, code, description) => {
  return {
    status,
    code,
    description
  }
}

/**
 * @function createMessageProtocol
 *
 * @param {object} payload - The payload of the api request
 * @param {string} type - the type flow. Example: 'prepare'
 * @param {string} action - the action flow. Example: 'commit'
 * @param {object} state - the state of the message being passed.
 * Example:
 * SUCCESS: {
 *   status: 'success',
 *   code: 0,
 *   description: 'action successful'
 * }
 * @param {string} pp - this is an optional field for future functionality to send the message to a third party
 *
 * @returns {object} - Returns newly created messageProtocol
 */
const createMessageProtocol = (payload, type, action, state, pp = '') => {
  return {
    id: payload.transferId,
    from: payload.payerFsp,
    to: payload.payeeFsp,
    type: 'application/json',
    content: {
      header: {},
      payload
    },
    metadata: {
      event: {
        id: Uuid(),
        responseTo: '',
        type,
        action,
        createdAt: new Date(),
        state
      },
      trace: {
        traceId: '',
        parentId: '',
        spanId: ''
      }
    },
    pp
  }
}

/**
 * @function createGeneralTopicConfig
 *
 * @param {string} functionality - the functionality flow. Example: 'transfer' ie: note the case of text
 * @param {string} action - the action that applies to the flow. Example: 'prepare' ie: note the case of text
 * @param {string} key - the key that gets assigned to the topic
 * @param {number} partition - optional partition to produce to
 * @param {*} opaqueKey - optional opaque token, which gets passed along to your delivery reports
 *
 * @returns {object} - Returns newly created general topicConfig
 */
const createGeneralTopicConf = (functionality, action, key = null, partition = null, opaqueKey = null) => {
  return {
    topicName: transformGeneralTopicName(functionality, action),
    key,
    partition,
    opaqueKey
  }
}

/**
 * @function produceGeneralMessage
 *
 * @async
 * @description This is an async method that produces a message against a generated Kafka topic. it is called multiple times
 *
 * Kafka.Producer.produceMessage called to persist the message to the configured topic on Kafka
 * Utility.updateMessageProtocolMetadata called updates the messages metadata
 * Utility.createGeneralTopicConf called dynamically generates the general topic configuration
 * Utility.getKafkaConfig called dynamically gets Kafka configuration
 *
 * @param {string} functionality - the functionality flow. Example: 'transfer' ie: note the case of text
 * @param {string} action - the action that applies to the flow. Example: 'prepare' ie: note the case of text
 * @param {object} message - a list of messages to consume for the relevant topic
 * @param {object} state - state of the message being produced
 * @param {string} key - key applicable to topic
 *
 * @returns {object} - Returns a boolean: true if successful, or throws and error if failed
 */
const produceGeneralMessage = async (functionality, action, message, state, key) => {
  let functionalityMapped = functionality
  let actionMapped = action
  if (Enum.topicMap[functionality] && Enum.topicMap[functionality][action]) {
    functionalityMapped = Enum.topicMap[functionality][action].functionality
    actionMapped = Enum.topicMap[functionality][action].action
  }
  let result = await Kafka.Producer.produceMessage(updateMessageProtocolMetadata(message, functionality, action, state),
    createGeneralTopicConf(functionalityMapped, actionMapped, key),
    getKafkaConfig(ENUMS.PRODUCER, functionalityMapped.toUpperCase(), actionMapped.toUpperCase()))
  return result
}

module.exports = {
  ENUMS,
  transformGeneralTopicName,
  getKafkaConfig,
  updateMessageProtocolMetadata,
  createState,
  createMessageProtocol,
  createGeneralTopicConf,
  produceGeneralMessage
}