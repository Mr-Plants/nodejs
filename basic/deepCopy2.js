// 使用迭代，单层浅拷贝
function deepCopy(data) {
  const stack = [data];
  const target = {};

  while (stack.length) {
    // 取出栈顶元素
    const node = stack.pop();
    // 遍历对象
    for (let key in node) {
      if (node.hasOwnProperty(key)) {
        const value = node[key];
        if (Object.prototype.toString.call(value) === '[object Object]') {
          stack.push(value)
        } else {
          target[key] = value;
        }
      }
    }
  }
  return target;
}


// console.log(deepCopy(testCase))

// 增加层级控制
function deepCopy2(data) {
  const target = {};
  const stack = [{
    data,
    parent: target
  }];

  while (stack.length) {
    // 取出栈顶元素
    const node = stack.pop();
    const {data, parent} = node

    // 遍历对象
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        const value = data[key];
        if (Object.prototype.toString.call(value) === '[object Object]') {
          // 先为要保存的键值申请一块内存，并把这个内存地址绑定为下一次要迭代的parent
          parent[key] = {};
          // 如果键值是对象，就把它入栈，否则直接拷贝
          stack.push({
            data: value,
            parent: parent[key]
          })
        } else {
          parent[key] = value;
        }
      }
    }
  }
  return target;
}

// console.log(deepCopy2(testCase))
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

function getType(data) {
  return Object.prototype.toString.call(data)
}

function handleObject(data) {
  if (typeof data !== 'object' || data === null) {
    return data
  } else {
    return new data.constructor(data)
  }
}

// 兼容数组、symbol、date、正则等
function deepCopy3(data) {
  const type = getType(data);
  if (type !== '[object Object]' && type !== '[object Array]') {
    return handleObject(data);
  }

  // 走到这里只剩数组和对象
  const target = Array.isArray(data) ? [] : {};
  const stack = [{
    data,
    parent: target
  }];

  while (stack.length) {
    // 取出栈顶元素
    const node = stack.pop();
    const {data, parent} = node;

    Reflect.ownKeys(data).forEach(key => {
      const value = data[key];
      const type = getType(value)
      if (type === '[object Object]' || type === '[object Array]') {
        // 先为要保存的键值申请一块内存，并把这个内存地址绑定为下一次要迭代的parent
        parent[key] = Array.isArray(value) ? [] : {};
        // 如果键值是对象，就把它入栈，否则直接拷贝
        stack.push({
          data: value,
          parent: parent[key]
        })
      } else {
        parent[key] = handleObject(value);
      }
    })
  }
  return target;
}

let test = deepCopy3(testCase);
console.log(test)
// console.log(JSON.stringify(test))
console.log(deepCopy3(new Set([1, 2, 3, 1])))
