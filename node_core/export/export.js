function hello() {
    console.log('hello');
    console.log(this)
}

// exports = {hello};
function test() {

}

exports.test = '2333';

// module.exports = {hello};
module.exports = function (x, y) {
    return x + y;
}

console.log(module.exports)
console.log(exports)

// 当两者同时出现时，只取module.exports，无论两者是否有同名属性或方法
// 当只出现exports时，exports会向module.exports进行单向合并

/**
 * module.exports才是真正的接口，exports只不过是它的一个辅助工具。　最终返回给调用的是module.exports而不是exports。
 * 所有的exports收集到的属性和方法，都赋值给了Module.exports。当然，这有个前提，就是module.exports本身不具备任何属性和方法。
 * 如果，module.exports已经具备一些属性和方法，那么exports收集来的信息将被忽略。
 */
