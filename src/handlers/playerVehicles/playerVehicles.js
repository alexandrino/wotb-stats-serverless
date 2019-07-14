const vehicleService = require('../../services/vehicle')
const logger = require('../../utils/logger')

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
}

const getData = async ({ accountId }) => {
  logger.debug(`playerVehicles.getData.init ${accountId}`)

  try {
    const res = await vehicleService.getPlayerVehicles(accountId)
    logger.debug('playerVehicles.getData.success', accountId)

    const body = JSON.stringify(res.Items.map(({ vehicleId, createdAt }) => ({
      vehicleId,
      createdAt,
    })))

    return {
      statusCode: 200,
      headers,
      body,
    }
  } catch (error) {
    logger.error('playerVehicles.getData.error', error)

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
