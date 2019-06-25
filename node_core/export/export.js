function hello() {
    console.log('hello');
    console.log(this)
}

// exports = {hello};
function test() {

}

exports.test = '2333';

module.exports = {hello};

console.log(module.exports)
console.log(exports)

// 当两者同时出现时，只取module.exports，无论两者是否有同名属性或方法
// 当只出现exports时，exports会向module.exports进行单向合并
