const playerVehicles = require('./playerVehicles')

const vehicleList = async (req) => {
  const { accountId } = req.queryStringParameters
  const playerStats = await playerVehicles.getPlayerVehicles({
    accountId,
  })

  return playerStats
}

const vehicleInfo = async (req) => {
  const { vehicleId } = req.queryStringParameters
  const playerStats = await playerVehicles.getVehicleInfo({
    vehicleId,
  })

  return playerStats
}

module.exports = {
  vehicleInfo,
  vehicleList,
}
