const port_num = 3000;

const koa = require("koa");
const router = require("koa-router")();
const parser = require("koa-parser");

const app = new koa();
app.use(parser())

router.post("/data/:id", async (ctx)=> {
    console.log("有人请求data数据");
    console.log(ctx.params)
    ctx.set({
        "Access-Control-Allow-Origin":"*",  // 重点
        "Access-Control-Allow-Headers":"Content-Type",  // 可忽略
        "Access-Control-Allow-Methods":"POST,GET,PUT,DELETE,OPTIONS",   // 可忽略
        'Access-Control-Allow-Credentials': 'true' // 允许传入Cookie
    })
    console.log(JSON.parse(ctx.request.body));
    ctx.body = {
        name: "小明",
        age: 18,
        sex: "男"
    }
})

app.use(router.routes());

app.listen(port_num, ()=> {
    console.log(`server is runing at port ${port_num}`)
});