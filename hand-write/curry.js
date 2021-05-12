// function add(x) {
//   return function (y) {
//     return x + y
//   }
// }

function add(x, y) {
  return x + y
}


function trueCurrying(fn, ...args) {

  if (args.length >= fn.length) {

    return fn(...args)

  }

  return function (...args2) {

    return trueCurrying(fn, ...args, ...args2)

  }
}


// console.log(add(1)(2))
let add2 = trueCurrying(add)
console.log(add2(2)(3))
