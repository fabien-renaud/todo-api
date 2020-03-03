import Hapi from '@hapi/hapi';
import inert from '@hapi/inert';
import vision from '@hapi/vision';
import hapiswagger from 'hapi-swagger';
import {serverConfig, swaggerConfig} from './config';

export const init = async () => {
  const server = new Hapi.Server(serverConfig);

  await server.register([
    inert,
    vision,
    {
      plugin: hapiswagger,
      options: swaggerConfig
    }
  ]);

  server.events.on('start', () => {
    server.log('info', `Server is running on ${server.info.uri}`)
  });

  server.events.on('log', (event, tags) => {
    console.log(tags, event.data)
  });

  return server
};
