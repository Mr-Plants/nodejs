// 构建继承对象
const person = {extend_prop: 'chinese'};
person[Symbol('extend_symbol')] = 'symbol';
Object.defineProperty(person, 'extend_nonEnumerable', {
  value: '',
  enumerable: false
})

// 测试对象
const bruce = {
  self_prop: 'bruce',
}

// 修改原型继承，生产中不推荐这么做
bruce.__proto__ = person
// 加入symbol属性
bruce[Symbol('self_symbol')] = "secret";
// 不可枚举属性
Object.defineProperty(bruce, 'self_nonEnumerable', {
  enumerable: false,
  value: 'unKnow'
})

for (let key in bruce) {
  // 展示对象自身及继承的可枚举属性，不展示Symbol属性、不可枚举属性
  console.log(key)   // self_prop extend_prop
  // 继承属性
}

// 展示对象自身的可枚举属性，不展示Symbol属性、不可枚举属性、继承属性
console.log(Object.keys(bruce))   // [ 'self_prop' ]
// 最少的

// 展示对象自身的可枚举及不可枚举属性，不展示Symbol属性、继承属性
console.log(Object.getOwnPropertyNames(bruce))  // [ 'self_prop', 'self_nonEnumerable' ]
// 自身不可枚举


// 展示对象自身的可枚举、不可枚举、symbol属性，不展示继承属性
console.log(Reflect.ownKeys(bruce))  // [ 'self_prop', 'self_nonEnumerable', Symbol(self_symbol) ]
