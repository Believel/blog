const router = require('koa-router')()



router.get('/', async (ctx, next) => {
  // 视图渲染
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string/:id', async (ctx, next) => {
  console.log("id", ctx.params);
  console.log("query", ctx.query.age);
  // 字符串
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  // JSON API
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
