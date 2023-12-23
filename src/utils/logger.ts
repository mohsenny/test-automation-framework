import winston from 'winston';

// Create and configure the logger
export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'graphql.log' }),
  ],
});
