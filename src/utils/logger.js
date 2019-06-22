const winston = require('winston')

const logger = winston.createLogger({
  level: 'debug',
  silent: process.env.NODE_ENV === 'test',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
})

logger.add(new winston.transports.Console({
  format: winston.format.simple(),
}))

module.exports = logger
