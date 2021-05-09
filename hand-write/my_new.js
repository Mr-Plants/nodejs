// new的手写实现

function my_new(constructor, ...args) {
  // 首先创建一个对象，并把原型链指向构造函数的原型
  // 可以使用三种方法修改原型链
  // 方法1，修改私有属性__proto__
  // let obj = {};
  // obj.__proto__ = constructor.prototype;

  // 方法2，使用Object.setPrototypeOf方法
  // let obj = {};
  // Object.setPrototypeOf(obj, constructor.prototype);

  // 方法3，使用Object.create直接创建
  let obj = Object.create(constructor.prototype);

  // console.log(args)
  // constructor.call(obj, ...args);
  constructor.apply(obj, args);
  return obj;
}


// test code
function Person(name, age) {
  this.name = name;
  this.age = age;
}

console.log(my_new(Person, 'bruce', 26))
