class JDBException {
  message = '借贷宝专属异常';
  value = '';

  constructor(value) {
    this.value = value;
  }

  toString() {
    return this.value + this.message;
  }
}


console.log(new JDBException('网络连接超时'))
