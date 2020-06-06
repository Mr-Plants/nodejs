const http = require('http')
const fs = require('fs')
const express = require('express')

const app1 = http.createServer((req, res) => {
  const {method, url, headers} = req;
  console.log('cookie：' + headers.cookie)
  if (method === "GET" && url === "/") {
    fs.readFile("./index.html", (err, data) => {
      res.setHeader("Content-Type", "text/html");
      res.end(data);
    });
  } else if (method === "GET" && url === "/users") {
    /**
     * 此处需要设置允许携带cookies，服务端才能接收到浏览器传过来的cookie，否则接收不到
     */
    res.setHeader('Access-Control-Allow-Credentials', 'true')

    // 设置响应的数据格式为json
    res.setHeader("Content-Type", "application/json")
    /**
     * 即使在4000端口访问这个接口，后端依然是返回了数据的，只是被浏览器拦截了
     * 此处可以设置请求头允许4000跨域
     */
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4000')
    /**
     * 接口向浏览器申请设置cookie，通过setHeader实现
     */
    res.setHeader('Set-Cookie', 'my-cookie=666666')
    res.end(JSON.stringify([{name: "tom", age: 20}]));
  } else if (method === 'OPTIONS' && url === '/users') {
    // 预检请求也需要设置允许携带cookie
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    /**
     * 走到此处说明触发了cors，需要设置允许定制的header，允许的method，允许跨域的域名
     * 并返回200
     */
    res.writeHead(200, {
      'Access-Control-Allow-Origin': 'http://localhost:4000',
      'Access-Control-Allow-Method': 'PUT',
      'Access-Control-Allow-Headers': 'User-Token,Content-Type'
    })

    res.end()
  }
}).listen(3000)

// 启动其他端口模拟跨域
const app = express().use(express.static(__dirname + '/')).listen(4000)
