// 自己实现instanceof

function my_instanceof(target, origin) {
  const prototype = origin.prototype;
  while (target) {
    // 也可以使用Object.getPrototypeOf
    if (target.__proto__ === prototype) return true;
    target = target.__proto__;
  }

  return false;
}


// test code

console.log(my_instanceof([], Array))
console.log(my_instanceof([], Object))
console.log(my_instanceof([], String))
