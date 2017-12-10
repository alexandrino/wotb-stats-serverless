const axios = require('axios');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const getVehicles = (options) => {
  return axios.get(`${options.API_ENDPOINT}/encyclopedia/vehicles/?application_id=${options.APP_ID}`)
  .then(res => {
    const result = res.data;
    // log/metric success 
    // console.log(result);
    return s3.putObject({
      Bucket: `${options.S3_BUCKET}/vehicles`,
      Key: 'vehicles.json',
      Body: JSON.stringify(result),
    }).promise().then(r => {
      console.log('success s3 file written');
    }).catch((err) => {
      console.log(err);
    });
    
  })
  .catch(err => {
    // log/metric error
    console.error(err);
    return [];
  })
}

module.exports = {
  getVehicles
};