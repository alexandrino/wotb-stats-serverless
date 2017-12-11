'use strict';

const personalData = require('./src/personalData');
const achievements = require('./src/achievements');
const API_ENDPOINT = process.env.API_ENDPOINT;
const APP_ID = process.env.APP_ID;
const S3_BUCKET = process.env.S3_BUCKET;

module.exports.personalDataIndexer = (event, context, callback) => {
  const account = personalData.getStats({
    API_ENDPOINT,
    APP_ID,
    S3_BUCKET,
    username: 'AlexandrinoSann'
  })
  callback(null, account);
};

module.exports.achievementIndexer = (event, context, callback) => {
  const message = event.Records[0].Sns.Message;
  const playerAchievements = achievements.getAchievements({
    API_ENDPOINT,
    APP_ID,
    S3_BUCKET,
    userId: JSON.parse(message).accountId
  })
  callback(null, playerAchievements);
};