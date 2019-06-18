const {URL} = require('url');

const myUrl = new URL('https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash');

const urlWithInput = new URL('2333', 'https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash');


console.log(myUrl)
console.log(urlWithInput)

// 属性可读可写
console.log(myUrl.hash);
myUrl.hash = 'new_hash';
console.log(myUrl.hash);
