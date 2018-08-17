'use strict';

const _ = require('lodash');
const Controller = require('../core/base_controller');


// redis 的数据类型
const dataTypeMap = {
  string: {
    data: async (redis, key, { keyList }) => {
      if (!keyList) {
        return await redis.get(key);
      }
      const data = [];
      for (let i = 0; i < keyList.length; i++) {
        const name = keyList[i];
        const value = await redis.get(name);
        data.push({ name, value });
      }
      return data;
    },
    count: () => 1,
  },
  hash: {
    data: async (redis, key) => await redis.hgetall(key),
    count: async (redis, key) => await redis.hlen(key),
  },
  list: {
    data: async (redis, key, { limit }) => await redis.lrange(key, 0, limit),
    count: async (redis, key) => await redis.llen(key),
  },
  set: {
    data: async (redis, key) => await redis.smembers(key),
    count: async (redis, key) => await redis.scard(key),
  },
  zset: {
    data: async (redis, key) => {
      const levels = await redis.zrange(key, 0, -1, 'WITHSCORES');
      const data = [];
      while (levels && levels.length) {
        data.push({
          score: levels.pop(),
          value: levels.pop(),
        });
      }
      return data;
    },
    count: async (redis, key) => await redis.zcard(key),
  },
};
dataTypeMap.none = dataTypeMap.string;

class RedisUIController extends Controller {
  async index() {
    const ctx = this.ctx;

    this.redisBody({});

    // 测试redis服务是否启动，返回: data = 'PONG'
    // ctx.body.data = await ctx.app.redis.get('instance0').ping();

    // TODO 获取所有键
    // ctx.body.data = await ctx.app.redis.get('instance0').keys('*');
  }

  async listKeys() {
    const ctx = this.ctx;

    this.redisBody({});

    const tables = ctx.body.tables;

    if (!tables || !tables.length) {
      return;
    }

    for (let i = 0; i < tables.length; i++) {
      const tname = tables[i];
      const keys = await ctx.app.redis.get(tname).keys('*');
      const keyMap = {};

      for (var j = 0; j < keys.length; j++) {
        const kname = keys[j];
        keyMap[kname] = await ctx.app.redis.get(tname).type(kname);
      }

      ctx.body.data[tname] = keyMap;
    }
  }

  async keyData() {
    const ctx = this.ctx;
    const query = ctx.request.body;

    const body = this.redisBody();

    if (!_.isObject(query)) {
      this.errorParams();
      return;
    }
    if (query.keyList) {
      query.keyList = _.isArray(query.keyList) && query.keyList.length ? query.keyList : null;
    }
    if ((!query.kname && !query.keyList) ||
      body.tables.indexOf(query.tname) === -1 ||
      !dataTypeMap[query.ktype]) {
      this.errorMsg('参数值不存在');
      return;
    }

    ctx.body.data = query;
    const func = dataTypeMap[query.ktype];
    const redis = ctx.app.redis.get(query.tname);
    ctx.body.data.count = query.keyList ? query.keyList.length : await func.count(redis, query.kname);
    ctx.body.data.data = await func.data(redis, query.kname, {
      limit: ctx.body.data.count,
      keyList: query.keyList,
    });
  }
}

module.exports = RedisUIController;
