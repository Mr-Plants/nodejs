import {format, evaluate, add} from 'mathjs'

// console.log(math)
// const math = create()
console.log(evaluate('12 / (2.3 + 0.7)'))
console.log(format(evaluate('0.1+0.11'),14))
console.log(format(evaluate('0.1+0.2'),2))
console.log(add(0.1, 0.11))
