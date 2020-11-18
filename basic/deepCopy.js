function getType(data) {
  return Object.prototype.toString.call(data)
}

function isObject(data) {
  // return (typeof data === 'object' || typeof data === 'function') && data !== null
  return typeof data === 'object' && data !== null
}

function deepCopy(data, hash = new WeakMap()) {
  // 简单数据类型，直接返回结果
  if (!isObject(data)) {
    return data;
  }
  // 如果hash中包含就直接返回，避免重复引用无限递归
  if (hash.has(data)) {
    return hash.get(data)
  }

  // 引用数据类型，先区分是否是特殊对象
  if (getType(data) === '[object RegExp]') return new RegExp(data)
  if (getType(data) === '[object Date]') return new Date(data)
  if (getType(data) === '[object Function]') return new Function(data)

  // 剩下数组和对象
  let newData = Array.isArray(data) ? [] : {};

  // 保存对象引用
  hash.set(data, newData);

  // 遍历数据，执行递归
  Reflect.ownKeys(data).forEach(key => {
    newData[key] = deepCopy(data[key], hash)
  })

  return newData
}

let obj = {name: 233, gender: 1}

const test = {
  name: "bruce",
  a1: undefined,
  a2: null,
  a3: 123,
  a4: '',
  a5: () => {
  },
  a6: obj,
  a7: obj,
  birth: new Date(1992, 0, 3),
  a8: /123$./g,
  [Symbol('a9')]: 2,
  book: {title: "You Don't Know JS", price: "45"},
  arr: [{name: 'foo'}, {name: 'bar'}, {name: 'baz'}]
}
test.a4 = test;
const copy = deepCopy(test)
// console.log(test)
console.log(copy)

// todo 需要处理function吗
console.log(copy.a5 === test.a5)
test.a5 = 666;
console.log(copy.a5)


console.log(test.a6 === test.a7)

console.log(copy.a6 === copy.a7)
console.log(copy.a4 === copy)
