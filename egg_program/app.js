// 在项目根目录中创建app.js文件，初始化数据库
module.exports = app=> {
    app.beforeStart(async function() {
        // await app.model.sync({force: true});    // 开发环境使用，会删除数据表
        // sync方法会根据模型去创建表。
        await app.model.sync({});
    });
};