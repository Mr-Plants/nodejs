function is_json(val) {
  if (typeof val === 'string') {
    try {
      // return val !== 'null' && typeof JSON.parse(val) === "object";
      return Object.prototype.toString.call(JSON.parse(val)) === "[object Object]";
    } catch (e) {
      return false;
    }
  }
  return false;
}


// test code here
const bruce = {
  name: 'bruce',
  age: 26
}
console.log(is_json('123'))
console.log(is_json(123))
console.log(is_json(JSON.stringify(bruce)))
console.log(is_json(null))
console.log(is_json({}))
console.log(is_json('null'))
console.log(is_json('undefined'))
