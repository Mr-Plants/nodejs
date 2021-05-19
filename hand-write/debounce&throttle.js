/**
 * 函数防抖，核心思想是在n秒（delay）内如果函数再次被触发，就取消之前的函数，重新开始计时
 * @param fn
 * @param delay
 */
function debounce(fn, delay) {
  let timer = null;
  return function () {
    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(() => {
      fn.apply(this, arguments)
    }, delay)
  }
}


/**
 * 函数节流，核心思想是在n秒内只执行1次
 * @param fn
 * @param delay
 */
function throttle(fn, delay) {
  let timer = null;

  return function () {
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, arguments);
        clearTimeout(timer);
        timer = null;
      }, delay)
    }
  }
}
