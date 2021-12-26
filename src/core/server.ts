import express, {Express} from 'express';
import {initialize} from 'express-openapi';
import fs from 'fs';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import yaml from 'yaml';
import * as operations from '../operations';
import {errorMiddleware, httpRequestLoggerMiddleware, httpResponseLoggerMiddleware} from './middlewares';

// Express server
const server: Express = express();

server.set('port', parseInt(process.env.SERVER_PORT ?? '3000', 10));

server.use(express.json());
server.use(express.urlencoded({extended: true}));
server.use(httpRequestLoggerMiddleware);
server.use(httpResponseLoggerMiddleware);

// Render OpenAPI Specifications
const swaggerConfig: string = fs.readFileSync(path.resolve(__dirname, './openapi.yaml'), 'utf-8');
server.use('/docs', swaggerUi.serve, swaggerUi.setup(yaml.parse(swaggerConfig)));

// Generate endpoints from OpenAPI Specifications
initialize({
    app: server,
    apiDoc: swaggerConfig,
    operations,
    errorMiddleware
});

export {server};
