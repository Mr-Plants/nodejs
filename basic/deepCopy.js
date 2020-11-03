function deepCopy(data) {
  console.log(getType(data))
}


function getType(data) {
  return Object.prototype.toString.call(data)
}

const a = new Date()
deepCopy(/.js$/g)
deepCopy(a)

console.log(typeof /.js$/g)
console.log(typeof a)


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


}

const s = new Set([1, 2, 3, 3])
console.log(typeof s)
console.log(getType(s))
console.log(s instanceof Set)


// date
const d = new Date()
let d2 = d
let d3 = new Date(d)
d.setFullYear(2000)
console.log(d, d2, d3)


// let r = new RegExp(/122$/)
let r = /122$/
let r2 = r
let r3 = new RegExp(r)
r = /188$/g
console.log(r instanceof RegExp)
console.log(r, r2, r3)

function func() {
  console.log(123)
}

console.log(typeof func)


'use strict'

console.log(typeof NaN)
