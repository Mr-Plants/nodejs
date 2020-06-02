module.exports = {
  get body() {
    return this.response.body
  },
  set body(val) {
    this.response.body = val;
  },
  get url() {
    return this.request.url;
  },
  get method() {
    return this.request.method;
  }

}
