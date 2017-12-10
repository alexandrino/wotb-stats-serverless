'use strict';

const accountIndexer = require('./src/accountIndexer');
const API_ENDPOINT = process.env.API_ENDPOINT;
const APP_ID = process.env.APP_ID;
const S3_BUCKET = process.env.S3_BUCKET;

module.exports.indexer = (event, context, callback) => {
  const account = accountIndexer.getStats({
    API_ENDPOINT,
    APP_ID,
    S3_BUCKET,
    username: 'AlexandrinoSann'
  })
  callback(null, account);
};
