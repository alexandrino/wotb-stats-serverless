const playerRepository = require('./repository/dynamo')

module.exports = {
  savePlayerData: async data => playerRepository().savePlayerData(data),
  getPlayerData: async data => playerRepository().getPlayerData(data),
}
