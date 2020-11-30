class Observer {
  constructor(data) {
    for (let key of Object.keys(data)) {
      console.log(key)
      this.defineReactive(data, key);
    }
  }

  defineReactive(data, key) {
    Object.defineProperty(this, key, {
      enumerable: true,
      configurable: true,
      get() {
        console.log('get ' + key);
        return data[key]
      },
      set(v) {
        console.log('set ' + key + ' & new value is ' + v)
        data[key] = v;
      }
    })
  }
}

let obj = {
  name: '',
  age: 18
}
let foo = new Observer(obj)
console.log(foo)
foo.age = 20
foo.name = 'foo'
console.log(foo.name)
foo.favorite = 'sing'

console.log('==================使用proxy==================')
// ==================使用proxy==================
const bar = new Proxy(obj, {
  set(target, p, value, receiver) {
    console.log('set ' + p + ' & new value is ' + value)
    Reflect.set(target, p, value, receiver)
  },
  get(target, p, receiver) {
    console.log('get ' + p)
    return Reflect.get(target, p, receiver)
  }
})
console.log(bar)
bar.age = 21;
bar.name = 'bar'
console.log(bar.name)
console.log(bar.favorite)
bar.favorite = 'running'
