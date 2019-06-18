const cp = require('child_process');

cp.execFile('node', ['-v'], (err, stdout, stderr) => {
    console.log(stdout)
})
