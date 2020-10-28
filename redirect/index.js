const Koa = require('koa')

const app = new Koa()

app.listen(3000, () => {
  console.log('app listen in 3000')
})
