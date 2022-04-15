class myKoa {
  middleware = []
  ctx = {
    a: 1
  }
  constructor() {

  }
  use(fn) {
    this.middleware.push(fn)
  }
  listenCallback() {
    let fn = this.compose(this.middleware)
    return fn(this.ctx).then(this.response)
  }
  response() {
    console.log('响应数据')
  }
  compose(middleware) {
    return function(ctx) {
      return dispatch(0)
      function dispatch(index) {
        let fn = middleware[index]
        if (!fn) return Promise.resolve();
        return fn(ctx, () => dispatch(index + 1))
      }
    }
  }
}

let newKoa = new myKoa()

newKoa.use(async (ctx, next) => {
  console.log(ctx)
  console.log('第一层 start')
  await next()
  console.log('第一层 end')
})

newKoa.use(async (ctx, next) => {
  console.log('第二层 start')
  await next()
  console.log('第二层 end')
})
newKoa.listenCallback()