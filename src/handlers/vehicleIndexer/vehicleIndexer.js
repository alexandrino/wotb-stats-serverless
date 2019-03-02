// const axios = require('axios')
// const AWS = require('aws-sdk')
// const logger = require('../../utils/logger')

// const s3 = new AWS.S3()
// const getVehicles = options => axios.get(
//   `${options.API_ENDPOINT}/encyclopedia/vehicles/?application_id=${options.APP_ID}`,
// ).then((res) => {
//   const result = res.data
//   // log/metric success
//   return s3.putObject({
//     Bucket: `${options.S3_BUCKET}/vehicles`,
//     Key: 'vehicles.json',
//     Body: JSON.stringify(result),
//   }).promise().then((r) => {
//     logger.debug('success s3 file written', r)
//   }).catch(err => logger.error(err))
// }).catch((err) => {
//   // log/metric error
//   logger.error(err)
//   return []
// })


// module.exports = {
//   getVehicles,
// }
