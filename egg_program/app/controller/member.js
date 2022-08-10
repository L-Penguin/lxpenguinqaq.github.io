const Controller = require('egg').Controller;

// 对数据库member表
class MemberController extends Controller {
    async index() {
        // 调用service文件夹下面的member.js文件中的getMemberList函数
        let list = await this.ctx.service.member.getMemberList();
        if (list) {
            this.ctx.body = {
                code: 1000,
                data: list
            }
        } else {
            this.ctx.body = {
                code: 2000,
                msg: "服务器异常，请与管理员联系"
            }
        }
    }

    async create() {
        let result = await this.ctx.service.member.createMember();
        if (result) {
            this.ctx.body = {
                code: 1000,
                msg: "添加成功"
            }
        } else {
            this.ctx.body = {
                code: 2000,
                msg: "服务器异常，请与管理员联系"
            }
        }
    }

    async destroy() {
        await this.app.model.Member.destroy({
            where: this.ctx.params
        })
        this.ctx.body = "删除成功";
    }

    async update() {
        await this.app.model.Member.update(this.ctx.request.body, {
            where: this.ctx.params
        })
        this.ctx.body = "修改成功";
    }
}

module.exports = MemberController;