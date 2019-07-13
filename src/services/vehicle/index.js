const vehicleRepository = require('./repository/dynamo')

module.exports = {
  saveVehicleData: async data => vehicleRepository().saveVehicleData(data),
  getVehicleData: async data => vehicleRepository().getVehicleData(data),
}
