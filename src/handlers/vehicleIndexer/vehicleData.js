const axios = require('axios')
const { Success, Fail } = require('monet')
const Promise = require('bluebird')
const logger = require('../../utils/logger')
const vehicleService = require('../../services/vehicle')

const { API_ENDPOINT, APP_ID } = process.env
const fields = ['images', 'type', 'description', 'tier', 'nation', 'name'].join(',')
const fetchVehicleStats = async () => {
  logger.debug('fetchVehicleStats.init')
  try {
    const url = `${API_ENDPOINT}/encyclopedia/vehicles/?application_id=${APP_ID}`
    const { data: { data } } = await axios.get(url, {
      params: {
        fields,
      },
    })
    logger.debug('fetchVehicleStats.success')

    return Success(Object.entries(data).map(tankData => ({
      vehicleId: Number(tankData[0]),
      ...tankData[1],
    })))
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
      Promise.map(vehicles, vehicleService.saveVehicles),
    )).success()

    logger.debug('saveVehicleStats.success')
    return vehicleData.success()
  } catch (error) {
    logger.error('saveVehicleStats.error', error)
    return Fail('Enable to save vehicle\'s data')
  }
}

module.exports = {
  saveVehicleStats,
}
