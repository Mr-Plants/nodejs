const origin = console.log;

console.log=function (){
  origin.apply(console,[`${+new Date()}：`,...arguments])
}


console.log('啊～')
