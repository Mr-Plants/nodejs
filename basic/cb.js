// 同步回调
function foo(cb) {
  console.log('start')
  cb();
  console.log('end')
}

function _sync() {
  console.log(2333)
}

foo(_async)

function _async() {
  setTimeout(function () {
    console.log(2333)
  }, 0)
}

foo(_sync)
