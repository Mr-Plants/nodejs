function getType(data) {
    return Object.prototype.toString.call(data)
}

function isObject(data) {
    return typeof data === 'object' && data !== null
}

function deepCopy(data) {
    const root = {};

    // 栈
    const loopList = [
        {
            parent: root,
            key: undefined,
            data,
        }
    ];

    while (loopList.length) {
        // todo 广度优先和深度优先？
        const node = loopList.pop();
        const parent = node.parent;
        const key = node.key;
        const data = node.data;

        // 初始化赋值目标，key为undefined则拷贝到父元素，否则拷贝到子元素
        let res = parent;
        if (key !== undefined) {
            res = parent[key] = {};
        }

        for (let k in data) {
            if (data.hasOwnProperty(k)) {
                if (isObject(data[k])) {
                    // 下一次循环
                    loopList.push({
                        parent: res,
                        key: k,
                        data: data[k],
                    });
                } else {
                    res[k] = data[k];
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
    // arr: [{name: 'foo'}, {name: 'bar'}, {name: 'baz'}]
}
// test.a4 = test;
const copy = deepCopy(test)
// console.log(test)
console.log(copy)
// console.log(test.a6 === test.a7)
//
// console.log(copy.a6 === copy.a7)
// console.log(copy.a4 === copy)
