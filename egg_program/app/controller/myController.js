'use strict'

const Controller = require('egg').Controller;

function showData() {
    if (JSON.stringify(this.ctx.request.query) !== "{}") {
        console.log("query参数:", this.ctx.request.query);
    }
    if (JSON.stringify(this.ctx.request.body) !== "{}") {
        console.log("post参数:", this.ctx.request.body);
    }
    if (JSON.stringify(this.ctx.params) !== "{}") {
        console.log("params参数:", this.ctx.params);
    }
    return {
        // 通过this.ctx.request.query得到query数据
        queryData: JSON.stringify(this.ctx.request.query),
        // 通过this.ctx.request.body得到post数据
        postData: JSON.stringify(this.ctx.request.body),
        // 通过this.ctx.params得到params数据
        paramsData: JSON.stringify(this.ctx.params)
    }
}

class MyController extends Controller {
    async getRes() {
        let data = showData.call(this);
        await this.ctx.render("getRes", data);
    }

    async postRes() {
        let data = showData.call(this);
        await this.ctx.render("postRes", data);
    }
    
    async delRes() {
        let data = showData.call(this);
        await this.ctx.render("delRes", data);
    }

    async putRes() {
        let data = showData.call(this);
        await this.ctx.render("putRes", data);
    }
}

module.exports = MyController;