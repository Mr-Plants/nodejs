const EXPRESS = require('express');

const APP = EXPRESS();

APP.get('/', (req, res) => {
    res.send('hello world!')
})

// 使用多个回调
APP.post('/', [cb0, cb1, cb2])

APP.listen(8000, () => {
    console.log('listen on 8000')
})

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
