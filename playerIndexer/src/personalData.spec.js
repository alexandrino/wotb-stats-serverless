const nock = require('nock')
const sinon = require('sinon')
const { getPersonalStats } = require('./personalData')
const playerService = require('../../services/player')

describe('PlayerIndexer', () => {
  beforeEach(() => {
    sinon.stub(playerService, 'savePlayerData').resolves({})
  })

  afterEach(() => {
    sinon.restore()
  })

  nock('http://localhost/app')
    .get('/account/info/?application_id=99999&account_id=123')
    .reply(200, {
      data: {
        123: {
          statistics: {
            all: {},
          },
          account_id: 999,
        },
      },
    })

  test('fetch data', async () => {
    const response = await getPersonalStats({ accountId: 123 })
    expect(response).toMatchObject({ accountId: 999, statistics: {} })
  })
})
