const path = require('path');
const url = '/foo/bar/baz/asdf/quux.html';
/**
 * 规范化路径
 */
console.log(path.normalize('www/src\html/..//index.html'));
/**
 * 返回路径中的最后一部分（）一般是文件名，可以选择去掉扩展名
 */
console.log(path.basename(url));

/**
 * 组合路径，能正确使用当前系统的路径分隔符
 */
console.log(path.join(__dirname + '/demo.txt'));
console.log(path.join('node', '\src',));
console.log(__dirname + '/demo.txt');

console.log('line 19:' + path.resolve('node', 'src'))
