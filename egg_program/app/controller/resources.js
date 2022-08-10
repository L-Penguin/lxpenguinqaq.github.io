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
        queryData: this.ctx.request.query,
        // 通过this.ctx.request.body得到post数据
        postData: this.ctx.request.body,
        // 通过this.ctx.params得到params数据
        paramsData: this.ctx.params
    }
}

class ResourceController extends Controller {
    async index() {
        let data = showData.call(this);
        this.ctx.body = `
            get请求页面
            ${JSON.stringify(data)}
        `;
    }

    async new() {
        let data = showData.call(this);
        this.ctx.body = `
            /resources/new get请求页面
            ${JSON.stringify(data)}
        `;
    }

    async show() {
        let data = showData.call(this);
        this.ctx.body = `
            get请求携带params参数id
            ${JSON.stringify(data)}
        `;
    }

    async edit() {
        let data = showData.call(this);
        this.ctx.body = `
            /resources/:id/edit get请求页面
            ${JSON.stringify(data)}
        `;
    }

    async create() {
        let data = showData.call(this);
        this.ctx.body = `
            post请求页面
            ${JSON.stringify(data)}
        `;
    }

    async update() {
        let data = showData.call(this);
        this.ctx.body = `
            put请求携带params参数id
            ${JSON.stringify(data)}
        `;
    }

    async destroy() {
        let data = showData.call(this);
        this.ctx.body = `
            delete请求携带参数id
            ${JSON.stringify(data)}
        `;
    }
}

module.exports = ResourceController;