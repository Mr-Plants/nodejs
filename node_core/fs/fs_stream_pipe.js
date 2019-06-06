const fs = require('fs');

const writeStream = fs.createWriteStream(__dirname + '/writeStream.txt');

const readStream = fs.createReadStream(__dirname + '/stream.txt');
/**
 * 读取流=>写入流
 */
readStream.pipe(writeStream)
