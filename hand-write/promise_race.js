function race(promises) {

  return new Promise((resolve, reject) => {
    for (let i = 0, len = promises.length; i < len; i++) {
      let val = promises[i];
      if (val.then && typeof val.then === 'function') {
        val.then(resolve, reject);
      } else {
        resolve(val);
      }
    }
  })
}
