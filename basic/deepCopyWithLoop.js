function getType(data) {
    return Object.prototype.toString.call(data)
}

function isObject(data) {
    return typeof data === 'object' && data !== null
}

function deepCopy(data) {
    const root = {};

    const stack = [
        {
            parent: root,
            key: undefined,
            value: data,
        }
    ];

    while (stack.length) {
        // todo 广度优先和深度优先？
        // 弹出栈顶元素
        const node = stack.pop();
        const {parent, key, value} = node;

        // 初始化赋值目标，key为undefined则拷贝到父元素，否则拷贝到子元素
        let res = parent;
        if (key !== undefined) {
            res = parent[key] = Array.isArray(value) ? [] : {};
        }

        for (let key in value) {
            if (value.hasOwnProperty(key)) {
                const type = getType(value[key]);
                if (type === '[object Object]' || type === '[object Array]') {
                    // 纯对象和数组入栈
                    stack.push({
                        parent: res,
                        key,
                        value: value[key],
                    });
                } else {
                    // 其他类型
                    // todo map set
                    switch (type) {
                        case '[object RegExp]':
                            res[key] = new RegExp(value[key]);
                            break;
                        case '[object Date]':
                            res[key] = new Date(value[key]);
                            break;
                        case '[object Function]':
                            res[key] = new Function(value[key]);
                            break;
                        default:
                            // 简单类型直接拷贝
                            res[key] = value[key];
                    }

                }
            }
        }
    }

    return root;
}


// ==========test case============
let obj = {name: 233, gender: 1}

const test = {
    name: "bruce",
    // a1: undefined,
    a2: null,
    // a3: 123,
    // a4: '',
    // a5: () => {
    // },
    // a6: obj,
    // a7: obj,
    // birth: new Date(1992, 0, 3),
    // a8: /123$./g,
    // [Symbol('a9')]: 2,
    book: {title: "You Don't Know JS", price: "45"},
    arr: [{name: 'foo'}, {name: 'bar'}, {name: 'baz'}]
}
// test.a4 = test;
const copy = deepCopy(test)
// console.log(test)
console.log(copy)
// console.log(test.a6 === test.a7)
//
// console.log(copy.a6 === copy.a7)
// console.log(copy.a4 === copy)
