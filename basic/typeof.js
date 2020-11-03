//js数据类型，目前共9种
console.log(typeof '1')   // string
console.log(typeof 1)    // number
console.log(typeof true)  // boolean
console.log(typeof undefined)   // undefined
console.log(typeof null)   // object   不正确
console.log(typeof {})  // object
console.log(typeof Symbol(1))   // symbol
console.log(typeof BigInt(1))   // bigint

console.log('================================')
console.log(typeof new Set([1, 2, 1]))  // object
console.log(typeof [])// object
console.log(typeof new Map())// object
console.log(typeof /110$/g) // object
console.log(typeof function(){})  // function


// 原始数据类型 String Number Boolean Undefined Null Symbol BigInt
// 引用数据类型 Object
