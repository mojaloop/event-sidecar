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

 - Rajiv Mothilal <rajiv.mothilal@modusbox.com>
 --------------
 ******/

const packageJson = require('../../../package.json')
// const Util = require('../lib//kafka/util')
// const Kafka = require('../lib/kafka')
// const Enum = require('../../lib/enum')

// const eventType = Enum.eventType
// const eventAction = Enum.eventAction

const statusEnum = {
  OK: 'OK',
  DOWN: 'DOWN'
}

// const serviceName = {
//   datastore: 'datastore',
//   broker: 'broker',
//   sidecar: 'sidecar',
//   cache: 'cache'
// }

/**
 * getHealth
 *
 * Gets the health status of the service.
 *
 *
 * @example:
 * returns the health of related sub-services:
 * {
 *   "status": "OK",
 *   "uptime": 0,
 *   "started": "2019-05-31T05:09:25.409Z",
 *   "versionNumber": "5.2.3",
 *   "services": [
 *     {
 *       "name": "datastore",
 *       "status": "OK"
 *     }
 *   ]
 * }
 *
 *
 * @param {*} request - the request object
 * @param {*} h       - the handler object
 */
const getHealth = async function (request, h) {
  // Default values
  const statusCode = 200
  const status = statusEnum.OK
  // const isHealthy = true
  // let services = []
  // let subServices = {}

  const uptime = process.uptime() // in seconds by default
  const startTimeDate = new Date(Date.now() - uptime)
  const startTime = startTimeDate.toISOString()
  const versionNumber = packageJson.version

  // try {
  //   // services = [
  //   //   await getSubServiceHealth(serviceName.datastore),
  //   //   await getSubServiceHealth(serviceName.broker)
  //   // ]
  //   // isHealthy = evaluateServiceHealth(services)
  //   // subServices = {
  //   //   services
  //   // }
  // } catch (err) {
  //   isHealthy = false
  // }
  //
  // if (!isHealthy) {
  //   statusCode = 502
  //   status = statusEnum.DOWN
  // }

  const response = {
    status,
    uptime,
    startTime,
    versionNumber
    // ...subServices
  }
  return { response, statusCode }
}

// /**
//  * getSubServiceHealth
//  *
//  * Gets the health status of a sub-service. Takes advantage of existing
//  * connections to the service (doesn't implement a ping or )
//  */
// const getSubServiceHealth = async function (serviceName) {
//   switch (serviceName) {
//   case 'datastore': {
//     const isLocked = await MigrationLockModel.getIsMigrationLocked()
//
//     return {
//       name: serviceName,
//       status: isLocked ? statusEnum.DOWN : statusEnum.OK
//     }
//   }
//   case 'broker': {
//     /*
//       Ensure that all topics for consumers and producers are available
//       Otherwise consider Kafka DOWN
//     */
//     const consumerTopics = [
//       Util.transformGeneralTopicName(eventType.EVENT, eventAction.AUDIT),
//       Util.transformGeneralTopicName(eventType.EVENT, eventAction.LOG),
//       Util.transformGeneralTopicName(eventType.EVENT, eventAction.TRACE)
//     ]
//
//     let status = statusEnum.OK
//     try {
//       await P.all(consumerTopics.map(t => Kafka.Consumer.isConsumerConnected(t)))
//     } catch (err) {
//       status = statusEnum.DOWN
//     }
//
//     return {
//       name: serviceName,
//       status
//     }
//   }
//   default: {
//     throw new Error(`Service: ${serviceName} not found.`)
//   }
//   }
// }
//
// /**
//  * evaluateServiceHealth
//  *
//  * Evaluate the health based on the SubService health array
//  * if any service.status is DOWN, then the entire service
//  * is considered unhealthy (will return false)
//  *
//  */
// const evaluateServiceHealth = function (services) {
//   return services.reduce((acc, curr) => {
//     if (!acc) {
//       return acc
//     }
//     if (curr.status === statusEnum.DOWN) {
//       return false
//     }
//
//     return acc
//   }, true)
// }

module.exports = {
  getHealth
  // getSubServiceHealth,
  // evaluateServiceHealth
}
