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
      }
    }

    let reject = reason => {
      if (this.status === STATUS.PENDING) {
        this.status = STATUS.REJECTED;
        this.reason = reason;
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


  }
}
