const http = require('http')
const fs = require('fs')
const express = require('express')
const {createProxyMiddleware} = require('http-proxy-middleware')

const app1 = http.createServer((req, res) => {
  const {method, url, headers} = req;
  console.log(url)
  console.log(method)
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
    // res.setHeader('Access-Control-Allow-Credentials', 'true')

    // 设置响应的数据格式为json
    res.setHeader("Content-Type", "application/json")

    // res.setHeader('Set-Cookie', 'my-cookie=666666')
    res.end(JSON.stringify([{name: "tom", age: 20}]));
  } else if (method === 'OPTIONS' && url === '/users') {
    // 预检请求也需要设置允许携带cookie
    // res.setHeader('Access-Control-Allow-Credentials', 'true')

    res.end()
  }
}).listen(3000)

// 启动其他端口模拟跨域
const app = express()
app.use(express.static(__dirname + '/'))
/**
 * 设置反向代理，html直接访问4000的/users资源，4000本来不存在/users接口，但是可以通过代理到3000端口访问
 * 此时js请求不能写死直接访问3000端口
 * 服务器代理为反向代理，客户端代理为正向代理
 */
app.use('/users', createProxyMiddleware({
  target: 'http://localhost:3000',
  changeOrigin: true
}))
app.listen(4000)
