const AWS = require('aws-sdk')
const { promisifyAll } = require('bluebird')

const savePlayerData = async (data) => {
  const docClient = new AWS.DynamoDB.DocumentClient()
  promisifyAll(docClient)

  const params = {
    TableName: 'playerStats',
    Item: {
      createdAt: Date.now(),
      ...data,
    },
  }

  try {
    const res = await docClient.putAsync(params)
    console.log('Player data saved successfully')
    return res
  } catch (error) {
    console.log(error)
    throw error
  }
}

module.exports = { savePlayerData }
