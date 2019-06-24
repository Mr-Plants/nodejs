const HTTP = require('http');
// 使用事件形式

// const SERVER = new HTTP.Server();
const SERVER = HTTP.createServer();

SERVER.on('request', (req, res) => {
    console.log(req.url);
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('hello world');
    res.end('server end');
})

SERVER.on('connection', () => {
    console.log('connect')
})

SERVER.listen(8000)


SERVER.on('close', () => {
    console.log('closed');
})

setTimeout(() => {
    SERVER.close()
}, 5000)
