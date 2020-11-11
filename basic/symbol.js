let size = Symbol('size');

class Collection {

    constructor() {
        this[size] = 0;
    }

    addItem(item) {
        this[this[size]] = item
        this[size]++
    }

    // 将sizeOf方法放到构造函数作为静态方法防止外部自己篡改size
    static sizeOf(instance) {
        return instance[size]
    }
}

const c1 = new Collection();
console.log(Collection.sizeOf(c1))
c1.addItem(1)
console.log(Collection.sizeOf(c1))
c1[size] = 100
console.log(Collection.sizeOf(c1))

console.log(Object.getOwnPropertyNames(c1))  //['0']
console.log(Object.getOwnPropertySymbols(c1))  // [ Symbol(size) ]