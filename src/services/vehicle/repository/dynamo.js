const AWS = require('aws-sdk')
const { promisifyAll } = require('bluebird')
const logger = require('../../../utils/logger')

const tableName = 'vehicleStats'

const vehicleRepository = () => {
  const docClient = new AWS.DynamoDB.DocumentClient()
  promisifyAll(docClient)

  const saveVehicleData = async (data) => {
    const params = {
      TableName: tableName,
      Item: {
        createdAt: Date.now(),
        ...data,
      },
    }

    try {
      const res = await docClient.putAsync(params)
      logger.debug('Vehicle data saved successfully')
      return res
    } catch (error) {
      logger.error('saveVehicleData error', error)
      throw error
    }
  }

  const getVehicleData = async (accountId) => {
    const params = {
      TableName: tableName,
      KeyConditionExpression: 'accountId = :accountId',
      ExpressionAttributeValues: {
        ':accountId': Number(accountId),
      },
    }

    try {
      const result = await docClient.queryAsync(params)
      logger.error('getVehicleData.success', result.length)

      return result
    } catch (error) {
      logger.error('getVehicleData error', error)
      throw error
    }
  }

  return {
    saveVehicleData,
    getVehicleData,
  }
}

module.exports = vehicleRepository
