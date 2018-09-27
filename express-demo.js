let experss = require('express');
const app = experss();
app.get('/', (req, res) => {
    console.log(req.query);
    res.send('hello world')
});

app.listen(3200, () => {
    console.log('监听3200端口');
});