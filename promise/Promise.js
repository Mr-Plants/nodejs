const STATUS = {
  PENDING: 'PENDING',
  FULFILLED: 'FULFILLED',
  REJECTED: 'REJECTED',
}

/**
 * 干嘛的？
 * @param promise
 */
function resolvePromise(promise2, x, resolve, reject) {

}

class Promise {
  status = STATUS.PENDING; // default status pending
  value   // resolve data
  reason  // reject reason
  onResolveCallbacks = [];
  onRejectCallbacks = [];

  constructor(executor) {
    const resolve = value => {
      if (this.status === STATUS.PENDING) {
        this.status = STATUS.FULFILLED;
        this.value = value;
        this.onResolveCallbacks.forEach(fn => fn());
      }
    }

    const reject = reason => {
      if (this.status === STATUS.PENDING) {
        this.status = STATUS.REJECTED;
        this.reason = reason;
        this.onRejectCallbacks.forEach(fn => fn());
      }
    }

    try {
      executor(resolve, reject)
    } catch (err) {
      reject(err)
    }

  }

  then(onFulFilled, onRejected) {
    const promise2 = new Promise((resolve, reject) => {
      switch (this.status) {
        case STATUS.FULFILLED:
          let x = onFulFilled(this.value);
          resolvePromise(promise2, x, resolve, reject);
          break;
        case STATUS.REJECTED:
          onRejected(this.reason);
          break;
        //  如果还在pending，则需要异步处理，使用发布订阅模式
        case STATUS.PENDING:
          this.onResolveCallbacks.push(() => {
            onFulFilled(this.value)
          })
          this.onRejectCallbacks.push(() => {
            onRejected(this.reason)
          })
          break;
      }
    })
    // then函数一定要返回一个promise
    return promise2;
  }
}

module.exports = {
  Promise
}
