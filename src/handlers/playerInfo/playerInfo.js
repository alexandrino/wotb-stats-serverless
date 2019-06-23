const playerService = require('../../services/player')
const logger = require('../../utils/logger')

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
}

const getData = async ({ accountId }) => {
  logger.debug(`playerInfo.getData.init ${accountId}`)

  try {
    const res = await playerService.getPlayerData(accountId)
    logger.debug('playerInfo.getData.success', accountId)

    const body = JSON.stringify(res.Items.map(({ statistics, createdAt }) => ({
      statistics,
      createdAt,
    })))

    return {
      statusCode: 200,
      headers,
      body,
    }
  } catch (error) {
    logger.error('playerInfo.getData.error', error)

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        errorMessage: error.errorMessage,
      }),
    }
  }
}

module.exports = { getData }
