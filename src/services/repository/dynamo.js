const AWS = require('aws-sdk')
const { promisifyAll } = require('bluebird')
const uuidv1 = require('uuid/v1')
const logger = require('../../utils/logger')

const tableName = 'playerStats'

const playerRepository = () => {
  const docClient = new AWS.DynamoDB.DocumentClient()
  promisifyAll(docClient)

  const savePlayerData = async (data) => {
    const params = {
      TableName: tableName,
      Item: {
        id: uuidv1(),
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
    const startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).getTime()
    const endDate = Date.now()

    const params = {
      TableName: tableName,
      Limit: 50,
      ExpressionAttributeNames: {
        '#createdAt': 'createdAt',
        '#accountId': 'accountId',
      },
      ExpressionAttributeValues: {
        ':id': accountId,
        ':startDate': startDate,
        ':endDate': endDate,
      },
      FilterExpression: '#createdAt between :startDate and :endDate and #accountId = :id',
    }

    try {
      return docClient.scanAsync(params)
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
