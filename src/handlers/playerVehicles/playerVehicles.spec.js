const sinon = require('sinon')
const vehicleService = require('../../services/vehicle')
const { getPlayerVehicles } = require('./playerVehicles')

describe('PlayerVehicles', () => {
  afterEach(() => {
    sinon.restore()
  })

  test('should return player vehicles payload succefully', async () => {
    sinon.stub(vehicleService, 'getPlayerVehicles').resolves({
      Items: [
        {
          vehicleId: 17,
          createdAt: 1563114588361,
        },
      ],
    })
    const result = await getPlayerVehicles({ accountId: 111 })
    expect(result).toMatchObject({
      body: JSON.stringify([{
        vehicleId: 17,
        createdAt: 1563114588361,
      }]),
    })
  })
})
