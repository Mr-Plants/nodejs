// 使用迭代
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

const testCase = {
  name: 'bruce',
  remark: {
    favorite: 'basketball'
  }
}

console.log(deepCopy(testCase))

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

console.log(deepCopy2(testCase))
