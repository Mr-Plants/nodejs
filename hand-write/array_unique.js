// 数组去重

function array_unique(arr) {
  return arr.filter(function (item, index, array) {
    return array.indexOf(item) === index;
  })
}


const unique2 = arr => [...new Set(arr)];

console.log(array_unique([1, 3, 2, 1, 4, 2]))
console.log(unique2([1, 3, 2, 1, 4, 2]))
