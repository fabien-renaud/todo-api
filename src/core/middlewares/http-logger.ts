import morgan from 'morgan';
import split from 'split';
import {Logger} from '../../utils/logger';

const httpRequestLoggerMiddleware = morgan(':method :url', {
    immediate: true,
    stream: split().on('data', (message: string) => Logger.http(message))
});

const httpResponseLoggerMiddleware = morgan(':status :response-time ms', {
    immediate: false,
    stream: split().on('data', (message: string) => Logger.debug(message))
});

export {httpRequestLoggerMiddleware, httpResponseLoggerMiddleware};
