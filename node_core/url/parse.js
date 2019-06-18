const url = require('url');

const urlObj = url.parse('https://user:pass@sub.host.com:8080/p/a/t/h?query=string&name=2333#hash');

// 将query解析成对象
// const urlWithStringQuery = url.parse('https://user:pass@sub.host.com:8080/p/a/t/h?query=string&name=2333#hash', true);

console.log(urlObj)

// 将URL对象解析成url字符串
const urlString = url.format(urlObj)

console.log(urlString)
