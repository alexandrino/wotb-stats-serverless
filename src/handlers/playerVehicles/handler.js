const playerVehicles = require('./playerVehicles')

module.exports.playerVehicles = async (req) => {
  const { accountId } = req.queryStringParameters
  const playerStats = await playerVehicles.getData({
    accountId,
  })

  return playerStats
}
