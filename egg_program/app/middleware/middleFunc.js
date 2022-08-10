// 中间件
function middleFunc() {
    // 设置为请求携带query,params或post数据
    return async function(ctx, next) {
        if (JSON.stringify(ctx.params) !== "{}" || JSON.stringify(ctx.request.body) !== "{}" || JSON.stringify(ctx.request.query) !== "{}") {
            console.log("请求携带数据,放行!");
            await next();
        } else {
            console.log("由于请求未携带任何数据,所以不放行!");
            ctx.body = "请求没有携带任何数据";
        }
    }
}

module.exports = middleFunc;