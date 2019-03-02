const personalData = require('./src/personalData')

module.exports.personalDataIndexer = async () => {
  const account = personalData.getPersonalStats({
    accountId: '1033001555',
  })
  return account
}
