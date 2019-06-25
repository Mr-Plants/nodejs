const EXPRESS = require('express')
const APP = EXPRESS()

function LOGGER(req, res, next) {
    console.log(req.url)
    console.log('time：' + new Date())
    res.status(404).end('无权限');
}

// APP.use(LOGGER)

APP.get('/', (req, res) => {
    res.send('hello')
})

APP.listen(8000)


// 使用静态文件中间件
// APP.use(EXPRESS.static('static'));
