const Koa = require('./koa')

const koa = new Koa();

koa.listen(3000, () => {
  console.log('listen port 3000')
})

async function fn1(ctx, next) {
  console.log(1)
  await next()
  console.log(6)
}

async function fn2(ctx, next) {
  console.log(2)
  await next()
  console.log(5)
}

async function fn3(ctx, next) {
  console.log(3)
  await next()
  console.log(4)
}

koa.use(fn1).use(fn2).use(fn3)

function delay(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}
