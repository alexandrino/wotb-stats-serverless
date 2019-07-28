const vehicleData = require('./vehicleData')

module.exports.vehicleIndexer = async () => {
  const stats = vehicleData.saveVehicleStats()
  return stats
}
