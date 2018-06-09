'use strict';

module.exports = appInfo => {
  const config = exports = {
    proxy: true,
    ipHeaders: 'x-real-ip',
  };

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
  };

  config.security = {
    // 跨域白名单
    domainWhiteList: [
      'http://localhost:3000',
      'http://127.0.0.1:7001',
      'http://www.redis-ui.com',
    ],
    csrf: {
      // 针对内部 ip 关闭部分安全防范
      ignore: (ctx) => true,
    },
  };

  config.redis = {
    // 多redis或表配置
    clients: {
      instance0: {
        host: '127.0.0.1',
        port: 6379,
        password: '',
        db: 0,
      },
      instance1: {
        host: '127.0.0.1',
        port: 6379,
        password: '',
        db: 1,
      },
    },
  };

  config.logger = {
    encoding: 'utf-8',
    level: 'ERROR',
    consoleLevel: 'DEBUG',
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = (appInfo || {}).name + '_redis_ui';

  // add your config here
  config.middleware = [];

  return config;
};
