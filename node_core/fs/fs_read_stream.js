const fs = require('fs');

let data = '';

const stream = fs.createReadStream(__dirname + '/stream.txt');

stream.setEncoding('UTF8');
/**
 * 读取时事件
 */
stream.on('data', chunk => {
    console.log('chunk is:' + chunk);
    data += chunk;
})
/**
 * 完成时事件
 */
stream.on('end', () => {
    console.log('读取结束，数据是：' + data);
})
/**
 * 出错时事件
 */
stream.on('error', err => {
    console.error(err)
})


