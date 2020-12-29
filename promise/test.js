const p1 = new Promise((resolve, reject) => {
  resolve(233)
})
p1.then(
  res => {
    console.log('1', res)
  }
).then(res => {
  console.log('2', res)
})

let p2 = p1.then(
  res => {
    console.log('p1..next');
    return p2
  }
)
