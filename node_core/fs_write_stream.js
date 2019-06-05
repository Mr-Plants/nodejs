const fs = require('fs');

const data = '写入数据流';

const stream = fs.createWriteStream(__dirname + '/writeStream.txt');

stream.setDefaultEncoding('UTF8');

stream.write(data, 'UTF8');

stream.end();

stream.on('finish', () => {
    console.log('write finish!')
})

stream.on('error', err => {
    console.error(err)
})
