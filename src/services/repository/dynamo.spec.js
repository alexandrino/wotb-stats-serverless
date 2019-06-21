const sinon = require('sinon')
const AWS = require('aws-sdk')
const dynamo = require('./dynamo')

describe('PlayerIndexer', () => {
  beforeEach(() => {
    sinon.stub(AWS.DynamoDB, 'DocumentClient').returns({
      putAsync: () => Promise.resolve({}),
    })
  })

  afterEach(() => {
    sinon.restore()
  })

  test('dynamo client', async () => {
    const playerRepository = dynamo()
    const result = await playerRepository.savePlayerData({ name: 'foo' })
    expect(result).toMatchObject({})
  })
})
