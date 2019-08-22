const AWS = require('aws-sdk')
const { promisifyAll } = require('bluebird')
const { Success, Fail } = require('monet')
const logger = require('../../../utils/logger')

const vehicleTable = 'vehicleInfo'
const playerVehiclesTable = 'playerVehicles'
const playerVehiclesDataTable = 'playerVehiclesData'

const getErrorMessage = (message, error) => {
  logger.error(message, error)
  return Fail(message)
}

const vehicleRepository = () => {
  const docClient = new AWS.DynamoDB.DocumentClient()
  promisifyAll(docClient)

  const saveVehicles = async (data) => {
    const params = {
      TableName: vehicleTable,
      Item: {
        createdAt: Date.now(),
        ...data,
        images: JSON.stringify(data.images || []),
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

  const getVehicle = async (data) => {
    const params = {
      TableName: vehicleTable,
      Key: {
        vehicleId: data.tank_id,
      },
    }

    try {
      const result = await docClient.getAsync(params)
      logger.error('getVehicle.success', result.length)

      return {
        ...data,
        info: result.Item,
      }
    } catch (error) {
      logger.error('getVehicle.error', error)
      throw error
    }
  }

  const savePlayerVehicles = async ({
    images, account_id: accountId, tank_id: vehicleId, info,
  }) => {
    try {
      if (accountId && vehicleId && vehicleId && info) {
        const params = {
          TableName: playerVehiclesTable,
          Item: {
            createdAt: Date.now(),
            images,
            accountId,
            vehicleId,
            ...info,
          },
        }
        const res = await docClient.putAsync(params)
        logger.debug('savePlayerVehicles.success')
        return Success(res)
      }

      return Fail('savePlayerVehicles invalid params')
    } catch (error) {
      return getErrorMessage('savePlayerVehicles.error', error)
    }
  }

  const savePlayerVehiclesData = async (data) => {
    try {
      const { account_id: accountId, tank_id: tankId } = data

      if (accountId && tankId) {
        const params = {
          TableName: playerVehiclesDataTable,
          Item: {
            createdAt: Date.now(),
            playerVehicleDataId: `${accountId}-${tankId}`,
            data,
          },
        }
        const res = await docClient.putAsync(params)
        logger.debug('savePlayerVehiclesData.success')
        return Success(res)
      }
      return Fail('savePlayerVehiclesData invalid params')
    } catch (error) {
      return getErrorMessage('savePlayerVehiclesData.error', error)
    }
  }

  const getPlayerVehicles = async (accountId) => {
    try {
      const params = {
        TableName: playerVehiclesTable,
        KeyConditionExpression: 'accountId = :accountId',
        ExpressionAttributeValues: {
          ':accountId': Number(accountId),
        },
      }

      const result = await docClient.queryAsync(params)
      logger.error('getPlayerVehicles.success', result.length)

      return Success(result)
    } catch (error) {
      return getErrorMessage('getPlayerVehicles.error', error)
    }
  }

  const getVehicleInfo = async (vehicleId) => {
    const params = {
      TableName: playerVehiclesDataTable,
      KeyConditionExpression: 'playerVehicleDataId = :vehicleId',
      ExpressionAttributeValues: {
        ':vehicleId': vehicleId,
      },
    }

    try {
      const result = await docClient.queryAsync(params)
      logger.error('getVehicleInfo.success', result.length)

      return result
    } catch (error) {
      logger.error('getVehicleInfo.error', error)
      throw error
    }
  }

  return {
    saveVehicles,
    getVehicle,
    savePlayerVehicles,
    savePlayerVehiclesData,
    getPlayerVehicles,
    getVehicleInfo,
  }
}

module.exports = vehicleRepository
