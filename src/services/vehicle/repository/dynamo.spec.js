const sinon = require('sinon')
const AWS = require('aws-sdk')
const dynamo = require('./dynamo')

describe('VehicleIndexer', () => {
  afterEach(() => {
    sinon.restore()
  })

  describe('savePlayerVehicles', () => {
    test('should save player vehicles data succefully', async () => {
      sinon.stub(AWS.DynamoDB, 'DocumentClient')
        .returns({
          putAsync: () => Promise.resolve({}),
        })
      const vehicleRepository = dynamo()
      const result = await vehicleRepository.savePlayerVehicles({
        images: [],
        account_id: '11111',
        tank_id: '22222',
        info: {},
      })
      result.map(r => expect(r).toMatchObject({}))
    })

    test('should fail when save vehicles data', async () => {
      sinon.stub(AWS.DynamoDB, 'DocumentClient')
        .returns({
          putAsync: () => Promise.resolve({}),
        })
      const vehicleRepository = dynamo()
      const result = await vehicleRepository.savePlayerVehicles({
        images: [],
      })
      result.failMap(r => expect(r).toEqual('savePlayerVehicles invalid params'))
    })
  })

  describe('getPlayerVehicles', () => {
    test('should get the vehicle data succefully', async () => {
      const mockItems = [
        {
          statistics: {
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
      const result = await vehicleRepository.getPlayerVehicles({ accountId: 123 })
      result.map(r => expect(r).toMatchObject({
        Items: mockItems,
      }))
    })
  })

  describe('savePlayerVehiclesData', () => {
    test('should save vehicles data succefully', async () => {
      sinon.stub(AWS.DynamoDB, 'DocumentClient').returns({
        putAsync: () => Promise.resolve({}),
      })
      const vehicleRepository = dynamo()
      const result = await vehicleRepository.savePlayerVehiclesData({
        account_id: '1111', tank_id: '222',
      })
      result.map(r => expect(r).toMatchObject({}))
    })

    test('should save vehicles data succefully', async () => {
      sinon.stub(AWS.DynamoDB, 'DocumentClient').returns({
        queryAsync: () => Promise.resolve({}),
      })
      const vehicleRepository = dynamo()
      const result = await vehicleRepository.savePlayerVehiclesData({})
      result.failMap(r => expect(r).toEqual('savePlayerVehiclesData invalid params'))
    })
  })
})
