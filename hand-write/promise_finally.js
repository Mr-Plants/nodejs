Promise.prototype.finally = function (callback) {
//  首先必须要返回一个promise，后面可以继续then，需要调用this.then
  return this.then(
    value => {
      callback();
      return value;
    },
    reason => {
      callback();
      throw reason;
    }
  )
}


Promise.resolve(2333).finally(() => {
  console.log('finally');
  // throw 666;
}).then(res => console.log('接收到了res', res))
  .catch(err => console.log('接收到了err', err))
