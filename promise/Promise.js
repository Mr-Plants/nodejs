const STATUS = {
  PENDING: 'PENDING',
  FULFILLED: 'FULFILLED',
  REJECTED: 'REJECTED',
}

function resolvePromise(promise) {

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
    switch (this.status) {
      case STATUS.FULFILLED:
        onFulFilled(this.value);
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
  }
}

module.exports = {
  Promise
}
