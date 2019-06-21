const axios = require('axios')
const { Success, Fail } = require('monet')
const logger = require('../../utils/logger')
const playerService = require('../../services/player')

const { API_ENDPOINT, APP_ID } = process.env

const fetchPersonalStats = async (options) => {
  logger.debug('fetchPersonalStats.init', options)

  try {
    const res = await axios.get(`${API_ENDPOINT}/account/info/?application_id=${APP_ID}&account_id=${options.accountId}`)
    const { data: { data } } = res

    const accountData = data[options.accountId]
    const { statistics, account_id: accountId } = accountData
    const body = {
      statistics: JSON.stringify(statistics.all),
      accountId,
    }

    logger.debug('fetchPersonalStats.success')
    return Success(body)
  } catch (error) {
    logger.error('fetchPersonalStats.error', error)
    return Fail('Unable to retrieve player data')
  }
}

const savePersonalStats = async (options) => {
  logger.debug('savePersonalStats.init')

  try {
    const playersData = await fetchPersonalStats(options)
    const result = playersData
      .map(body => playerService.savePlayerData(body))
      .success()

    logger.debug('savePersonalStats.success')
    return result
  } catch (error) {
    logger.error('savePersonalStats.error', error)
    return Fail('Enable to retrieve player\'s data')
  }
}

module.exports = {
  savePersonalStats,
}
