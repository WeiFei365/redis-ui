'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  router.get('/', controller.home.index);

  router.get('/redis_ui/tabs', controller.redisUi.index);
  router.get('/redis_ui/keys', controller.redisUi.listKeys);
  router.post('/redis_ui/key/data', controller.redisUi.keyData);
};
