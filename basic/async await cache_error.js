function randomAjax() {
  return new Promise(((resolve, reject) => {
    Math.random() > 0.5 ? resolve() : reject();
  }))
}

async function polling(count) {
  for (let i = 0; i < count; i++) {
    try {
      const res = await randomAjax();
      break;
    } catch (err) {
      // 失败会被捕获，进入下一次循环
    }
  }
}

// 重复尝试至多3次，成功跳出循环
polling(3)
