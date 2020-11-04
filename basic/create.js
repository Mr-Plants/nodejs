const a = Object.create({b: 2}, {
  gender: {
    value: 1,
    writable: true,
    enumerable: true
  }
})

console.log(a)
console.log(a.__proto__)
console.log(a.b)
console.log(a instanceof Object)
console.log(a.__proto__.__proto__===Object.prototype)
