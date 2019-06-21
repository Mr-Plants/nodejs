const http = require('http');
const URL = require('url')

http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});

    const PARAMS = URL.parse(req.url, true).query;

    res.write('接收到参数\n');
    res.end('hello world!');
}).listen(8000);


