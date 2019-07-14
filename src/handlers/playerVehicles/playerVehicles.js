const vehicleService = require('../../services/vehicle')
const logger = require('../../utils/logger')

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
}

const getPlayerVehicles = async ({ accountId }) => {
  logger.debug(`playerVehicles.getVehicles.init ${accountId}`)

  try {
    const res = await vehicleService.getPlayerVehicles(accountId)
    logger.debug('playerVehicles.getVehicles.success', accountId)

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
    logger.error('playerVehicles.getVehicles.error', error)

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        errorMessage: error.errorMessage,
      }),
    }
  }
}

const getVehicleInfo = async ({ vehicleId }) => {
  logger.debug(`getVehicleInfo.getVehicleInfo.init ${vehicleId}`)

  try {
    const res = await vehicleService.getVehicleInfo(vehicleId)
    logger.debug('getVehicleInfo.getVehicleInfo.success', vehicleId)
    const body = JSON.stringify(res.Items.map(({ playerVehicleDataId, createdAt, data }) => ({
      playerVehicleDataId,
      createdAt,
      data,
    })))

    return {
      statusCode: 200,
      headers,
      body,
    }
  } catch (error) {
    logger.error('getVehicleInfo.getVehicleInfo.error', error)

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        errorMessage: error.errorMessage,
      }),
    }
  }
}


module.exports = {
  getPlayerVehicles,
  getVehicleInfo,
}
