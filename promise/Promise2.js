const STATUS = {
  PENDING: 'PENDING',
  FULFILLED: 'FULFILLED',
  REJECTED: 'REJECTED',
}

class Promise2 {
  status  // 当前状态
  value   // resolve时的data
  reason  // reject时的data
  onResolveCallbacks = [];
  onRejectCallbacks = [];

  constructor(executor) {
    this.status = STATUS.PENDING;

    const resolve = (value) => {
      if (this.status === STATUS.PENDING) {
        this.status = STATUS.FULFILLED;
        this.value = value;
        this.onResolveCallbacks.forEach(fn => fn());
      }
    }

    const reject = (reason) => {
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
  Promise: Promise2
}
