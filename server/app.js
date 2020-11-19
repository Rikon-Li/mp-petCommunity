const Koa = require("koa");
const error = require("koa-json-error");
const parameter = require("koa-parameter");
const bodyparser = require("koa-bodyparser");
const auth = require("./routes/auth");
const user = require("./routes/user");
const forum = require("./routes/forum");
const toolsRoutes = require("./routes/tools");

const app = new Koa();

// 处理错误
app.use(
  error({
    postFormat(error, { stack, ...rest }) {
      return rest;
    },
  })
);

// 解析参数
app.use(bodyparser());

// 验证参数
parameter(app);

// 使用路由
app.use(auth.routes()).use(auth.allowedMethods());
app.use(user.routes()).use(user.allowedMethods());
app.use(forum.routes()).use(forum.allowedMethods());
app.use(toolsRoutes.routes()).use(toolsRoutes.allowedMethods());

module.exports = app;
