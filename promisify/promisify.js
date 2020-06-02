/**
 * 模拟node promisify函数
 * @param fn
 * @returns {function(): Promise<any>}
 */
module.exports = function promisify(fn) {
  return function (...args) {
    // 拿出fn的所有参数的集合，此时是不包含回调函数的
    return new Promise((resolve, reject) => {
      // 向参数集合增加回调函数（最后一个参数）
      args.push((err, data) => {
        if (err) {
          return reject(err)
        }
        resolve(data)
      })

      // invoke origin function
      fn.apply(null, args)
    })
  }
}

