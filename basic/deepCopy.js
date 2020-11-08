function getType(data) {
  return Object.prototype.toString.call(data)
}

function isObject(data) {
  return typeof data === 'object' && data !== null
}

function deepCopy(data) {
  // 简单数据类型，直接返回结果
  if (!isObject(data)) {
    return data;
  }

  // 引用数据类型，先区分是否是特殊对象
  if (getType(data) === '[object RegExp]') return new RegExp(data)
  if (getType(data) === '[object Date]') return new Date(data)
  if (getType(data) === '[object Function]') return new Function(data)

  // todo set、map
  // 剩下数组和对象
  let newData = Array.isArray(data) ? [] : {};

  // 遍历数据，执行递归
  for (let key in data) {
    // 过滤继承可枚举属性
    if (Object.hasOwnProperty.call(data, key)) {
      newData[key] = deepCopy(data[key])
    }
  }
  //todo 循环引用
  return newData
}


const test = {
  name: "bruce",
  a1: undefined,
  a2: null,
  a3: 123,
  book: {title: "You Don't Know JS", price: "45"},
  arr: [{name: 'foo', birth: new Date(1992, 0, 3)}]
}
const copy = deepCopy(test)
console.log(copy)
test.arr[0].birth.setFullYear(2013)
console.log(copy)
