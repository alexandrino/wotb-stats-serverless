const sinon = require('sinon')
const AWS = require('aws-sdk')
const { savePlayerData } = require('./dynamo')

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
    const dynamo = await savePlayerData({ name: 'foo' })
    expect(dynamo).toMatchObject({})
  })
})
