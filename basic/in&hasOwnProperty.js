// 区别

const arr = ['foo', 'bar', , 'baz'];
arr.describe = 'just array~';

// 不能判断空元素，可以判断非数字属性
console.log('1' in arr)   // true
console.log(1 in arr)   // true
console.log(2 in arr)    // false
console.log('describe' in arr)  //true
// console.log(arr[2] === arr2[2])
console.log('=====================')
console.log(Object.prototype.hasOwnProperty.call(arr, '1'))  // true
console.log(Object.prototype.hasOwnProperty.call(arr, 1)) // true
console.log(Object.prototype.hasOwnProperty.call(arr, 2))  // false
console.log(Object.prototype.hasOwnProperty.call(arr, 'describe')) // true

console.log('============================')
// 测试对象
const bruce = {
  self_prop: 'bruce',
}
Object.setPrototypeOf(bruce, {'extend_prop': 233})
let self_symbol = Symbol('self_symbol')
// 加入symbol属性
bruce[self_symbol] = "secret";
// 不可枚举属性
Object.defineProperty(bruce, 'self_non_enumerable', {
  enumerable: false,
  value: 'unKnow'
})

console.log('self_prop' in bruce)   // true
console.log(self_symbol in bruce)  // false
console.log('self_non_enumerable' in bruce)   // true
console.log('extend_prop' in bruce)  // true

console.log('------------------------------')

console.log(bruce.hasOwnProperty('self_prop'))   // true
console.log(bruce.hasOwnProperty(self_symbol))  // false
console.log(bruce.hasOwnProperty('self_non_enumerable'))  // true
console.log(bruce.hasOwnProperty('extend_prop'))   // false
