module.exports = app=> {
    const {STRING, INTEGER} = app.Sequelize;
    // 默认情况下。sequelize将自动将所有传递的模型名称（define的第一个参数）转换为复数
    const Club = app.model.define('club', {
        // 自动生成id
        name: STRING,
    })

    return Club;
}