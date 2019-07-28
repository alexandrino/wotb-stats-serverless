const nock = require('nock')
const sinon = require('sinon')
const { Success } = require('monet')
const { saveVehicleStats } = require('./vehicleData')
const vehicleService = require('../../services/vehicle')

// http://localhost/app/tanks/stats/?application_id=99999&account_id=123
const mockAPIResponse = {
  tank_id: 1111,
  account_id: 99999,
  battles: 10,
}

describe('VehicleIndexer', () => {
  beforeEach(() => {
    sinon.stub(vehicleService, 'savePlayerVehicles').resolves({})
    sinon.stub(vehicleService, 'savePlayerVehiclesData').resolves({})
  })

  afterEach(() => {
    sinon.restore()
  })

  nock('http://localhost/app')
    .get('/tanks/stats/?application_id=99999&account_id=123')
    .reply(200, {
      data: {
        123: [
          mockAPIResponse,
        ],
      },
    })

  test('fetch data', async () => {
    const response = await saveVehicleStats({ accountId: 123 })
    expect(response).toMatchObject(Success([{
      ...mockAPIResponse,
    }]))
  })
})
