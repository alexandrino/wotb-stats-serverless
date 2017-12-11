const axios = require('axios');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();


const getDate = () => {
    const now = new Date();
    const timestamp = Math.floor(now.valueOf() / 1000000);
    const date = now.toISOString().substr(0, 10);
    return({
        now, timestamp, date
    })
}
const dateObj = getDate();
const getFolderPath = `${dateObj.date}-${dateObj.timestamp}`;

const getPersonalData = (options) => {
    return axios.get(`${options.API_ENDPOINT}/account/list/?application_id=${options.APP_ID}&search=${options.username}`)
    .then(res => res.data.data)
    .catch(err => {
        console.error(err);
        return ({});
    })
}

const getPersonalStats = (options) => {
    return axios.get(`${options.API_ENDPOINT}/account/info/?application_id=${options.APP_ID}&account_id=${options.accountId}`)
    .then(res => {
        const result = res.data.data[options.accountId];

        return s3.putObject({
            Bucket: `${options.S3_BUCKET}/account`,
            Key: `account-${getFolderPath}.json`,
            Body: JSON.stringify(Object.assign({
                created: dateObj.date
            }, result)),
          }).promise().then(r => {
            console.log('success s3 file written');
          }).catch((err) => {
            console.log(err);
          });
    })
    .catch(err => {
        console.error(err);
        return ({});
    })
}

const getStats = (options) => {
    getPersonalData(options).then(profile => {
        console.log(profile);
        if (profile.length > 0 && profile[0].account_id) {
            getPersonalStats(Object.assign({
                accountId: profile[0].account_id}, options
            )).then(acc => {
                console.log(acc);
            })
        }
        return ({});
    });

}

module.exports = {
    getStats
};