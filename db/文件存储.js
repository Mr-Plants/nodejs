const readline = require('readline')
const fs = require('fs')


function get(key) {
  fs.readFile('./db.json', (err, data) => {
    if (err) throw err
    const json = data.toString() ? JSON.parse(data.toString()) : {};
    console.log(json[key])
  })
}

function set(key, value) {
  fs.readFile('./db.json', (err, data) => {
    if (err) throw err
    const json = data.toString() ? JSON.parse(data.toString()) : {};
    json[key] = value;
    fs.writeFile('./db.json', JSON.stringify(json), err => {
      if (err) throw err
      console.log('写入成功')
    })
  })

}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.on('line', input => {
  const [op, key, value] = input.split(' ')
  switch (op) {
    case 'set':
      set(key, value)
      break;
    case 'get':
      get(key)
      break;
    case 'quit':
      rl.close()
      break;
    default:
      console.log('🚀 没有这个命令～')
      break;
  }
})


rl.on('close', () => {
  console.log('👋 bye')
  process.exit(0)
})
