module.exports = app=> {
    const {STRING, INTEGER} = app.Sequelize;
    // 默认情况下。sequelize将自动将所有传递的模型名称（define的第一个参数）转换为复数
    const Member = app.model.define('member', {
        // 自动生成id
        name: STRING,
        sex: STRING,
        age: INTEGER
    })

    Member.associate = function() {    // 所属哪个俱乐部，指向俱乐部主键
        app.model.Member.belongsTo(app.model.Club, {
            foreignKey: "club_id",
            as: 'club'
        })
    }

    return Member;
}