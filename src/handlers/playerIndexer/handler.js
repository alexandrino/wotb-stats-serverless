const personalData = require('./personalData')

module.exports.personalDataIndexer = async () => {
  const { ACCOUNT_ID: accountId } = process.env
  const account = personalData.savePersonalStats({
    accountId,
  })
  return account
}
