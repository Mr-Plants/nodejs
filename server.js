const http = require('http')

var server = http.createServer((req,res)=>{
    console.log('come in')
    res.write('gogogo')
    res.end()
})

server.listen('8080')