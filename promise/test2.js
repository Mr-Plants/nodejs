const someAsyncThing = function () {
  return new Promise(function (resolve, reject) {
    // 下面一行会报错，因为x没有声明
    resolve(x + 2);
  });
};

// 如果不设置err回调或者使用catch捕获错误，虽然会打印错误但是代码会继续执行
// someAsyncThing().then(res => {
//   console.log('everything is great');
// });

// executor的错误被捕获
// someAsyncThing().then(res => {
//   console.log('everything is great');
// }, err => {
// });

// executor的错误被捕获
someAsyncThing().then(res => {
  console.log('everything is great');
}).catch(e => {
  console.log('ops...')
})

// err回调不会捕获then中的错误，catch回调可以捕获
Promise.resolve(2333).then(res => {
  console.log(foo)
  console.log('everything is great');
}, err => {
  console.log('err回调捕获')
}).catch(err => {
  console.log('catch捕获')
})


setTimeout(() => {
  console.log(123)
}, 1000);

// process.on('unhandledRejection', function (err, p) {
//   throw err;
// });
