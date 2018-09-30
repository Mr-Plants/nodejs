const fs = require('fs');
const querystring = require('querystring');   // 请求参数格式化
const url = require('url');   // url解析模块

fs.readFile('test.txt', (err, data) => {
  if (err) {
    throw error('读取文件失败')
  } else {
    console.log(data.toString())
  }

  // url.parse(url,true)
});

fs.writeFile('writeTest.txt', '仅仅是测试', (err) => {
  throw error(err)
});