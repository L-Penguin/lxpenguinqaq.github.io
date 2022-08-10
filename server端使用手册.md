## server端框架使用

MVC框架：M指业务模型，V指用户界面，C则是控制器，使用MVC的目的是将M和V的实现代码分离。

### koa框架使用

```js
const port_num = 3000;	// 设置端口号
const Koa = require("koa"); // 引用Koa构造函数
const router = require("koa-router")(); // 引入并执行koa-router，创建router对象
const static = require("koa-static");	// 方便访问服务器静态资源
const views = require("koa-views");		// 使用render渲染html
555const nunjucks = require("nunjucks");	// 解析html模板使用，例如传入数据，或者使用{% xxx %}
const parser = require("koa-parser");   // 解析post传输的数据
const session = require("koa-session");	// 使用session存储
const app = new Koa();  // 创建应用

app.keys = ["123456"];	// session加密
app.use(parser());
app.use(session({
    maxAge: 10*1000		// session最长保存时间
}, app));

// 引入一个中间件，中间件即是一个函数
// app.use(async (ctx)=> {ctx.body = "hello Koa!"})

app.use(static(__dirname + "/static"))	// 设置静态资源路径
app.use(views(__dirname + "/views", {	// 设置通过路由返回html页面的路径
    map: {html: "nunjucks"}	// 设置渲染页面的逻辑为"nunjucks"
}))

router.get("/", async (ctx)=> {
    ctx.body = `<h1>首页标题</h1>`;
})

router.get("/nunjucks", async (ctx)=> {
    await ctx.render("index", {title: "hello"});	// 返回/views/index.html页面，{title: "hello"}为传输的数据，渲染页面需要使用await
    ctx.cookies.set("username", "admin", {
    	maxAge: 2000    // 设置cookie过期时间为2s
    })
    ctx.redirect("./login")	// 重定向，跳转页面login
    // ctx.query接受请求的query参数
    // ctx.params接受请求的params参数
    // ctx.request.body接受请求的post传送的数据
})

app.use(router.routes());   // 在koa项目中引用router
app.listen(port_num, ()=> {
    console.log(`server is runing at port ${port_num}`);
})  // 设置监听端口
```

使用`ctx.query.xxx`获得query（get方法）传送的数据；（url类似路径名后加上`?data1=xxx&data2=xxx`）

使用`ctx.request.body.xxx`获得post传送的数据；（post传送数据不在url中进行修改，需要导入koa-parser解析）

使用`ctx.params.xxx`获得params传送的数据；(url类似路径名后加上`/xxx/xxx`，路由配置的url后面添加类似的（`/:data1/:data2`）)



### egg框架使用（基于koa）

> 创建项目指令`npm init egg --type=simple`(推荐)、`npm init egg`
>
> 安装相关模块`npm install`
>
> 运行项目`npm run dev`
>
> 项目主要结构
>
> - app（应用app文件夹）
>   - controller（控制器文件夹）
>     - xxx.js（控制器文件）
>   - middleware（中间件文件夹，存放文件类似于守卫函数）
>     - xxx.js（中间件文件）
>   - model（模型文件夹）
>     - xxx.js（模型文件，与app.js联合使用创建数据库表单）
>   - public（静态资源文件夹）
>     - xxx.html（静态资源）
>     - css（样式文件夹）
>     - js（js文件夹）
>     - xxx（其余静态资源）
>   - service（模块化文件夹，用于存放调用较多的js代码）
>     - xxx.js（模块化文件）
>   - view（存放渲染页面文件）
>     - xxx.html（渲染页面文件）
>   - router.js（路由信息代码）
> - config（配置文件夹）
>   - config.default.js（使用第三方模块）
>   - plugin.js（调用第三方模块）
> - app.js（项目默认执行代码，可用于创建数据库表）
> - package.json（存放项目所安装的第三方模块信息）

#### controller文件夹（控制器文件）

> 主要用于：路由配置的第二个或第三个参数（当第二个参数为中间件函数时）。

##### myController.js

```js
'use strict';	//严格模式

const Controller = require('egg').Controller;

class MyController extends Controller {
    let user = {name: "小明", password: "123456"};
    // 使用egg-jwt，编码
	let token = this.app.jwt.sign(user, this.app.config.jwt.secret);
	// 使用egg-jwt，解码
	let decode = this.app.jwt.vertify(token, this.app.config.jwt.secret);
	
	// 使用重定向
	this.ctx.redirect("/index.html");
	
	// 返回模板字符串
	// this.ctx.body = `<h2>标题</h2>`

	// 返回渲染页面
	this.ctx.render("index", {token});
    
}
module.exports = MyController;
```

##### resources.js

```js
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
```

##### member.js

```js
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
```

##### club.js

```js
// const club = require('../model/club');

const Controller = require('egg').Controller

class ClubController extends Controller {

    // restful: index/create/destroy/update

    async index() {
        let id = this.ctx.query.id;
        // 查询数据库所有，where为判断标准
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
        // 创建数据库数据
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
        // 删除数据库数据
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
        // 修改数据库数据
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
```



#### middle文件夹（中间件文件）

##### middleFunc.js

```js
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
```



#### model文件夹（数据库模型文件）

##### club.js

