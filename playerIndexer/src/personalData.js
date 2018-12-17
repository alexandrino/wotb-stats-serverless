const axios = require('axios')
const playerService = require('../../services/player')

const { API_ENDPOINT, APP_ID } = process.env

const getPersonalStats = async (options) => {
  console.log('Get personal data start')
  try {
    const res = await axios.get(`${API_ENDPOINT}/account/info/?application_id=${APP_ID}&account_id=${options.accountId}`)
    const { data: { data } } = res
    const accountData = data[options.accountId]
    const { statistics, account_id: accountId } = accountData
    const body = {
      statistics: JSON.stringify(statistics.all),
      accountId,
    }
    await playerService.savePlayerData(body)
    console.log('Get personal data successfully')
    return body
  } catch (error) {
    console.error(error)
    return {}
  }
}

module.exports = {
  getPersonalStats,
}
