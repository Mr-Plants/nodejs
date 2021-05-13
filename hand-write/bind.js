// 手写bind实现


Function.prototype.bind2 = function (obj) {
  if (typeof this !== 'function') {
    throw TypeError(this + ' muse be function')
  }
  let arg1 = [...arguments].slice(1);
  return (...arg2) => {
    this.apply(obj, [...arg1, ...arg2]);
  };
}


// test code

function test() {
  console.log('test', this)
  console.log(arguments)
}

let obj = {name: 'lee'}
let test2 = test.bind2(obj, 1, 2);
// let test3 = Function.prototype.bind2.call('test2').bind2(obj);

test2(3, 4, 5)
