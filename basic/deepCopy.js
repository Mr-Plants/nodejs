function getType(data) {
  return Object.prototype.toString.call(data)
}

const iterableObject = Symbol('iteratorObject');

function handleObject(data) {
  const type = getType(data);
  if (type === '[object Object]' || type === '[object Array]') {
    return iterableObject;
  } else {
    if ((typeof data === 'object' || typeof data === 'function') && data !== null) {
      // function set map regexp date....
      return new data.constructor(data);
    } else {
      // 基础数据类型
      return data;
    }
  }
}

function deepCopy(data, hash = new WeakMap()) {
  const handledData = handleObject(data);
  if (handledData !== iterableObject) {
    return handledData;
  }
  // 如果hash中包含就直接返回，避免重复引用无限递归
  if (hash.has(data)) {
    return hash.get(data)
  }

  // 剩下数组和对象
  const target = Array.isArray(data) ? [] : {};

  // 保存对象引用
  hash.set(data, target);

  // 遍历数据，执行递归
  Reflect.ownKeys(data).forEach(key => {
    target[key] = deepCopy(data[key], hash)
  })

  return target
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
