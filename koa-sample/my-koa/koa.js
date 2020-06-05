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
    return this
  }

  listen(...args) {
    const server = http.createServer(async (req, res) => {
      const ctx = this.createContext(req, res)
      const fn = this.compose(this.middlewares)
      await fn(ctx)
      res.end(ctx.body)
    })
    server.listen(...args)
  }

  /**
   * todo 构建上下文
   * @param req
   * @param res
   * @returns {{readonly method: *, body, readonly url: *}}
   */
  createContext(req, res) {
    const ctx = Object.create(context)
    ctx.request = Object.create(request)
    ctx.response = Object.create(response)
    ctx.req = ctx.request.req = req;
    ctx.res = ctx.response.res = res;
    return ctx;
  }

  /**
   * 复合函数
   * 把每一个异步中间件都展开，如果遇到async，就执行下一个中间件，依此类推，直到执行完所有的中间件，再从
   * 形成洋葱圈结构
   * @param middlewares 中间件
   */
  compose(middlewares) {
    return function (ctx) {
      return dispatch(0)

      function dispatch(i) {
        const fn = middlewares[i];
        // 递归终结条件，如果取到了middleware最后一个
        if (!fn) {
          return Promise.resolve();
        }

        return Promise.resolve(
          fn(ctx, function next() {
            return dispatch(i + 1)
          })
        )
      }
    }
  }
}

module.exports = Koa;
