function foo(cb) {
  console.log('start')
  cb();
  console.log('end')
}

// 同步回调，回调函数在主函数体内执行完毕
function _sync() {
  console.log(2333)
}

// 异步回调，回调函数在主函数体外执行完毕
function _async() {
  setTimeout(function () {
    console.log(2333)
  }, 100)
}

// start
// 2333
// end
foo(_sync)

// start
// end
// 2333
foo(_async)
