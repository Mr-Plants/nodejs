const http = require('http')
const response = require('./response')
const request = require('./request')
const context = require('./context')


class Koa {
  constructor() {
    this.middlewares = [];
  }

  /**
   * 使用中间件（支持异步中间件）
   * @param middleware
   */
  use(middleware) {
    this.middlewares.push(middleware)
  }

  listen(...args) {
    const server = http.createServer((req, res) => {
      const ctx = this.createContext(req, res)
      const fn = this.compose(this.middlewares)
      res.end(ctx.body)
    })
    server.listen(...args)
  }

  createContext(req, res) {
    const ctx = Object.create(context)
    ctx.request = Object.create(request)
    ctx.response = Object.create(response)
    ctx.req = req;
    ctx.res = res;
    console.log(ctx)
  }

  /**
   * 复合函数
   * @param middlewares 中间件
   */
  compose(middlewares) {

  }
}

module.exports = Koa;
