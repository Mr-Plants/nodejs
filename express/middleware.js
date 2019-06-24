const EXPRESS = require('express')
const APP = EXPRESS()

function LOGGER(req, res, next) {
    console.log('time：' + new Date())
    next()
}

APP.use(LOGGER)

APP.get('/', (req, res) => {
    res.send('hello')
})

APP.listen(8000)
