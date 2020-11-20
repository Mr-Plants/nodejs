/**
 * 自定义new函数,
 * @param func
 * @private
 */
function _new(func) {
  return function () {
    let obj = {};
    // 创建父子原型链关联
    // 不推荐直接修改__proto__，性能不好
    obj.__proto__ = func.prototype;
    // 绑定实例this，初始化构造函数
    func.apply(obj, arguments);
    return obj;
  }
}

function _new2(func) {
  return function () {
    let obj = Object.create(func.prototype);
    func.apply(obj, arguments)
    return obj;
  }
}


function Person(gender) {
  this.gender = gender || '未知'
}


const p = _new(Person)(1)
console.log(p)

console.log(p.gender)   // undefined，没有执行Person初始化函数

Person.prototype.gender = '默认未知'

console.log(p.gender)

console.log('=====================')
const p2 = _new2(Person)(2)
console.log(p2)
console.log(p2.gender)


function _myNew(func) {
  return function () {
    const obj = Object.create(func.prototype)
    func.apply(obj, arguments)
    return obj;
  }
}
