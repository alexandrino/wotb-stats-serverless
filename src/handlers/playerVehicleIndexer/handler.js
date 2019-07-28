const vehicleData = require('./vehicleData')

module.exports.playerVehicleIndexer = async () => {
  const { ACCOUNT_ID: accountId } = process.env
  const account = vehicleData.saveVehicleStats({
    accountId,
  })

  return account
}
