const playerInfo = require('./playerInfo')

module.exports.playerInfo = async () => {
  const { ACCOUNT_ID: accountId } = proces.env
  const playerStats = playerInfo.getData({
    accountId,
  })
  return playerStats
}
