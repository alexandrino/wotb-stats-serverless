const sinon = require('sinon')
const AWS = require('aws-sdk')
const dynamo = require('./dynamo')

describe('PlayerIndexer', () => {
  afterEach(() => {
    sinon.restore()
  })

  test('should save player data succefully', async () => {
    sinon.stub(AWS.DynamoDB, 'DocumentClient').returns({
      putAsync: () => Promise.resolve({}),
    })
    const playerRepository = dynamo()
    const result = await playerRepository.savePlayerData({ name: 'foo' })
    expect(result).toMatchObject({})
  })

  test('should get the player data succefully', async () => {
    sinon.stub(AWS.DynamoDB, 'DocumentClient').returns({
      queryAsync: () => Promise.resolve({
        Items: [
          {
            statistics: {
              spotted: 1,
            },
          },
        ],
      }),
    })
    const playerRepository = dynamo()
    const result = await playerRepository.getPlayerData({ accountId: 123 })
    expect(result).toMatchObject({
      Items: [
        {
          statistics: {
            spotted: 1,
          },
        },
      ],
    })
  })

  // test('should have an error when save player data', async () => {
  //   sinon.stub(AWS.DynamoDB, 'DocumentClient').returns({
  //     putAsync: () => Promise.reject(new Error('Some error')),
  //   })
  //   const playerRepository = dynamo()
  //   const result = await playerRepository.savePlayerData({ name: 'foo' })
  //   expect(result).toThrow(Error('Some error'))
  // })
})
