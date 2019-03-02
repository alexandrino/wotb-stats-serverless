const AWS = require('aws-sdk')
const { promisifyAll } = require('bluebird')
const uuidv1 = require('uuid/v1')


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
      console.log('Player data saved successfully')
      return res
    } catch (error) {
      console.error('savePlayerData error', error)
      throw error
    }
  }

  const getPlayerData = async (accountId) => {
    const startDate = new Date('Wed, 01 January 2018 00:00:00').getTime()
    const endDate = new Date('Wed, 31 December 2018 00:00:00').getTime()

    const params = {
      TableName: tableName,
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
      console.error('getPlayerData error', error)
      throw error
    }
  }

  return {
    savePlayerData,
    getPlayerData,
  }
}

module.exports = playerRepository
