// 类型转换

let s1 = Symbol('s1')

// console.log('s1:' + s1)  // TypeError: Cannot convert a Symbol value to a string
console.log(String(s1))  // 'Symbol(s1)'
console.log(s1.toString())  // 'Symbol(s1)'
// console.log(+s1)   // TypeError: Cannot convert a Symbol value to a number
// console.log(Number(s1))  // TypeError: Cannot convert a Symbol value to a number
console.log(Boolean(s1))  // true
console.log(!!s1)  // true

// 赋值取值
// symbol需要使用中括号[]取值赋值，否则将作为字符串处理
let s2 = Symbol('s2')

let obj = {}
// 点运算符：总是用字符串作为属性名
obj.s2 = 2333
console.log(obj[s2])   // undefined
console.log(obj.s2)   // 2333

obj[s2] = 2333  //这样属性名才是symbol

// 或者这样初始化也可以
let obj2 = {
  [s2]: 233
}

// 可以在对象上绑定Symbol，使它轻易不会被遍历到
let size = Symbol('size');

class Collection {

  constructor() {
    this[size] = 0;
  }

  addItem(item) {
    this[this[size]] = item
    this[size]++
  }

  // 将sizeOf方法放到构造函数作为静态方法防止外部自己篡改size
  static sizeOf(instance) {
    return instance[size]
  }
}

const c1 = new Collection();
console.log(Collection.sizeOf(c1))
c1.addItem(1)
console.log(Collection.sizeOf(c1))
c1[size] = 100
console.log(Collection.sizeOf(c1))

console.log(Object.getOwnPropertyNames(c1))  //['0']
console.log(Object.getOwnPropertySymbols(c1))  // [ Symbol(size) ]


class Person {
  constructor() {
    this[Symbol.toStringTag] = 'Person'
  }

  [Symbol.hasInstance](instance) {

  }
}

let p = new Person()
console.log(p + '')
