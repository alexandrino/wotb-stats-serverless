const playerService = require('../../services/player')
const logger = require('../../utils/logger')

const getData = async ({ accountId }) => {
  logger.debug(`playerInfo.getData.init ${accountId}`)

  try {
    const res = await playerService.getPlayerData(accountId)
    logger.debug('playerInfo.getData.success', accountId)

    const body = JSON.stringify(res.Items.map(s => ({
      statistics: s.statistics,
    })))

    return {
      statusCode: 200,
      body,
    }
  } catch (error) {
    logger.error('playerInfo.getData.error', error)

    return {
      statusCode: 500,
      body: JSON.stringify({
        errorMessage: error.errorMessage,
      }),
    }
  }
}

module.exports = { getData }
