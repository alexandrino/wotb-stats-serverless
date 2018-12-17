const playerService = require('../../services/player')

const getData = async ({ accountId }) => {
  try {
    const res = await playerService.getPlayerData(accountId)
    console.log('getPlayerData data saved successfully', res)
    return {
      statusCode: 200,
      body: JSON.stringify(res),
    }
  } catch (error) {
    console.error('getPlayerData error', error)
    // Todo: Use monads
    return null
  }
}

module.exports = { getData }
