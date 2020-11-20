const queuedObserver = new Set();
const observe = fn => queuedObserver.add(fn);

const observable = obj => new Proxy(obj, {set})

function set(target, key, value, receiver) {
  const result = Reflect.set(target, key, value, receiver);
  queuedObserver.forEach(observe => observe.call(target))
  return result
}

let p = observable({name: 'jack', age: 23})

function printName() {
  console.log(this.name)
}

function printAge() {
  console.log(this.age)
}

observe(printName)
observe(printAge)

p.name = 'rose'
p.age = 22
