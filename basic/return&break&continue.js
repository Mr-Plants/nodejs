function returnInLoop() {
  let i = 0
  while (i < 5) {
    if (i === 1) {
      continue;
    }
    console.log(i)
    i++;
  }
  console.log('loop end')
}

// returnInLoop()


// function returnInLoop2() {
//   for (let i = 0; i < 5; i++) {
//     if (i === 1) {
//       continue;
//     }
//     console.log(i)
//   }
//   console.log('end loop')
// }
//
// returnInLoop2()

function continueInLoop() {
  for (let i = 0; i < 5; i++) {
    if (i === 1) {
      continue;
    }
    console.log(i)
  }
  console.log('end loop')
}

// continueInLoop()


function continueInLoop2() {
  let i = 0
  while (i < 5) {
    if (i === 1) {
      // 这行代码会造成死循环
      break;
    }
    console.log(i)
    i++;
  }
  console.log('loop end')
}

// continueInLoop2()


const foo = 0;
switch (foo) {
  case -1:
    console.log('negative 1');
    break;
  case 0: // foo 的值为 0 所以匹配这里所以这一块会运行
    console.log(0);
  // 注意：那个没写的 break 原本在这儿
  case 1: // 'case 0:' 里没有 break 语句所以这个 case 也会运行
    console.log(1);
  // 遇到了 break，所以不会再继续进入 'case 2:' 了
  case 2:
    console.log(2);
    // break;
  default:
    console.log('default');
}

