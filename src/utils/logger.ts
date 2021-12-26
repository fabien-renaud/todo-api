import winston, {Logger} from 'winston';
import {name} from '../../package.json';

function formatMessage(info: winston.Logform.TransformableInfo): string {
    return `${info.timestamp} ${info.level} ${info.label} ${info.message}`;
}

const Logger: Logger = winston.createLogger({
    /*
     * Logging levels are detailled here: https://github.com/winstonjs/winston#logging-levels
     *   error: 0,
     *   warn: 1,
     *   info: 2,
     *   http: 3,
     *   verbose: 4,
     *   debug: 5,
     *   silly: 6
     */
    levels: winston.config.npm.levels,
    format: winston.format.combine(winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}), winston.format.label({label: name})),
    transports: [
        // Every logs are displayed in console
        new winston.transports.Console({
            level: 'silly',
            format: winston.format.combine(winston.format.colorize(), winston.format.printf(formatMessage))
        }),
        // Only info logs and below are displayed in var/log/full.log
        new winston.transports.File({
            dirname: 'var/log',
            filename: 'full.log',
            level: 'http',
            format: winston.format.printf(formatMessage)
        }),
        // Only error logs and below are displayed in var/log/error.log
        new winston.transports.File({
            dirname: 'var/log',
            filename: 'error.log',
            level: 'error',
            format: winston.format.printf(formatMessage)
        })
    ]
});

export {Logger};
