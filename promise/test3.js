Promise.resolve(666).then(123, 456).then(v => {
  console.log(v)
})


Promise.reject(404).then(123, 456).catch(err => {
  console.log(err)
})

// return 后面不能跟throw，因为throw
// const reject = err => {
//   return throw err
// };
// const reject2 = err => console.log(err);

// reject(10086)


const p1 = new Promise((resolve, reject) => {
  resolve('hello');
})
  .then(result => result)
  .catch(e => e);

// 错误被catch捕获后，p2实际指向catch返回的promise，如果catch没有将错误throw出去，则会返回一个resolve的promise
// 所以会执行all的onFulfilled
// 但是如果自己没有使用catch捕获，则会被all方法的catch捕获
const p2 = new Promise((resolve, reject) => {
  throw new Error('报错了');
})
  .then(result => result)
  .catch(e => {
    // console.log(e)
    // return e;
    // throw e
  });

// result [ 'hello', undefined ]
Promise.all([p1, p2])
  .then(result => console.log('result', result))
  .catch(e => console.log('error', e));
