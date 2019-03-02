const playerService = require('../../services/player')
const logger = require('../../utils/logger')

const getData = async ({ accountId }) => {
  try {
    const res = await playerService.getPlayerData(accountId)
    logger.debug('getPlayerData data saved successfully')

    const body = res.Items.map(s => ({
      ...s, statistics: JSON.parse(s.statistics),
    }))

    return {
      statusCode: 200,
      body,
    }
  } catch (error) {
    logger.error('getPlayerData error', error)
    // Todo: Use monads
    return null
  }
}

module.exports = { getData }
