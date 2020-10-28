const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const APP = EXPRESS();
const BODY_PARSER = require('body-parser')

// APP.use(BODY_PARSER.json())
APP.use(BODY_PARSER.urlencoded({entended: true}))

APP.get('/detail', (req, res) => {
    console.log(req.accepts('html'))
    console.log(req.is('html'))
    console.log(req.query)
    console.log(req.params)
    console.log(req.baseUrl)
    console.log(req.url)
    // res.send('hello world!')
    res.redirect(302, 'http://baidu.com')
})

// 使用多个回调
// APP.post('/', [cb0, cb1, cb2])

APP.listen(8000, () => {
    console.log('listen on 8000')
})

APP.post('/', (req, res) => {
    console.log(req.body)
    console.log(res.get('Content-Type'))
    // res.send('over')
    res.json({error: 'message'})
})

APP.use('/root', ROUTER)

// 使用静态文件中间件
APP.use(EXPRESS.static('static'));
// alies别名
APP.use('/public', EXPRESS.static('static'));


function cb0(req, res, next) {
    console.log('CB0');
    next();
}

function cb1(req, res, next) {
    console.log('CB1');
    next();
}

function cb2(req, res) {
    res.send('Hello from C!');
}
