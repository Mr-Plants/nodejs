const HTTP = require('http');
const QUERY_STRING = require('querystring')

HTTP.createServer((req, res) => {
    res.writeHead(200, {'content-type': 'text/plain'});
    let data = '';
    // post接收数据
    req.on('data', chunk => {
        data += chunk;
    })

    req.on('end', () => {
        console.log(data)
        console.log(QUERY_STRING.parse(data))
        res.end(data)
    })


}).listen(3000)
