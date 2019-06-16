const playerInfo = require('./playerInfo')

module.exports.playerInfo = async (req) => {
  console.log(req.queryStringParameters)
  const { accountId } = req.queryStringParameters

  const playerStats = await playerInfo.getData({
    accountId,
  })

  return playerStats
}
