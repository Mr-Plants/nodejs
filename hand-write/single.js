class Single {
  constructor(name) {
    if (!Single.instance) {
      this.name = name;
      Single.instance = this;
    }
    return Single.instance;
  }
}


let a = new Single('jack');
let b = new Single('lucy');

console.log(a)
console.log(b)
console.log(a === b)
