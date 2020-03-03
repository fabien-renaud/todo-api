import * as Server from './server'

const start = async () => {
  const server = await Server.init();
  await server.start();
}

start().catch(err => throw err);
