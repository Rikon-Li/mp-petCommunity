const Router = require("koa-router");
const Forum= require("../model/forum");

const router = new Router({ prefix: "/api/forum" });

router.post("/add_forum", async (ctx) => {
  const req=ctx.request.body
  const newForum = await new Forum({ 
      openid:req.openid,
      content:req.content,
      avatarUrl:req.avatarUrl,
      nickName:req.nickName,
      pic:req.pic,

    }).save();

  ctx.status = 200;
  ctx.body = {
    message: "ok",
  };
});
router.get("/all_forum", async (ctx) => {
    const data=await Forum.find()
  console.log(data);
  
    ctx.status = 200;
        ctx.body = {
          message: "ok",
          data:data
        };
  });

module.exports = router;
