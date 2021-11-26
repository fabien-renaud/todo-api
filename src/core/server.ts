import express, {Express} from 'express';
import {router} from '../presentation';
import {httpRequestLoggerMiddleware, httpResponseLoggerMiddleware} from './middlewares';

// Express server
const server: Express = express();

server.set('port', parseInt(process.env.SERVER_PORT ?? '3000', 10));

server.use(express.json());
server.use(express.urlencoded({extended: true}));
server.use(httpRequestLoggerMiddleware);
server.use(httpResponseLoggerMiddleware);

server.use('/api', router);

export {server};
