'use strict';

const accountIndexer = require('./src/accountIndexer');

module.exports.indexer = (event, context, callback) => {
  console.log(accountIndexer.getAccountData());
  callback(null, true);
};
