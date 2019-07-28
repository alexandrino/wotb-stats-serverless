const vehicleRepository = require('./repository/dynamo')

const {
  saveVehicles,
  getVehicle,
  savePlayerVehicles,
  savePlayerVehiclesData,
  getPlayerVehicles,
  getVehicleInfo,
} = vehicleRepository()

module.exports = {
  saveVehicles: async data => saveVehicles(data),
  getVehicle: async data => getVehicle(data),
  savePlayerVehicles: async data => savePlayerVehicles(data),
  savePlayerVehiclesData: async data => savePlayerVehiclesData(data),
  getPlayerVehicles: async data => getPlayerVehicles(data),
  getVehicleInfo: async data => getVehicleInfo(data),
}
