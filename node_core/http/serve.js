const http = require('http');

http.createServer((req, res) => {
    console.log(req.url)
    res.writeHead(200, {'Content-Type': 'text/plain'});

    res.end('hello world!');
}).listen(8000);


