const STATUS = {
  PENDING: 'PENDING',
  FULFILLED: 'FULFILLED',
  REJECTED: 'REJECTED',
}


class Promise {
  status = STATUS.PENDING; // default status pending
  value;   // resolve data
  reason; // reject reason
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
    // then函数一定要返回一个promise，提供链式调用
    return promise2;
  }
}

/**
 * 处理二次封装的promise
 * @param promise2
 * @param x 第一个then执行回调函数后的返回值，可能是undefined、对象、简单类型数据、函数
 * @param resolve
 * @param reject
 * @returns {*}
 */
function resolvePromise(promise2, x, resolve, reject) {
  // todo 自己等待自己，循环运用报错？
  if (promise2 === x) {
    return reject(new TypeError('Chaining cycle detected for promise'))
  }
  // 如果x是对象或者函数
  if (x !== null && (typeof x === "object" || typeof x === 'function')) {
    try {
      // then可能不存在，取不到抛错
      let then = x.then;
      if (typeof then === 'function') {
        then.call(x, resolve, reject)
      }
    } catch (err) {
      reject(err)
    }
  } else {
    // 简单类型数据直接resolve
    resolve(x)
  }
}

module.exports = {
  Promise
}
