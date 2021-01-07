const STATUS = {
  PENDING: 'PENDING',
  FULFILLED: 'FULFILLED',
  REJECTED: 'REJECTED',
}


class Promise {
  status = STATUS.PENDING; // default status pending
  value;   // resolve data
  reason; // reject reason
  onResolvedCallbacks = [];
  onRejectedCallbacks = [];

  constructor(executor) {
    const resolve = value => {
      if (value instanceof Promise) {
        return value.then(resolve, reject)
      }
      // 这里巧妙的利用pending状态不可逆来保证resolve或者reject只能有一个执行
      if (this.status === STATUS.PENDING) {
        this.status = STATUS.FULFILLED;
        this.value = value;
        this.onResolvedCallbacks.forEach(fn => fn());
      }
    }

    const reject = reason => {
      if (this.status === STATUS.PENDING) {
        this.status = STATUS.REJECTED;
        this.reason = reason;
        this.onRejectedCallbacks.forEach(fn => fn());
      }
    }

    try {
      executor(resolve, reject)
    } catch (err) {
      reject(err)
    }

  }

  then(onFulfilled, onRejected) {
    // 如果onFulFilled不是函数，则直接return上一个promise的值，会被resolvePromise包装成resolve（透传）
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v;
    // 如果onRejected不是函数，则不能直接return，会被resolvePromise包装为resolve，应该抛出错误，包装为reject
    onRejected = typeof onRejected === 'function' ? onRejected : err => {
      throw err
    };

    const promise2 = new Promise((resolve, reject) => {
      if (this.status === STATUS.FULFILLED) {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e)
          }
        }, 0)
      }

      if (this.status === STATUS.REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e)
          }
        }, 0)
      }

      // 如果还在pending，一般是异步执行的代码，采用发布订阅模式，储存回调函数
      if (this.status === STATUS.PENDING) {
        this.onResolvedCallbacks.push(() => {
          // 规定fulfilled和rejected函数必须异步执行，浏览器使用自己的微任务实现，我们使用setTimeout实现
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              // 执行fulfilled和rejected函数时如果抛错，直接reject
              reject(e)
            }
          }, 0)
        })
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e)
            }
          }, 0)
        })
      }
    })
    // then函数一定要返回一个promise，提供链式调用，这个promise需要把onFulfilled函数的返回值（x）传递给下一个then。
    // onFulfilled函数可能返回简单类型的数据，那么只需要继续resolve出去即可（透传）
    // onFulfilled函数可能返回对象（thenable）或函数，则需要执行对象的then方法，没有then则直接reject
    return promise2;
  }

  catch(errCallback) {
    return this.then(null, errCallback);
  }

  static resolve(data) {
    return new Promise((resolve, reject) => {
      resolve(data)
    })
  }

  static reject(reason) {
    return new Promise((resolve, reject) => {
      reject(reason)
    })
  }

  /**
   * race 精妙的地方在于在同步for循环中将return的promise的executor交给所有传入的promise。这样在同步代码执行完毕后，
   * 第一个出现结果的promise就会改变这个return的promise，因为promise状态一旦改变就不会再变，所以太妙了！！！
   * @param promises
   * @returns {Promise}
   */
  static race(promises) {
    return new Promise((resolve, reject) => {
      for (let i = 0; i < promises.length; i++) {
        promises[i].then(resolve, reject);
      }
    })
  }

  static all(promises) {
    let arr = [];
    let i = 0;

    // 将所有resolve的子promise按照入参的顺序保存，如果全部resolve，就resolve总的promise
    function processResult(index, val, resolve) {
      arr[index] = val;
      if (++i === promises.length) {
        resolve(arr);
      }
    }

    return new Promise((resolve, reject) => {
      for (let i = 0; i < promises.length; i++) {
        promises[i].then(res => {
          processResult(i, res, resolve);
        }).catch(reject)
      }
    })
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
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
  }
  // 如果x是对象或者函数
  if ((x !== null && typeof x === "object") || typeof x === 'function') {
    let called;  // 保证thenable里面的resolve或者reject只执行一次
    try {
      // then可能不存在，取不到抛错
      let then = x.then;
      if (typeof then === 'function') {
        then.call(x, y => {
            if (called) return;
            called = true;
            // 这里还是需要执行resolve，但是还是可能resolve出去简单值、promise等，如果是promise需要递归的去执行promise，
            // 直到最内层的promise状态改变才会一层层的把最外层的promise（当前then返回的promise，即promise2）状态改变
            // 洋葱结构，精妙的地方在于把外层promise的resolve和reject传递给了内层
            resolvePromise(promise2, y, resolve, reject)
          },
          r => {
            // 将自己的错误穿透给下一个then
            if (called) return;
            called = true;
            reject(r)
          })
      }
    } catch (err) {
      // 这里也算执行失败了
      if (called) return;
      called = true;
      reject(err)
    }
  } else {
    // 简单类型数据直接resolve
    resolve(x)
  }
}

// 测试代码
Promise.defer = Promise.deferred = function () {
  let dfd = {};
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  })
  return dfd;
}


module.exports = Promise
