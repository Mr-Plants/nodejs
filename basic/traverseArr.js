const arr = ['foo', 'bar', , 'baz'];
arr.describe = 'just array~';

// 跳过空元素
// 0 foo
// 1 bar
// 3 baz
// describe just array~
for (let i in arr) {
  console.log(i, arr[i]);
}

// 跳过空元素，跳过非数字属性
// foo
// bar
// baz
arr.forEach(item => console.log(item))

// 跳过非数字属性
// 0 foo
// 1 bar
// 2 undefined
// 3 baz
for (let i = 0; i < arr.length; i++) {
  console.log(i, arr[i])
}


// 跳过非数字属性
// foo
// bar
// undefined
// baz
for (let v of arr) {
  console.log(v)
}

console.log(Object.prototype.hasOwnProperty.call(arr,'describe'))  // true
console.log(Object.prototype.hasOwnProperty.call(arr,2))  // false
