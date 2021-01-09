function handler(x) {
  console.log(x)
}

Promise.resolve(6767).then(handler)
