const HTTP = require('http');

HTTP.createServer((req, res) => {
    res.writeHead(200, {'content-type': 'text/plain'});
    let data = '';

    req.on('data', chunk => {
        data += chunk;
    })

    req.on('end', () => {
        console.log(data)
    })

    res.end('over')
}).listen(8000)
