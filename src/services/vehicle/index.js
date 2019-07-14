const vehicleRepository = require('./repository/dynamo')

const {
  savePlayerVehicles,
  savePlayerVehiclesData,
  getPlayerVehicles,
  getVehicleInfo,
} = vehicleRepository()

module.exports = {
  savePlayerVehicles: async data => savePlayerVehicles(data),
  savePlayerVehiclesData: async data => savePlayerVehiclesData(data),
  getPlayerVehicles: async data => getPlayerVehicles(data),
  getVehicleInfo: async data => getVehicleInfo(data),
}
