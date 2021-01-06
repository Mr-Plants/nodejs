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
      // 这里巧妙的利用pending状态不可逆来保证resolve或者reject只能有一个执行
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
    // then函数一定要返回一个promise，提供链式调用，这个promise需要把onFulfilled函数的返回值（x）传递给下一个then。
    // onFulfilled函数可能返回简单类型的数据，那么只需要继续resolve出去即可（透传）
    // onFulfilled函数可能返回对象（thenable）或函数，则需要执行对象的then方法，没有then则直接reject
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
    let called = false;  // 保证thenable里面的resolve或者reject只执行一次
    try {
      // then可能不存在，取不到抛错
      let then = x.then;
      if (typeof then === 'function') {
        then.call(x, v => {
            if (called) return;
            called = true;
            // 这里还是需要执行resolve，但是还是可能resolve出去简单值、promise等，如果是promise需要递归的去执行promise，
            // 直到最内层的promise状态改变才会一层层的把最外层的promise（当前then返回的promise，即promise2）状态改变
            // 洋葱结构，精妙的地方在于把最外层promise的resolve和reject传递给了最内层
            resolvePromise(promise2, v, resolve, reject)
          },
          err => {
            // 将自己的错误穿透给下一个then
            if (called) return;
            called = true;
            reject(err)
          })
      }
    } catch (err) {
      reject(err)
    }
  } else {
    // 简单类型数据直接resolve
    resolve(x)
  }
}
