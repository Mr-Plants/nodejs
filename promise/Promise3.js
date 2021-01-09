const STATUS = {
  FULFILLED: 'FULFILLED',
  REJECTED: 'REJECTED',
  PENDING: 'PENDING'
}

class Promise {
  status = STATUS.PENDING;
  value;
  reason;
  onFulfilledCallbacks = [];
  onRejectedCallbacks = [];

  constructor(executor) {
    let resolve = value => {
      if (this.status === STATUS.PENDING) {
        this.status = STATUS.FULFILLED;
        this.value = value;
        this.onFulfilledCallbacks.forEach(fn => fn());
      }
    }

    let reject = reason => {
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
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v;
    onRejected = typeof onRejected === 'function' ? onRejected : err => {
      throw err
    }

    let promise2 = new Promise((resolve, reject) => {
      const fulfilledBlock = () => {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0)
      }

      const rejectedBlock = () => {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e)
          }
        }, 0)
      }

      if (this.status === STATUS.FULFILLED) {
        fulfilledBlock();
      }

      if (this.status === STATUS.REJECTED) {
        rejectedBlock();
      }

      if (this.status === STATUS.PENDING) {
        this.onFulfilledCallbacks.push(fulfilledBlock);
        this.onRejectedCallbacks.push(rejectedBlock);
      }
    })

    return promise2;
  }

  catch(errCallback) {
    return this.then(null, errCallback);
  }

  static resolve(value) {
    return new Promise((resolve, reject) => {
      resolve(value);
    })
  }

  static reject(reason) {
    return new Promise((resolve, reject) => {
      reject(reason)
    })
  }

  static race(promises) {
    return new Promise((resolve, reject) => {
      for (let i = 0; i < promises.length; i++) {
        let val = promises[i];
        if (val && typeof val === 'function') {
          val.then(resolve, reject)
        } else {
          resolve(val);
        }
      }
    })
  }

  static all(promises) {
    return new Promise((resolve, reject) => {
      let arr = [];
      let i = 0;
      let processData = (index, data) => {
        arr[index] = data;
        if (++i === promises.length) {
          resolve(arr)
        }
      }
      for (let i = 0; i < promises.length; i++) {
        let val = promises[i];
        if (val && typeof val.then === 'function') {
          val.then(value => {
            processData(i, value)
          }, reject)
        } else {
          processData(val);
        }

      }
    })
  }
}


function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'));
  }

  if ((x !== null && typeof x === 'object') || typeof x === 'function') {
    let called;
    try {
      let then = x.then;
      if (typeof then === 'function') {
        then.call(x, y => {
          if (called) return;
          called = true;
          resolvePromise(promise2, y, resolve, reject);
        }, err => {
          if (called) return
          called = true;
          reject(err);
        })
      }
    } catch (e) {
      if (called) return
      called = true;
      reject(e)
    }
  } else {
    resolve(x);
  }


}
