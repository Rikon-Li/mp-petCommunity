const Router = require("koa-router");
const axios = require("axios");
const JWT = require("jsonwebtoken");
const { Form } = require("multiparty");
const path = require("path");

const router = new Router({
  prefix: "/api/tools",
});

// 上传图片的接口，是post
router.post("/img/upload", async (ctx) => {
  console.log("ok.....");
  // 解析formdata数据的对象
  const form = new Form({
    uploadDir: path.join(__dirname, "../../images"), //一定要是存在的路径
  });

  const tmpPath = await new Promise((resolve, reject) => {
    form.parse(ctx.req, (error, fields, files) => {
      if (!error) {
        const imagePath = files.images[0].path;
        // 根据参数1的地址找参数2的相对路径地址
        const result = path.relative(path.join(__dirname, "../../"), imagePath);
        // 响应客户端图片地址
        resolve("/" + result);
      }
    });
  });

  ctx.status = 200;
  ctx.body = {
    imagePath: tmpPath,
  };
});

module.exports = router;
