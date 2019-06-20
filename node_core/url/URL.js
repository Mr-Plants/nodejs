const {URL, URLSearchParams} = require('url');

const myUrl = new URL('https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash');

const urlWithInput = new URL('2333', 'https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash');


console.log(myUrl)
console.log(urlWithInput)

// 属性可读可写
console.log(myUrl.hash);
myUrl.hash = 'new_hash';
console.log(myUrl.hash);

console.log(myUrl.password)
console.log(myUrl.username)

console.log(myUrl.searchParams.get('query'))

myUrl.searchParams.append('key1', 'v1')
myUrl.searchParams.append('key2', 'v2')
console.log(myUrl.search)
myUrl.searchParams.set('key1', 'new_v1')
console.log(myUrl.search)
myUrl.searchParams.delete('key1')
console.log(myUrl.search)


const SEARCH_PARAMS = new URLSearchParams(myUrl.search)
console.log(SEARCH_PARAMS)
console.log(SEARCH_PARAMS.toString())

// SEARCH_PARAMS同样可以调用get、qppend、delete等方法

const PARAMS_BY_OBJ = new URLSearchParams({
    user: 'abc',
    query: ['first', 'second']
})

console.log(PARAMS_BY_OBJ)

const MAP1 = new Map();
MAP1.set('key1', 'v1');
MAP1.set('key2', 'v2');
MAP1.set('key3', 'v3');
console.log(MAP1)
const PARAMS_BY_MAP = new URLSearchParams(MAP1);
console.log(PARAMS_BY_MAP)
console.log(PARAMS_BY_MAP.getAll('key1'))
