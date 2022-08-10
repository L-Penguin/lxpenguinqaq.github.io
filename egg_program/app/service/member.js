const Service = require('egg').Service;

// 可用于模块化代码，可以用于主程序中调用
class MemberService extends Service {
    async getMemberList() {
        try {
            // 数据库查询操作，where表示定位
            let memberList = await this.app.model.Member.findAll({
                where: this.ctx.query
            })
            return memberList;
        } catch(err) {
            return null;
        }
    }

    async createMember() {
        try {
            // 使用post数据创建数据库表数据
            await this.app.model.Member.create(this.ctx.request.body);
            return true;
        } catch(err) {
            return null;
        }
    }
}

module.exports = MemberService;