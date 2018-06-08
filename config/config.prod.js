'use strict';

const defaultCon = require('./config.default');


module.exports = appInfo => {
  const config = defaultCon();

  config.logger.level = 'ERROR';
  config.logger.consoleLevel = 'DEBUG';
  config.logger.dir = '~/log-nodeapi';

  return config;
};
