/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */

const path = require("path");
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1649732351545_3191';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  // 关闭post安全验证
  config.security = {
    csrf: {
      enable: false,
    },
  };

  // 设置默认的模板引擎是nunjucks
  config.view = {
    defaultViewEngine: 'nunjucks'
  };

  // 设置egg-cors解决跨域
  config.cors = {
    origin: "*",
    allowMethod: "GET, HEAD, PUT, POST, DELETE, PATCH"
  };

  // 设置egg-jwt
  config.jwt = {
    secert: "wozhenbang"
  };

  // 绑定数据库
  config.sequelize = {
    dialet: 'mysql',
    database: 'test_egg',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'lq123456',
    timezone: '+08:00',
  };

  // 简化静态资源路径
  config.static = {
    prefix: "/",  // 访问路径
    dir: path.join(appInfo.baseDir, 'app/public'),  // 设置静态文件目录
  };

  return {
    ...config,
    ...userConfig,
  };
};
