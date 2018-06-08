const _ = require('lodash');
const { Controller } = require('egg');


class BaseController extends Controller {
  body(data, code = 0) {
    return this.ctx.body = { data, code };
  }

  redisBody(data, code) {
    this.body(data, code).tables = _.keys(this.ctx.app.config.redis.clients);
    return this.ctx.body;
  }

  errorParams() {
    this.ctx.body.code = 1001;
    this.ctx.body.msg = '参数错误';
  }
  errorMsg(msg, code = 1000) {
    this.ctx.body.msg = msg;
    this.ctx.body.code = code;
  }
}

module.exports = BaseController;
