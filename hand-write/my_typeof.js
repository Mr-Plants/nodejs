// 自定义typeof
function myTypeof(data) {
  const reg = / (.*)]/;
  let res = Object.prototype.toString.call(data);
  // return res.substring(0, res.length - 1).split(' ')[1].toLowerCase();
  return reg.exec(res)[1].toLowerCase();
}


console.log(myTypeof(123))
console.log(myTypeof("123"))
console.log(myTypeof([]))



