Promise.prototype.all = function (promises) {
  return new Promise((resolve, reject) => {
    let arr = [], j = 0;

    const processData = (value, index) => {
      arr[index] = value;
      if (++j === promises.length) {
        resolve(arr);
      }
    }

    for (let i = 0, len = promises.length; i < len; i++) {
      const val = promises[i];
      if (val && typeof val.then === 'function') {
        val.then(
          res => {
            processData(res, i);
          },
          reject
        )
      } else {
        processData(val, i);
      }
    }
  })
}
