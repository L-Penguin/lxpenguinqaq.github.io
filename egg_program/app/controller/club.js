// const club = require('../model/club');

const Controller = require('egg').Controller

class ClubController extends Controller {

    // restful: index/create/destroy/update

    async index() {
        let id = this.ctx.query.id;
        // 查询所有
        // let clubList = await this.app.model.Club.findAll();
        let clubList = await this.app.model.Club.findAll({
            where: {
                id: id
            }
        });
        this.ctx.body = clubList;
    }

    async create() {
        let name = this.ctx.request.body.name;
        let sex = this.ctx.request.body.sex;
        let age = this.ctx.request.body.age;
        // 创建数据
        await this.app.model.Club.create({
            name,
            sex,
            age
        })
        this.ctx.body = "添加成功";
    }

    async destroy() {
        let id = this.ctx.params.id;
        console.log(this.ctx.request.body);
        // 删除数据
        await this.app.model.Club.destroy({
            where: {
                id: id
            }
        })
        this.ctx.body = "删除成功";
    }

    async update() {
        let id = this.ctx.params.id;
        let name = this.ctx.request.body.name;
        let sex = this.ctx.request.body.sex;
        let age = this.ctx.request.body.age;
        // 修改数据
        await this.ctx.app.model.Club.update({
            name,
            sex,
            age
        }, {
            where: {
                id
            }
        })

        this.ctx.body = "修改成功";
    }
}

module.exports = ClubController