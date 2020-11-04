function getType(data) {
  return Object.prototype.toString.call(data)
}

function deepCopy(data) {
  // 简单数据类型及null
  if (typeof data !== 'object' || data === null) {
    return data;
  }

  if (getType(data) === '[object RegExp]') return new RegExp(data)
  if (getType(data) === '[object Date]') return new Date(data)
  if (getType(data) === '[object Function]') return new Function(data)

  // 数组或对象
  let newData = Array.isArray(data) ? [] : {};


  // 遍历数据，执行递归

}
