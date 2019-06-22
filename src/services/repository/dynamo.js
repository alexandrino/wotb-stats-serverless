const AWS = require('aws-sdk')
const { promisifyAll } = require('bluebird')
const logger = require('../../utils/logger')

const tableName = 'playerStats'

const playerRepository = () => {
  const docClient = new AWS.DynamoDB.DocumentClient()
  promisifyAll(docClient)

  const savePlayerData = async (data) => {
    const params = {
      TableName: tableName,
      Item: {
        createdAt: Date.now(),
        ...data,
      },
    }

    try {
      const res = await docClient.putAsync(params)
      logger.debug('Player data saved successfully')
      return res
    } catch (error) {
      logger.error('savePlayerData error', error)
      throw error
    }
  }

  const getPlayerData = async (accountId) => {
    const params = {
      TableName: tableName,
      KeyConditionExpression: 'accountId = :accountId',
      ExpressionAttributeValues: {
        ':accountId': Number(accountId),
      },
    }

    try {
      const result = await docClient.queryAsync(params)
      logger.error('getPlayerData.success', result.length)

      return result
    } catch (error) {
      logger.error('getPlayerData error', error)
      throw error
    }
  }

  return {
    savePlayerData,
    getPlayerData,
  }
}

module.exports = playerRepository
