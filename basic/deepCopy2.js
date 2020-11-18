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
  remark: {
    favorite: 'basketball',
    [Symbol('gender')]: 1,
    arr: [{name: 'foo'}, {name: 'bar'}]
  }
}

function getType(data) {
  return Object.prototype.toString.call(data)
}

// 兼容数组、symbol、date、正则等
function deepCopy3(data) {
  if (typeof data !== 'object' || data === null) {
    return data;
  }
  // todo map set等等构造函数如何处理？
  if (getType(data) === '[object RegExp]') return new RegExp(data);
  if (getType(data) === '[object Date]') return new Date(data);

  // 走到这里只剩数组和对象
  const target = Array.isArray(data) ? [] : {};
  const stack = [{
    data,
    parent: target
  }];

  while (stack.length) {
    // console.log(stack)
    // 取出栈顶元素
    const node = stack.pop();
    const {data, parent} = node;

    Reflect.ownKeys(data).forEach(key => {
      const value = data[key];
      // console.log(key, value)
      if (getType(value) === '[object Object]' || getType(value) === '[object Array]') {
        // 先为要保存的键值申请一块内存，并把这个内存地址绑定为下一次要迭代的parent
        parent[key] = Array.isArray(value) ? [] : {};
        // console.log(parent[key], key)
        // 如果键值是对象，就把它入栈，否则直接拷贝
        stack.push({
          data: value,
          parent: parent[key]
        })
      } else {
        parent[key] = value;
      }
    })
  }
  return target;
}

let test = deepCopy3(testCase);
console.log(JSON.stringify(test))
