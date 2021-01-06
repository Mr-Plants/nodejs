const p1 = new Promise((resolve, reject) => {
  resolve(233)
})

p1.then(
  res => {
    console.log('1', res)
    return {
      name: 666,
      then(resolve, reject) {
        resolve(this.name);
      }
    }
  }
).then(res => {
  console.log('2', res)
})

Promise.resolve().then(
  res => {
    console.log('1', res)
    return {
      name: 666,
      then(resolve, reject) {
        reject(this.name);
      }
    }
  }
).catch(err => {
  console.log('error:', err)
})

Promise.resolve().then(
  res => {
    console.log('1', res)
    return {
      name: 666,
      then(resolve, reject) {
        resolve(Promise.reject('哈哈哈'));
      }
    }
  }
).catch(err => {
  console.log('error:', err)
})

// 循环引用
// let p2 = p1.then(
//   res => {
//     console.log('p1..next');
//     return p2
//   }
// )

// todo 阮老师的文章说promise的内部错误不能被外界捕获是什么意思？
// const p3 = new Promise(resolve => {
//   resolve(a)
// })

// try {
//   const p2 = new Promise(resolve => {
//     resolve(a)
//   })
// } catch (e) {
//   console.log('ops')
//   console.log(e)
// }
