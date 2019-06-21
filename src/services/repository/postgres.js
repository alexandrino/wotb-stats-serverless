const knex = require('../../utils/knexClient')

const operationsTimeout = 30000

const savePlayerData = async ({ accountId, statistics }) => knex.insert({
  account_id: accountId,
  stats: statistics,
  created_at: Date.now(),
})
  .into('player_stats')
  .returning('id')
  .timeout(operationsTimeout)


const getPlayerData = async accountId => knex.select('player_stats.*')
  .from('player_stats')
  .where({
    'player_stats.account_id': accountId,
  })
  .timeout(operationsTimeout)

module.exports = {
  savePlayerData,
  getPlayerData,
}
