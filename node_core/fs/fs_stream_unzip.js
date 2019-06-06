const fs = require('fs');

const zlib = require('zlib');

const unzip = zlib.createGunzip();

const writeStream = fs.createWriteStream(__dirname + '/demo.txt');
const readStream = fs.createReadStream(__dirname + '/demo.txt.gz');

readStream.pipe(unzip).pipe(writeStream);
