const http = require('http')
const response = require('./response')
const request = require('./request')
const context = require('./context')


class Koa {
  constructor() {
    this.createContext('', '')
  }

  use(callback) {

    this.callback = callback;
  }

  listen(...args) {
    const h = http.createServer(this.callback)
    h.listen(...args)
  }

  createContext(req, res) {
    const ctx = Object.create(context)
    ctx.request = Object.create(request)
    ctx.response = Object.create(response)

    console.log(ctx)
  }
}

module.exports = Koa;
