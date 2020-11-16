function getType(data) {
    return Object.prototype.toString.call(data)
}

function isObject(data) {
    return typeof data === 'object' && data !== null
}

function deepCopy(data) {

}


// ==========test case============
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
console.log(test.a6 === test.a7)

console.log(copy.a6 === copy.a7)
console.log(copy.a4 === copy)
