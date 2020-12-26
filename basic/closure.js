// 模拟块级作用域
for (var i = 0; i < 5; i++) {
  (function closure(j) {
    setTimeout(() => {
      console.log(j)
    }, 0)
  })(i)
}


// 创建私有变量
function privateVariable() {
  let _name = 'jack';
  return {
    getName() {
      return _name;
    }
  }
}

let obj = privateVariable();
console.log(obj.getName())  // 'jack'
