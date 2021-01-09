function sleep(num) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(num)
    }, 500)
  })
}

const arr = [1, 2, 3, 4, 5]

// 串行执行
async function forTest() {
  for (let i = 0; i < arr.length; i++) {
    let res = await sleep(i);
    console.log(res)
  }
}


forTest();

// 并行执行
arr.forEach(async (item, index) => {
  let res = await sleep(index);
  console.log(res);
})
