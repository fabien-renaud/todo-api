import type {Request, Response, NextFunction} from 'express';
import morgan from 'morgan';
import split from 'split';
import {Logger} from '../../utils/logger';

function errorMiddleware(error: unknown, request: Request, response: Response, next: NextFunction): void {
    response.send(error);
}

function skip(request: Request): boolean {
    return ['/docs', '/swagger', '/favicon'].some((path) => request.path.startsWith(path) || request.baseUrl.startsWith(path));
}

const httpRequestLoggerMiddleware = morgan(':method :url', {
    immediate: true,
    skip,
    stream: split().on('data', (message: string) => Logger.http(message))
});

const httpResponseLoggerMiddleware = morgan(':status :response-time ms', {
    immediate: false,
    skip,
    stream: split().on('data', (message: string) => Logger.debug(message))
});

export {errorMiddleware, httpRequestLoggerMiddleware, httpResponseLoggerMiddleware};
