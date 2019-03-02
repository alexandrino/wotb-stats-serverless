const playerInfo = require('./playerInfo')

module.exports.playerInfo = async () => {
  const playerStats = playerInfo.getData({
    accountId: 1033001555,
  })
  return playerStats
}
