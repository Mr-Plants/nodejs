const fs = require('fs');

/**
 * 读取文件
 */
fs.readFile(__dirname + '/demo.txt', (err, res) => {
    if (err) {
        return console.error(err);
    }
    console.log('read success,res is:' + res)
});

/**
 * 写入文件（重写）
 */
fs.writeFile(__dirname + '/write.txt', 'this is write demo,enjoy!', err => {
    if (err) {
        return console.error(err);
    }
    console.log('write success!')

    /**
     * 删除文件
     */
    fs.unlink(__dirname + '/write.txt', err => {
        if (err) {
            return console.error(err);
        }
        console.log('delete file success!')
    })
});

/**
 * 获取文件信息，在异步非阻塞时可能会先于读取文件
 */
fs.stat(__dirname + '/demo.txt', (err, stats) => {
    if (err) {
        return console.error(err);
    }
    console.log(stats)
})

/**
 * 打开关闭文件
 */
fs.open(__dirname + '/demo.txt', 'r+', (err, fd) => {
    if (err) {
        return console.error(err);
    }
    console.log('打开成功！文件描述符为：' + fd);

    fs.close(fd, () => {
        console.log('关闭文件');
    })
})

/**
 * 创建删除文件夹
 */
fs.mkdir(__dirname + '/test_dir', err => {
    if (err) {
        return console.error(err);
    }
    console.log('创建文件夹成功');

    fs.rmdir(__dirname + '/test_dir', err => {
        if (err) {
            return console.error(err);
        }
        console.log('删除文件夹成功');
    })
});

/**
 * 读取文件夹
 */
fs.readdir('node_core/fs', (err, files) => {
    if (err) {
        return console.error(err);
    }
    // 读取到的文件列表
    console.log(files);
})
