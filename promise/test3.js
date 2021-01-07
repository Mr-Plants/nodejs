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

reject(10086)
