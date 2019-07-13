const sinon = require('sinon')
const AWS = require('aws-sdk')
const dynamo = require('./dynamo')

describe('VehicleIndexer', () => {
  afterEach(() => {
    sinon.restore()
  })

  test('should save vehicle data succefully', async () => {
    sinon.stub(AWS.DynamoDB, 'DocumentClient').returns({
      putAsync: () => Promise.resolve({}),
    })
    const vehicleRepository = dynamo()
    const result = await vehicleRepository.saveVehicleData({ name: 'foo' })
    expect(result).toMatchObject({})
  })

  test('should get the vehicle data succefully', async () => {
    const mockItems = [
      {
        statistics: {
          battles: 1,
          accountId: 123,
          vehicleId: 111,
        },
      },
    ]

    sinon.stub(AWS.DynamoDB, 'DocumentClient').returns({
      queryAsync: () => Promise.resolve({
        Items: mockItems,
      }),
    })
    const vehicleRepository = dynamo()
    const result = await vehicleRepository.getVehicleData({ accountId: 123 })
    expect(result).toMatchObject({
      Items: mockItems,
    })
  })
})
