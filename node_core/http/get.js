const http = require('http');
const URL = require('url')

http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});

    const PARAMS = URL.parse(req.url, true).query;

    res.end(JSON.stringify({'data': '', 'error': ''}));
}).listen(3000);


