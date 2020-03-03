export const serverConfig = {
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 3000,
  routes: {
    cors: {
      origin: ['*']
    }
  }
};

export const swaggerConfig = {
  info: {
    title: 'Todo API',
    version: '1.0.0'
  }
};
