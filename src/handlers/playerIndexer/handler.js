const personalData = require('./personalData')

module.exports.personalDataIndexer = async () => {
  const account = personalData.savePersonalStats({
    accountId: '1033001555',
  })
  return account
}
