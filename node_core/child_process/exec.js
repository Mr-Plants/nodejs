const cp = require('child_process');

/**
 * 创建子进程，可以直接执行shell命令，以回调返回
 */
// cp.exec('echo hello world', (err, stdout, stderr) => {
cp.exec('cat package.json', (err, stdout, stderr) => {
    if (err) {
        return console.error(err);
    }
    console.log(stdout);
    console.log(stderr);
    console.log('done')
});
