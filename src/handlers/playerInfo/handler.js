const playerInfo = require('./playerInfo')

module.exports.playerInfo = async () => {
  const { ACCOUNT_ID: accountId } = process.env
  console.log('----', accountId)

  const playerStats = await playerInfo.getData({
    accountId,
  })

  return playerStats
}
