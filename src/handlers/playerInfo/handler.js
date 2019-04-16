const playerInfo = require('./playerInfo')

module.exports.playerInfo = async () => {
  const { ACCOUNT_ID: accountId } = process.env
  const playerStats = playerInfo.getData({
    accountId,
  })

  return playerStats
}
