function deepAssign(data) {
  console.log(getType(data))
}


function getType(data) {
  return Object.prototype.toString.call(data)
}

const a = new Date()
deepAssign(/.js$/g)
deepAssign(a)

console.log(typeof /.js$/g)
console.log(typeof a)


function deepCopy(data) {
  // 简单数据类型
  if (typeof data !== 'object') {
    return data;
  }

  if (getType(data) === '[object RegExp]') return new RegExp(data)
  if (getType(data) === '[object Date]') return new Date(data)
  if (getType(data) === '[object Function]') return new Function(data)

  // 数组或对象

}
