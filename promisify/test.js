const fs = require('fs')
const promisify = require('./promisify')

// normal
fs.readFile('test.txt', (err, data) => {
  if (err) throw err
  console.log('callback success')
  console.log(data.toString())
})

const read = promisify(fs.readFile)

read('test.txt').then(
  res => {
    console.log('promise resolve')
    console.log(res.toString())
  },
  err => {
    console.log('promise reject')
    console.log(err)
  }
)

// test reject
read('test2.txt').then(
  res => {
    console.log('promise resolve')
    console.log(res.toString())
  },
  err => {
    console.log('promise reject')
    console.log(err)
  }
)

/**
 * use async await
 * @returns {Promise<void>}
 */
async function test() {
  try {
    const data = await read('test.txt');
    console.log('await done')
    console.log(data.toString())
  } catch (e) {
    console.log('await err')
    console.log(e)
  }
}

test()
