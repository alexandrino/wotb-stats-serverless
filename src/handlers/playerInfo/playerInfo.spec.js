const sinon = require('sinon')
const playerService = require('../../services/player')
const { getData } = require('./playerInfo')

describe('PlayerIndexer', () => {
  afterEach(() => {
    sinon.restore()
  })

  test('should return player data payload succefully', async () => {
    const statistics = {
      spotted: 4598,
      max_frags_tank_id: 10497,
      hits: 25404,
      frags: 5494,
      max_xp: 1882,
      max_xp_tank_id: 10497,
      wins: 2494,
      losses: 1321,
      capture_points: 681,
      battles: 3847,
      damage_dealt: 4776212,
      damage_received: 2271957,
      max_frags: 7,
      shots: 31311,
      frags8p: 369,
      xp: 2284058,
      win_and_survived: 1962,
      survived_battles: 2038,
      dropped_capture_points: 5365,
    }
    sinon.stub(playerService, 'getPlayerData').resolves({
      Items: [
        {
          statistics,
        },
      ],
    })
    const result = await getData({ accountId: 111 })
    expect(result).toMatchObject({ body: JSON.stringify([{ statistics }]) })
  })
})