```js
module.exports = app=> {
    const {STRING, INTEGER} = app.Sequelize;
    // 默认情况下。sequelize将自动将所有传递的模型名称（define的第一个参数）转换为复数
    const Club = app.model.define('club', {
        // 自动生成id
        name: STRING,
    })

    return Club;
}
```

##### member.js

```js
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
```



#### public文件夹（存放静态资源）



#### view文件夹

##### getRes.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>get请求页面</title>
</head>
<body>
    <h2>这是get请求得到的页面</h2>
    {% if queryData !== '{}' %}
        <p>接收到的query数据{{queryData}}</p>
    {% endif %}
    {% if postData !== '{}' %}
        <p>接收到的post数据{{postData}}</p>
    {% endif %}
    {% if paramsData !== '{}' %}
        <p>接收到的params数据{{paramsData}}</p>
    {% endif %}
</body>
</html>
```

##### postRes.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>post请求页面</title>
</head>
<body>
    <h2>post请求页面</h2>
    {% if queryData !== '{}' %}
        <p>接收到的query数据{{queryData}}</p>
    {% endif %}
    {% if postData !== '{}' %}
        <p>接收到的post数据{{postData}}</p>
    {% endif %}
    {% if paramsData !== '{}' %}
        <p>接收到的params数据{{paramsData}}</p>
    {% endif %}
</body>
</html>
```

##### putRes.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>put请求页面</title>
</head>
<body>
    <h2>put请求页面</h2>
    {% if queryData !== '{}' %}
        <p>接收到的query数据{{queryData}}</p>
    {% endif %}
    {% if postData !== '{}' %}
        <p>接收到的post数据{{postData}}</p>
    {% endif %}
    {% if paramsData !== '{}' %}
        <p>接收到的params数据{{paramsData}}</p>
    {% endif %}
</body>
</html>
```

##### delRes.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>delete请求页面</title>
</head>
<body>
    <h2>这是delete请求得到的页面</h2>
    {% if queryData !== '{}' %}
        <p>接收到的query数据{{queryData}}</p>
    {% endif %}
    {% if postData !== '{}' %}
        <p>接收到的post数据{{postData}}</p>
    {% endif %}
    {% if paramsData !== '{}' %}
        <p>接收到的params数据{{paramsData}}</p>
    {% endif %}
</body>
</html>
```



#### **router.js举例**

```js
'sue strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app=> {
    const {router, controller} = app;
    // /app/router.js设置路由配置
    // 发送请求的四大方法: get、post、delete、put 
    router.get('/', controller.home.index);	// get表示请求为get类型，第一个参数为路径(path)，第二个参数为控制器(controller文件夹)中的home.js文件中的index方法(异步方法async)。
    router.post('/login', app.middleware.filter(), controller.home);
    router.resources("")
}


/* 
  restful风格的url可以简化路由文件
  router.resources('posts', '/api/posts', controller.posts)
  Method    path                Route Name    Controller.Action
  GEt       /posts              posts         app.contrpllers.posts.index
  GET       /posts/new          new_post      app.contrpllers.posts.new
  GET       /posts/:id          post          app.contrpllers.posts.show
  GET       /posts/:id/edit     edit_post     app.contrpllers.posts.edit
  POST      /posts              posts         app.contrpllers.posts.create
  PUT       /posts/:id          post          app.contrpllers.posts.update
  DELETE    /posts/:id          post          app.contrpllers.posts.destroy
*/
```



#### config文件夹（配置设置文件夹）

##### config.default.js（配置默认文件）

```js
/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */

const path = require("path");
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1649732351545_3191';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  // 关闭post安全验证
  config.security = {
    csrf: {
      enable: false,
    },
  };

  // 设置默认的模板引擎是nunjucks
  config.view = {
    defaultViewEngine: 'nunjucks'
  };

  // 设置egg-cors解决跨域
  config.cors = {
    origin: "*",
    allowMethod: "GET, HEAD, PUT, POST, DELETE, PATCH"
  };

  // 设置egg-jwt
  config.jwt = {
    secert: "wozhenbang"
  };

  // 绑定数据库
  config.sequelize = {
    dialet: 'mysql',
    database: 'test_egg',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'lq123456',
    timezone: '+08:00',
  };

  // 简化静态资源路径
  config.static = {
    prefix: "/",  // 访问路径
    dir: path.join(appInfo.baseDir, 'app/public'),  // 设置静态文件目录
  };

  return {
    ...config,
    ...userConfig,
  };
};
```

##### plugin.js

```js
'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }

  // 引入egg-view-nunjucks插件解决模板渲染问题
  nunjucks: {
    enable: true,
    package: 'egg-view-nunjucks',
  },
  // 引入egg-cors插件解决跨域问题
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  // 引入egg-jwt插件实现用户登录状态
  jwt: {
    enable: true,
    package: 'egg-jwt'
  },
  // 引入egg-sequelize，解决数据库创建问题
  sequelize: {
    enable: true,
    package: 'egg-sequelize'
  },
};
```



#### app.js（程序开始时执行，改代码作用是在数据库中创建表）

```js
// 在项目根目录中创建app.js文件，初始化数据库
module.exports = app=> {
    app.beforeStart(async function() {
        // await app.model.sync({force: true});    // 开发环境使用，会删除数据表
        // sync方法会根据模型去创建表。
        await app.model.sync({});
    });
};
```

