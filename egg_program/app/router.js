'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/getRes', app.middleware.middleFunc(), controller.myController.getRes);
  // 接收params数据需要服务端配合响应 
  router.get('/getRes/:id', app.middleware.middleFunc(), controller.myController.getRes);
  router.post('/postRes', app.middleware.middleFunc(), controller.myController.postRes);
  router.post('/postRes/:id', app.middleware.middleFunc(), controller.myController.postRes);
  router.delete('/delRes', app.middleware.middleFunc(), controller.myController.delRes);
  router.delete('/delRes/:id', app.middleware.middleFunc(), controller.myController.delRes);
  router.put('/putRes', app.middleware.middleFunc(), controller.myController.putRes);
  router.put('/putRes/:id', app.middleware.middleFunc(), controller.myController.putRes);
  router.resources('resources', '/resources', app.middleware.middleFunc(), controller.resources); // 第一个参数为名称（暂不知道用处），第二个参数是url路径，第三个参数是中间件，第四个参数是控制器中的类
  router.resources('menber', '/member', app.middleware.middleFunc(), controller.member);
  router.resources('club', '/club', app.middleware.middleFunc(), controller.club);
};
