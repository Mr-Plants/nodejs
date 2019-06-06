const fs = require('fs');
const zlib = require('zlib');

const gzip = zlib.createGzip();

const input = fs.createReadStream(__dirname + '/demo.txt');

const output = fs.createWriteStream(__dirname + '/demo.txt.gz');

input.pipe(gzip).pipe(output);


