# redis-ui

  redis 数据查看接口，并已关联web在线查看[转到redis-ui-web](https://github.com/WeiFei365/redis-ui-web)；支持查看redis中多张表、五种（string、list、hash、set、zset）类型的数据；

  * 项目基于[eggjs](https://github.com/eggjs/egg/)、[create-react-app](https://github.com/facebook/create-react-app)、[antd](https://github.com/ant-design/ant-design/)框架，支持完全自定义、扩展；
  * 部署简单，无需任何更改也可以直接使用，参见[使用说明]
  * 只读，避免对redis中数据的破坏


## 使用说明

```bash
$ git clone https://github.com/WeiFei365/redis-ui.git
$ cd redis-ui
$ npm i
$ npm start
```

浏览器打开：目标机器IP:7002/public/index.html

  *注意*
  * 需要保证目标机器对外开放7002端口
  * node版本需要在8.9.0及以上
  * 默认目标机器上的redis无密码，即默认配置

## 自定义说明（高级）

### 修改对外端口

[电梯: package.json#L29](https://github.com/WeiFei365/redis-ui/blob/master/package.json#L29)

### 修改redis连接信息：端口、密码等

[电梯: config/config.default.js#L31](https://github.com/WeiFei365/redis-ui/blob/master/config/config.default.js#L31)

### 增加redis中可查看的更多表

[电梯: config/config.default.js#L29](https://github.com/WeiFei365/redis-ui/blob/master/config/config.default.js#L29)

### 其他eggjs框架相关配置：[转到eggjs](https://github.com/eggjs/egg/)

### redis-ui-web相关配置：[转到redis-ui-web](https://github.com/WeiFei365/redis-ui-web)

## TODO List

* 分页查询键列表、键数据
* 可搜索键名、键数据
* 权限控制，备注：仅支持修改默认的登陆密码

## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.


[egg]: https://eggjs.org
