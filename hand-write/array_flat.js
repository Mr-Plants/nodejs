// 数组拍平


function flat(arr) {
  let res = [];

  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      res = res.concat(flat(arr[i]));
    } else {
      res.push(arr[i]);
    }
  }

  return res;
}


function flat2(arr) {
  while (arr.some(item => Array.isArray(item))) {
    // arr=
  }
}


// test
const test = [1, 3, [5, [7, 9, [11, 13], 2], 4], 6]
console.log(flat(test))

console.log([].concat(...test))
console.log(...test)
console.log()
