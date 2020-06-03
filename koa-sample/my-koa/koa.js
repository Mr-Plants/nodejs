const http = require('http')
const response = require('./response')
const request = require('./request')
const context = require('./context')


class Koa {
  constructor() {
    this.middlewares = [];
  }

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

  compose(middlewares) {

  }
}

module.exports = Koa;
