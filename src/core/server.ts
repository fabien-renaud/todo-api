import express, {Express} from 'express';
import {initialize} from 'express-openapi';
import swaggerUi from 'swagger-ui-express';
import yaml from 'yaml';
import fs from 'fs';
import * as operations from '../routes';
import {httpRequestLoggerMiddleware, httpResponseLoggerMiddleware} from './middlewares';

// Express server
const server: Express = express();

server.set('port', parseInt(process.env.SERVER_PORT ?? '3000', 10));

server.use(express.json());
server.use(express.urlencoded({extended: true}));
server.use(httpRequestLoggerMiddleware);
server.use(httpResponseLoggerMiddleware);

// Render OpenAPI Specifications
const swaggerConfigFile: string = fs.readFileSync('src/core/swagger.yaml', 'utf-8');
const swaggerConfig = yaml.parse(swaggerConfigFile);
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig));

// Generate endpoints from OpenAPI Specifications
initialize({
    app: server,
    apiDoc: swaggerConfig,
    operations
});

export {server};
