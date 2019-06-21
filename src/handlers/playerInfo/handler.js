const playerInfo = require('./playerInfo')

module.exports.playerInfo = async (req) => {
  const { accountId } = req.queryStringParameters
  const playerStats = await playerInfo.getData({
    accountId,
  })

  return playerStats
}
