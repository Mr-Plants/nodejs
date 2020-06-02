const path = require('path');
const url = '1.quux.js';
/**
 * 规范化路径
 */
console.log(path.normalize('www/src\html/..//index.html'));
/**
 * 返回路径中的最后一部分（）一般是文件名
 */
console.log(path.basename(url,path.extname(url)));

// 返回路径中最后一部分的文件扩展名，不是文件则返回空
console.log(path.extname(url));

/**
 * 组合路径，能正确使用当前系统的路径分隔符
 */
console.log(path.join(__dirname + '\demo.txt'));
console.log(path.join('node', '\src',));
console.log(__dirname + '/demo.txt');

// 相当于从左到右逐个执行cd
console.log('line 19:' + path.resolve('/node', 'src'));

// 判断一个路径是不是绝对路径
console.log(path.isAbsolute(url))
// 返回路径字符串的对象
console.log(path.parse(url))

const pathObj = {
    root: '',
    dir: '../foo/bar/baz/asdf',
    base: 'quux.html',
    ext: '.html',
    name: 'quux'
};
// 从对象中返回路径字符串
console.log(path.format(pathObj));

console.warn(path.resolve(__dirname, '/static'));
