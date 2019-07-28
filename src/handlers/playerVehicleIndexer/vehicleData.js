const axios = require('axios')
const Promise = require('bluebird')
const { Success, Fail } = require('monet')
const logger = require('../../utils/logger')
const vehicleService = require('../../services/vehicle')

const { API_ENDPOINT, APP_ID } = process.env

const fetchVehicleStats = async (options) => {
  logger.debug('fetchVehicleStats.init', options)
  const { accountId } = options
  try {
    const url = `${API_ENDPOINT}/tanks/stats/?application_id=${APP_ID}&account_id=${accountId}`
    const { data: { data } } = await axios.get(url)
    logger.debug('fetchVehicleStats.success')
    return Success(data[accountId])
  } catch (error) {
    logger.error('fetchVehicleStats.error', error)
    return Fail('Unable to retrieve vehicle data')
  }
}

const saveVehicleStats = async (options) => {
  logger.debug('saveVehicleStats.init')

  try {
    const vehicleData = await fetchVehicleStats(options)
    await vehicleData.map(vehicles => Promise.all(
      Promise.map(vehicles, vehicleService.savePlayerVehicles),
    )).success()

    await vehicleData.map(vehicles => Promise.all(
      Promise.map(vehicles, vehicleService.savePlayerVehiclesData),
    )).success()

    logger.debug('saveVehicleStats.success')
    return vehicleData
  } catch (error) {
    logger.error('saveVehicleStats.error', error)
    return Fail('Enable to save vehicle\'s data')
  }
}

module.exports = {
  saveVehicleStats,
}
