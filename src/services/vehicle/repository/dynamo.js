const AWS = require('aws-sdk')
const { promisifyAll } = require('bluebird')
const logger = require('../../../utils/logger')

const playerVehiclesTable = 'playerVehicles'
const playerVehiclesDataTable = 'playerVehiclesData'

const vehicleRepository = () => {
  const docClient = new AWS.DynamoDB.DocumentClient()
  promisifyAll(docClient)

  const savePlayerVehicles = async (data) => {
    const params = {
      TableName: playerVehiclesTable,
      Item: {
        createdAt: Date.now(),
        accountId: data.account_id,
        vehicleId: data.tank_id,
      },
    }

    try {
      const res = await docClient.putAsync(params)
      logger.debug('savePlayerVehicles.success')
      return res
    } catch (error) {
      logger.error('savePlayerVehicles.error', error)
      throw error
    }
  }

  const savePlayerVehiclesData = async (data) => {
    const params = {
      TableName: playerVehiclesDataTable,
      Item: {
        createdAt: Date.now(),
        playerVehicleDataId: `${data.account_id}-${data.tank_id}`,
        data,
      },
    }

    try {
      const res = await docClient.putAsync(params)
      logger.debug('savePlayerVehiclesData.success')
      return res
    } catch (error) {
      logger.error('savePlayerVehiclesData.error', error)
      throw error
    }
  }

  const getPlayerVehicles = async (accountId) => {
    const params = {
      TableName: playerVehiclesTable,
      KeyConditionExpression: 'accountId = :accountId',
      ExpressionAttributeValues: {
        ':accountId': Number(accountId),
      },
    }

    try {
      const result = await docClient.queryAsync(params)
      logger.error('getPlayerVehicles.success', result.length)

      return result
    } catch (error) {
      logger.error('getPlayerVehicles.error', error)
      throw error
    }
  }

  return {
    savePlayerVehicles,
    savePlayerVehiclesData,
    getPlayerVehicles,
  }
}

module.exports = vehicleRepository
