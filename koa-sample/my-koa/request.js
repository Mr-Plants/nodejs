module.exports = {
  get url() {
    // todo req哪来的
    return this.req.url
  },
// 将请求方式转为小写
  get method() {
    return this.req.method.toLowerCase();
  }
}
