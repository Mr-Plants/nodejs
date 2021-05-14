let str = 'abcaaaegfdabbhg';

let b = [...str].reduce(
  (prev, cur) => {
    cur in prev ? prev[cur]++ : prev[cur] = 1;
    return prev
  }, {});

let res = ''
for (let key in b) {
  res += `${key}${b[key] === 1 ? '' : b[key]}`
}

console.log(res)
