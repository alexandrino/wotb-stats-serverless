const personalData = require('./src/personalData')

module.exports.personalDataIndexer = async () => {
  const account = personalData.getPersonalStats({
    accountId: '9999',
  })
  return account
}
