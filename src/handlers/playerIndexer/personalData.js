const axios = require('axios')
const { Success, Fail } = require('monet')
const logger = require('../../utils/logger')
const playerService = require('../../services/player')

const { API_ENDPOINT, APP_ID } = process.env

const fetchPersonalStats = async (options) => {
  logger.debug('Get personal data start', options)

  try {
    const res = await axios.get(`${API_ENDPOINT}/account/info/?application_id=${APP_ID}&account_id=${options.accountId}`)
    const { data: { data } } = res

    const accountData = data[options.accountId]
    const { statistics, account_id: accountId } = accountData
    const body = {
      statistics: JSON.stringify(statistics.all),
      accountId,
    }

    logger.debug('Get personal data successfully')
    return Success(body)
  } catch (error) {
    logger.error(error)
    return Fail('Unable to retrieve player data')
  }
}

const savePersonalStats = async (options) => {
  logger.debug('Get personal data start')

  try {
    const playersData = await fetchPersonalStats(options)
    return playersData
      .map(body => playerService.savePlayerData(body))
      .success()
  } catch (error) {
    logger.error(error)
    return Fail('Enable to retrieve player\'s data')
  }
}

module.exports = {
  savePersonalStats,
}
