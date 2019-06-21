const knex = require('knex')
const logger = require('./logger')

const {
  AWS_RDS_DB_URI: uri,
  AWS_RDS_DB_CONNECTION_TIMEOUT: connectionTimeout = 5000,
  AWS_RDS_DB_CONNECTION_POOL: connectionPool = '{ "min": 0, "max": 7 }',
} = process.env

logger.debug(`Postgres uri: ${uri} connectionPool:${connectionPool}`)

const instace = knex({
  client: 'pg',
  connection: uri,
  acquireConnectionTimeout: connectionTimeout,
  pool: JSON.parse(connectionPool),
})

module.exports = instace
