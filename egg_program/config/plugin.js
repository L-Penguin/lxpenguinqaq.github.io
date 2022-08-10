'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }

  // 引入egg-view-nunjucks插件解决模板渲染问题
  nunjucks: {
    enable: true,
    package: 'egg-view-nunjucks',
  },
  // 引入egg-cors插件解决跨域问题
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  // 引入egg-jwt插件实现用户登录状态
  jwt: {
    enable: true,
    package: 'egg-jwt'
  },
  // 引入egg-sequelize，解决数据库创建问题
  sequelize: {
    enable: true,
    package: 'egg-sequelize'
  },
};
