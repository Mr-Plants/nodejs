const testCase = {
  name: 'bruce',
  birth: new Date(1993, 11, 26),
  reg: /123$/g,
  remark: {
    favorite: 'basketball',
    [Symbol('gender')]: 1,
    arr: [{name: 'foo', gender: 1}, {name: 'bar'}]
  }
}

const iterableObject = Symbol('iteratorObject');

function getType(data) {
  return Object.prototype.toString.call(data)
}

function handleObject(data) {
  const type = getType(data);
  if (type === '[object Object]' || type === '[object Array]') {
    return iterableObject;
  } else {
    if ((typeof data === 'object' || typeof data === 'function') && data !== null) {
      // function set map regexp date....
      return new data.constructor(data);
    } else {
      // 基础数据类型
      return data;
    }
  }
}

// 兼容数组、symbol、date、正则等
function deepCopy(data) {
  const handledData = handleObject(data);
  if (handledData !== iterableObject) return handledData;
  // 走到这里最外层只剩数组和对象
  const target = Array.isArray(data) ? [] : {};
  const stack = [{
    data,
    parent: target
  }];
  // 使用hash存储数据要搞清楚存取key是什么，存取value是什么。存取的key必须一致，比如这里存取的key都使用源对象，存取的value都是目标对象
  const hash = new WeakMap();
  hash.set(data, target);

  while (stack.length) {
    // 取出栈顶元素
    const node = stack.pop();
    const {data, parent} = node;
// todo 如果只想要自身的可枚举属性怎么搞？
    Reflect.ownKeys(data).forEach(key => {
      const value = data[key];
      const handledData = handleObject(value);
      if (handledData === iterableObject) {
        // 如果已经保存这个对象，就直接返回，避免循环引用进入死循环
        if (hash.has(value)) {
          parent[key] = hash.get(value);
        } else {
          // 为要拷贝的数据申请一块内存，并把这个内存地址绑定为下一次要迭代的parent
          parent[key] = Array.isArray(value) ? [] : {};
          // 保存这个目标对象，避免对这个数据有多个引用，内存地址却不一致
          hash.set(value, parent[key]);
          // 把对象入栈，继续下一轮循环
          stack.push({
            data: value,
            parent: parent[key]
          })
        }

      } else {
        parent[key] = handledData;
      }
    })
  }
  return target;
}

let t2 = {name: 2}
t2.a2 = t2;  // 测试循环引用
// console.log(JSON.stringify(test2))   // 会报错，循环引用
// console.log(test2 === test2.a2)   // true
// let t3 = deepCopy(t2)
// console.log(t3)
// console.log(t3.a2===t3)

// testCase.a1 = t2;
// testCase.a2 = t2;
let test = deepCopy(testCase);
console.log(test)
// console.log(test.a1 === test.a2)
// console.log(test)
// console.log(JSON.stringify(test))

let t4 = {
  mark: {
    arr: [
      {name: 1},
      {name: 2}
    ]
  }
}
console.log(t4)
console.log(deepCopy(t4))